-- WO-024 / PostgreSQL 17. Local-only canonical persistence foundation.
-- Apply with psql -X -v ON_ERROR_STOP=1 -1 -f 0001_core.sql against a
-- disposable database first. Never use this migration to reset user volumes.
CREATE SCHEMA IF NOT EXISTS company_os;
SET LOCAL search_path TO company_os, pg_catalog;

CREATE TABLE IF NOT EXISTS company_os.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9][a-z0-9-]{1,62}$'),
  name text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 200),
  status text NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','SUSPENDED','RETIRED')),
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS company_os.actors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  actor_type text NOT NULL CHECK (actor_type IN ('FOUNDER','HUMAN','AI_AGENT','SYSTEM')),
  display_name text NOT NULL CHECK (length(btrim(display_name)) BETWEEN 1 AND 200),
  status text NOT NULL DEFAULT 'INACTIVE' CHECK (status IN ('INACTIVE','ACTIVE','SUSPENDED','RETIRED')),
  external_identity_ref text,
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id)
);

CREATE TABLE IF NOT EXISTS company_os.work_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  work_order_key text NOT NULL CHECK (work_order_key ~ '^NXL-COMPANY-WO-[0-9]{3}$'),
  governed_stream text NOT NULL DEFAULT 'company' CHECK (length(governed_stream) BETWEEN 1 AND 80),
  state text NOT NULL DEFAULT 'PLANNED' CHECK (state IN (
    'PLANNED','ADMITTED','IN_PROGRESS','REVIEW_READY','CORRECTION_REQUIRED',
    'BLOCKED','CANCELLED','APPROVED','MERGED','PROMOTED','CLOSED')),
  blocked_reason text CHECK (blocked_reason IS NULL OR blocked_reason IN ('AWAITING_REMEDIATION','DEPENDENCY','AUTHORITY','EVIDENCE')),
  issue_ref text,
  risk_class text NOT NULL DEFAULT 'ELEVATED' CHECK (risk_class IN ('LOW','MODERATE','ELEVATED','HIGH_ASSURANCE')),
  admission_base_sha text CHECK (admission_base_sha IS NULL OR admission_base_sha ~ '^[0-9a-f]{40}$'),
  active_branch text,
  disposition_evidence_ref text,
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  admitted_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id),
  UNIQUE (organization_id, work_order_key),
  CHECK (blocked_reason IS NULL OR state = 'BLOCKED'),
  CHECK (state <> 'BLOCKED' OR blocked_reason IS NOT NULL),
  CHECK (state NOT IN ('ADMITTED','IN_PROGRESS') OR admitted_at IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS work_orders_one_active_per_stream
  ON company_os.work_orders (organization_id, governed_stream)
  WHERE state IN ('ADMITTED','IN_PROGRESS');

CREATE TABLE IF NOT EXISTS company_os.context_locks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  work_order_id uuid NOT NULL,
  base_sha text NOT NULL CHECK (base_sha ~ '^[0-9a-f]{40}$'),
  source_fingerprints jsonb NOT NULL CHECK (jsonb_typeof(source_fingerprints) = 'object'),
  allowed_outputs jsonb NOT NULL CHECK (jsonb_typeof(allowed_outputs) = 'array'),
  state text NOT NULL DEFAULT 'LOCKED' CHECK (state IN ('LOCKED','STALE','RETIRED')),
  compiled_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id),
  FOREIGN KEY (organization_id, work_order_id)
    REFERENCES company_os.work_orders(organization_id, id)
);
CREATE UNIQUE INDEX IF NOT EXISTS context_locks_one_locked_per_work_order
  ON company_os.context_locks (organization_id, work_order_id)
  WHERE state = 'LOCKED';

CREATE TABLE IF NOT EXISTS company_os.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  work_order_id uuid NOT NULL,
  task_type text NOT NULL CHECK (length(task_type) BETWEEN 1 AND 100),
  state text NOT NULL DEFAULT 'PENDING' CHECK (state IN ('PENDING','READY','RUNNING','SUCCEEDED','FAILED','BLOCKED','RECOVERY_REQUIRED','CANCELLED')),
  input_ref text,
  result_ref text,
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id),
  FOREIGN KEY (organization_id, work_order_id)
    REFERENCES company_os.work_orders(organization_id, id)
);

CREATE TABLE IF NOT EXISTS company_os.execution_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  task_id uuid NOT NULL,
  runtime_adapter text NOT NULL CHECK (length(runtime_adapter) BETWEEN 1 AND 120),
  state text NOT NULL DEFAULT 'CREATED' CHECK (state IN ('CREATED','DISPATCHED','RUNNING','SUCCEEDED','FAILED','UNKNOWN_COMPLETION','CANCELLED')),
  correlation_id uuid NOT NULL,
  external_run_ref text,
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id),
  FOREIGN KEY (organization_id, task_id)
    REFERENCES company_os.tasks(organization_id, id)
);

CREATE TABLE IF NOT EXISTS company_os.evidence_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  bundle_type text NOT NULL CHECK (length(bundle_type) BETWEEN 1 AND 80),
  state text NOT NULL DEFAULT 'CAPTURED' CHECK (state IN ('CAPTURED','VERIFIED','REJECTED','SUPERSEDED')),
  exact_head text CHECK (exact_head IS NULL OR exact_head ~ '^[0-9a-f]{40}$'),
  manifest_sha256 text NOT NULL CHECK (manifest_sha256 ~ '^[0-9a-f]{64}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id)
);
CREATE TABLE IF NOT EXISTS company_os.evidence_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  bundle_id uuid NOT NULL,
  evidence_type text NOT NULL,
  artifact_ref text NOT NULL CHECK (length(artifact_ref) BETWEEN 1 AND 2048),
  content_sha256 text NOT NULL CHECK (content_sha256 ~ '^[0-9a-f]{64}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, bundle_id)
    REFERENCES company_os.evidence_bundles(organization_id, id)
);

CREATE TABLE IF NOT EXISTS company_os.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  work_order_id uuid NOT NULL,
  reviewer_actor_id uuid,
  candidate_head text NOT NULL CHECK (candidate_head ~ '^[0-9a-f]{40}$'),
  verdict text NOT NULL CHECK (verdict IN ('APPROVED','CORRECTION_REQUIRED','BLOCKED')),
  independent boolean NOT NULL DEFAULT false,
  findings_summary text,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, work_order_id)
    REFERENCES company_os.work_orders(organization_id, id),
  FOREIGN KEY (organization_id, reviewer_actor_id)
    REFERENCES company_os.actors(organization_id, id)
);

CREATE TABLE IF NOT EXISTS company_os.approval_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  action_digest text NOT NULL CHECK (action_digest ~ '^[0-9a-f]{64}$'),
  risk_class text NOT NULL CHECK (risk_class IN ('LOW','MODERATE','ELEVATED','HIGH_ASSURANCE')),
  state text NOT NULL DEFAULT 'DRAFT' CHECK (state IN ('DRAFT','PENDING','APPROVED','DENIED','EXPIRED','REVOKED')),
  target_ref text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id)
);
CREATE TABLE IF NOT EXISTS company_os.approval_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  approval_request_id uuid NOT NULL,
  approver_actor_id uuid NOT NULL,
  decision text NOT NULL CHECK (decision IN ('APPROVED','DENIED','REVOKED')),
  rationale text,
  decided_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, approval_request_id)
    REFERENCES company_os.approval_requests(organization_id, id),
  FOREIGN KEY (organization_id, approver_actor_id)
    REFERENCES company_os.actors(organization_id, id)
);

CREATE TABLE IF NOT EXISTS company_os.audit_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  actor_id uuid,
  command_id uuid NOT NULL,
  correlation_id uuid NOT NULL,
  action_type text NOT NULL CHECK (length(action_type) BETWEEN 1 AND 120),
  resource_type text NOT NULL,
  resource_id uuid NOT NULL,
  outcome text NOT NULL CHECK (outcome IN ('SUCCEEDED','DENIED','FAILED','RECOVERY_REQUIRED')),
  authority_ref text NOT NULL,
  metadata_redacted jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata_redacted) = 'object'),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, actor_id)
    REFERENCES company_os.actors(organization_id, id),
  UNIQUE (organization_id, command_id)
);

CREATE OR REPLACE FUNCTION company_os.reject_audit_mutation()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog AS $$
BEGIN
  RAISE EXCEPTION 'APPEND_ONLY_AUDIT_RECORDS' USING ERRCODE = '23514';
END;
$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger
      WHERE tgrelid='company_os.audit_records'::regclass
        AND tgname='reject_audit_mutation') THEN
    CREATE TRIGGER reject_audit_mutation
      BEFORE UPDATE OR DELETE ON company_os.audit_records
      FOR EACH ROW EXECUTE FUNCTION company_os.reject_audit_mutation();
  END IF;
END;
$$;
REVOKE ALL ON company_os.audit_records FROM PUBLIC;

CREATE TABLE IF NOT EXISTS company_os.outbox_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  event_type text NOT NULL CHECK (length(event_type) BETWEEN 1 AND 120),
  aggregate_type text NOT NULL,
  aggregate_id uuid NOT NULL,
  event_version bigint NOT NULL CHECK (event_version > 0),
  payload jsonb NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
  correlation_id uuid NOT NULL,
  state text NOT NULL DEFAULT 'PENDING' CHECK (state IN ('PENDING','CLAIMED','DELIVERED','RECOVERY_REQUIRED','DEAD_LETTER')),
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0 AND attempts <= 10),
  available_at timestamptz NOT NULL DEFAULT now(),
  claimed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  delivered_at timestamptz,
  UNIQUE (organization_id, id)
);
CREATE INDEX IF NOT EXISTS outbox_pending_poll_idx
  ON company_os.outbox_events (available_at, created_at)
  WHERE state = 'PENDING';

CREATE TABLE IF NOT EXISTS company_os.inbox_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  consumer_key text NOT NULL,
  event_id uuid NOT NULL,
  outcome text NOT NULL CHECK (outcome IN ('PROCESSED','RECOVERY_REQUIRED','REJECTED')),
  processed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, consumer_key, event_id),
  FOREIGN KEY (organization_id, event_id)
    REFERENCES company_os.outbox_events(organization_id, id)
);

CREATE TABLE IF NOT EXISTS company_os.external_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  integration_type text NOT NULL,
  local_resource_type text NOT NULL,
  local_resource_id uuid NOT NULL,
  external_type text NOT NULL,
  external_id text NOT NULL,
  external_version_sha text CHECK (external_version_sha IS NULL OR external_version_sha ~ '^[a-f0-9]{40}$'),
  last_verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, integration_type, external_type, external_id)
);

CREATE TABLE IF NOT EXISTS company_os.checkpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES company_os.organizations(id),
  checkpoint_key text NOT NULL,
  status text NOT NULL,
  main_sha text NOT NULL CHECK (main_sha ~ '^[0-9a-f]{40}$'),
  completed_through_work_order text NOT NULL,
  payload jsonb NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, checkpoint_key)
);
