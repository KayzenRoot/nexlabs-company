# NexLabs Company OS — Local Recovery & Future Staging/Production Readiness

**Work Order:** NXL-COMPANY-WO-021
**Status:** APPROVED/MERGED / CI_FIXTURE_LOCAL_RECOVERY_ONLY / NO_PRODUCTION_DEPLOYMENT
**Scope:** DoD-critical offline local recovery rehearsal and portability runbook, **not** authorization to deploy or operate 24/7 infrastructure.

## Environments and promotion gates
| Environment | Purpose | External access | Identity | Data |
| --- | --- | --- | --- | --- |
| Disposable CI recovery fixture | Verify backup and restore contracts | No service host port | Synthetic CI-only fixture | Isolated PostgreSQL and artifact volumes |
| Local developer workstation | Company OS development | Loopback only where enabled | Local development, not real Founder SSO | Founder-owned local persistent volumes |
| Staging (FUTURE) | Integration, security and canary acceptance | Requires separately approved ingress policy | Scoped OIDC/session with MFA for privileged ops | Synthetic/anonymized, never unreviewed production copy |
| Production (FUTURE) | 24/7 company operations | Separately approved ingress/authentication | Role/capability policy, explicit Founder grants | Controlled PostgreSQL canonical store, encrypted evidence |

No provisioning/deployment of staging/production is performed by WO-021. Do not expose the unauthenticated WO-020 dashboard beyond `127.0.0.1`.

## Recovery runbook and proof
- PostgreSQL is canonical. Backup `pg_dump -Fc`, restore with `pg_restore --list` validation and `--single-transaction --exit-on-error --clean --if-exists`, explicit dump path and destructive confirmation. A database restore is a privileged, destructive operator action, not an agent permission.
- Artifact backup is a tar archive of a named evidence volume. Validate that the tar can be listed and extracted into temporary staging before deleting existing destination files. The archive's **trust/provenance is still an operator responsibility**; checksum alone is not authenticity.
- Real fixture rehearsal: `infra/docker/scripts/ci-recovery-rehearsal.sh`. Restricted to GitHub Actions, checks unique named resources/no preexisting .env, SQL before/after restore and artifact SHA-256. Negative paths ensure confirmation/missing/corrupt files fail before mutation.
- PostgreSQL failure exits nonzero; `--single-transaction` prevents partial **SQL restore** on error. This does not prove cross-system atomicity between PostgreSQL and artifact storage.
- Artifact copy into a live volume is **not atomic**, even after archive validation. If disk fills or process dies during copy, the destination may need recovery from an additional trusted backup. A future production Work Order needs versioned object storage, immutable snapshots or two-phase cutover.
- An archive with malicious symlinks or specially encoded filenames is not proven safe; trusted backup input must be externally validated/allowlisted before privileged recovery. No assertion that the test covers hostile arbitrary uploads.
- No user workstation data is touched by CI. The fixture database and artifact volume are unique to the GitHub runner. CI does not use `docker compose down --volumes` on user machines.

### Local operator playbook (not run by CI)
1. Identify exact project, data classification and current backup/restore policy.
2. Pause writers; capture pre-restore backup and audit approval (human operator only).
3. Verify the archive provenance, database/version compatibility, encryption and expiry.
4. Practice the restore in **isolated staging** first; verify application-specific row/evidence integrity and client contract.
5. Schedule an approved maintenance window. Record checkpoint, rollback plan, exact backup SHA, operator identity and action digest.
6. Use the scripts only with explicit input and `NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE`.
7. Read back DB records and evidence hashes after restore; otherwise mark `RECOVERY_REQUIRED`, not healthy.
8. Resume writers only after verification and approval.

## Deployment and operational gates for future WO
- **Infrastructure:** dedicated environment namespaces/networks, TLS/DNS, resource quotas and backups, least-privileged IAM, no public raw PostgreSQL/Redis ports and no Docker socket in app services.
- **Secrets:** secret manager/mounted short-lived handles, least privilege, rotation, redaction and log controls; never commit .env or credentials.
- **CI/CD:** immutable image digests, SBOM/provenance, scoped OIDC deployment credentials, supply-chain reviews, release artifact signing, protected PR and exact-head checks.
- **Database:** reviewed migrations with rollback/roll-forward, backup prior to destructive migration, restoration drill and retention/deletion policy.
- **Observability:** actual request/run/approval/cost/failure/health instrumentation linked to correlation+Work Order IDs. WO-020 currently shows `NOT_CONNECTED`, **not evidence of monitoring**.
- **Alerts:** actionable alert routes for DB health, recovery required, failed approval validation, backup freshness and cost/usage variance.
- **SLO candidates, not measurements:** define reliability/latency objectives only after instrumented baseline; never claim percentages before evidence.
- **Release promotion:** staging smoke, security sign-off, backup verification, exact-head evidence, Founder approval for high-risk actions, gradual rollout, read-back and incident response.
- **Rollback/roll-forward:** revert immutable application image when schema backward-compatible; otherwise use reviewed forward migration or verified restore of approved checkpoint.

## Still missing for v0.1 integrated DoD
1. The Founder dashboard's real execution/approval/failure data are `NOT_CONNECTED`; WO-021 **does not** close this gap.
2. Trusted real Founder identity and external provider-backed engineering execution are not implemented; accepted WO-019 remains deterministic offline demo.
3. CI recovery proves only disposable Docker fixtures, not customer's actual disaster recovery, RPO/RTO or 24/7 operations.
4. Final integrated WO-022 acceptance and explicit Founder sign-off remain mandatory. Do not automatically approve version completion.
