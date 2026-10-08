-- WO-024 migration smoke. Run only on a DISPOSABLE PostgreSQL 17 database.
-- All test data is rolled back. Failure must stop CI (ON_ERROR_STOP=1).
BEGIN;
DO $wo024$
DECLARE
  org_a uuid;
  org_b uuid;
  actor_a uuid;
  w_a uuid;
  w_b uuid;
  outbox_a uuid;
  audit_a uuid;
  cmd uuid := gen_random_uuid();
  txn_key text;
  attempts int := 0;
BEGIN
  INSERT INTO company_os.organizations(slug,name)
    VALUES ('test-org-a','Isolated A') RETURNING id INTO org_a;
  INSERT INTO company_os.organizations(slug,name)
    VALUES ('test-org-b','Isolated B') RETURNING id INTO org_b;
  INSERT INTO company_os.actors(organization_id,actor_type,display_name)
    VALUES (org_a,'SYSTEM','CI Fixture') RETURNING id INTO actor_a;

  INSERT INTO company_os.work_orders(
    organization_id,work_order_key,governed_stream,state,admitted_at)
    VALUES (org_a,'NXL-COMPANY-WO-024','company','IN_PROGRESS',now())
    RETURNING id INTO w_a;
  BEGIN
    INSERT INTO company_os.work_orders(
      organization_id,work_order_key,governed_stream,state,admitted_at)
      VALUES (org_a,'NXL-COMPANY-WO-025','company','ADMITTED',now());
    RAISE EXCEPTION 'FAIL: concurrent admission invariant missing';
  EXCEPTION WHEN unique_violation THEN
    NULL;
  END;
  IF (SELECT count(*) FROM company_os.work_orders
      WHERE organization_id=org_a AND state IN ('ADMITTED','IN_PROGRESS')) <> 1 THEN
    RAISE EXCEPTION 'FAIL: second admitted WO persisted';
  END IF;

  -- Separate organizations may each admit their own independent stream.
  INSERT INTO company_os.work_orders(
    organization_id,work_order_key,governed_stream,state,admitted_at)
    VALUES (org_b,'NXL-COMPANY-WO-024','company','ADMITTED',now())
    RETURNING id INTO w_b;

  -- Cross-organization FK must reject another organization's actor.
  BEGIN
    INSERT INTO company_os.reviews(
      organization_id,work_order_id,reviewer_actor_id,candidate_head,verdict)
      VALUES (org_b,w_b,actor_a,repeat('a',40),'BLOCKED');
    RAISE EXCEPTION 'FAIL: cross-organization reviewer accepted';
  EXCEPTION WHEN foreign_key_violation THEN NULL;
  END;

  -- A blocked reason cannot be used on an admitted WO.
  BEGIN
    UPDATE company_os.work_orders
      SET blocked_reason='AWAITING_REMEDIATION' WHERE id=w_a;
    RAISE EXCEPTION 'FAIL: invalid blocked reason/state accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;

  INSERT INTO company_os.audit_records(
    organization_id,actor_id,command_id,correlation_id,
    action_type,resource_type,resource_id,outcome,authority_ref)
  VALUES (org_a,actor_a,cmd,gen_random_uuid(),
    'test.record','work_order',w_a,'SUCCEEDED','SYNTHETIC_CI_ONLY')
  RETURNING id INTO audit_a;

  BEGIN
    UPDATE company_os.audit_records SET action_type='test.forbidden' WHERE id=audit_a;
    RAISE EXCEPTION 'FAIL: audit update was allowed';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  BEGIN
    DELETE FROM company_os.audit_records WHERE id=audit_a;
    RAISE EXCEPTION 'FAIL: audit delete was allowed';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  IF NOT EXISTS (SELECT 1 FROM company_os.audit_records WHERE id=audit_a) THEN
    RAISE EXCEPTION 'FAIL: append-only audit disappeared';
  END IF;

  INSERT INTO company_os.outbox_events(
    organization_id,event_type,aggregate_type,aggregate_id,event_version,
    payload,correlation_id)
  VALUES (org_a,'work_order.changed','work_order',w_a,1,
    '{"synthetic":true}',gen_random_uuid()) RETURNING id INTO outbox_a;
  INSERT INTO company_os.inbox_receipts(
    organization_id,consumer_key,event_id,outcome)
    VALUES (org_a,'ci-worker',outbox_a,'PROCESSED');
  BEGIN
    INSERT INTO company_os.inbox_receipts(
      organization_id,consumer_key,event_id,outcome)
      VALUES (org_a,'ci-worker',outbox_a,'PROCESSED');
    RAISE EXCEPTION 'FAIL: consumer idempotency missing';
  EXCEPTION WHEN unique_violation THEN NULL;
  END;
  BEGIN
    INSERT INTO company_os.inbox_receipts(
      organization_id,consumer_key,event_id,outcome)
      VALUES (org_b,'ci-worker',outbox_a,'PROCESSED');
    RAISE EXCEPTION 'FAIL: cross-tenant inbox event accepted';
  EXCEPTION WHEN foreign_key_violation THEN NULL;
  END;

  -- PL/pgSQL exception block acts as subtransaction: an error after
  -- a multi-row write MUST undo work order, audit and outbox together.
  BEGIN
    INSERT INTO company_os.work_orders(
      organization_id,work_order_key,governed_stream,state)
      VALUES (org_a,'NXL-COMPANY-WO-026','local-test','PLANNED')
      RETURNING id INTO w_b;
    INSERT INTO company_os.audit_records(
      organization_id,command_id,correlation_id,
      action_type,resource_type,resource_id,outcome,authority_ref)
      VALUES (org_a,gen_random_uuid(),gen_random_uuid(),
        'test.fail','work_order',w_b,'FAILED','SYNTHETIC_CI_ONLY');
    INSERT INTO company_os.outbox_events(
      organization_id,event_type,aggregate_type,aggregate_id,event_version,
      payload,correlation_id)
      VALUES (org_a,'test.fail','work_order',w_b,1,
        '{"synthetic":true}',gen_random_uuid());
    RAISE EXCEPTION 'INJECTED_TRANSACTION_FAILURE';
  EXCEPTION WHEN raise_exception THEN
    NULL;
  END;
  IF EXISTS (SELECT 1 FROM company_os.work_orders
      WHERE organization_id=org_a AND work_order_key='NXL-COMPANY-WO-026')
    OR EXISTS (SELECT 1 FROM company_os.outbox_events
      WHERE organization_id=org_a AND event_type='test.fail')
    OR EXISTS (SELECT 1 FROM company_os.audit_records
      WHERE organization_id=org_a AND action_type='test.fail') THEN
    RAISE EXCEPTION 'FAIL: partial transaction effects survived';
  END IF;

  RAISE NOTICE 'WO-024 core SQL invariant suite PASSED (disposable fixture)';
END;
$wo024$;
ROLLBACK;
