# NexLabs Company OS — Local Backup & Restore

Status: CANONICAL_WO_017

Local recovery covers PostgreSQL canonical data and the artifact/evidence volume.

PostgreSQL backup uses pg_dump custom format from the running container and writes timestamped files under runtime/backups.

PostgreSQL restore requires an explicit dump path and explicit NEXLABS_RESTORE_CONFIRM destructive confirmation. It never restores an implicit latest file.

Artifact backup mounts the artifact volume read-only and archives it into runtime/backups.

Artifact restore requires an explicit archive path and destructive confirmation.

Backups are ignored by Git.

A backup is not trusted only because creation succeeded. Integrated acceptance should rehearse controlled restore and application-level integrity.

## WO-021 recovery hardening (CI-proven local fixtures only)

Restore now preflights PostgreSQL `pg_restore --list` and applies SQL within a single transaction with `--exit-on-error`; Bash/PowerShell keep explicit archive and destructive-confirmation inputs. Artifact restore validates tar listing and extraction in a disposable stage before deleting destination files. **Final artifact copy is not atomic** and archives are not authenticated; restore only trusted backups.

`infra/docker/scripts/ci-recovery-rehearsal.sh` is strictly CI fixture-only: it creates isolated PostgreSQL and artifact volumes, verifies SQL rollback of post-backup changes, checks restored artifact SHA-256 and tests missing confirmation/missing/corrupt inputs. This is not permission to restore or erase user data; production recovery needs a separate approved runbook and independent test evidence.

See `company-os/STAGING-PRODUCTION-READINESS.md` for constraints and remaining DoD gaps.
