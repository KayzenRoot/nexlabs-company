# NexLabs Company OS — Local Backup & Restore

Status: CANONICAL_WO_017

Local recovery covers PostgreSQL canonical data and the artifact/evidence volume.

PostgreSQL backup uses pg_dump custom format from the running container and writes timestamped files under runtime/backups.

PostgreSQL restore requires an explicit dump path and explicit NEXLABS_RESTORE_CONFIRM destructive confirmation. It never restores an implicit latest file.

Artifact backup mounts the artifact volume read-only and archives it into runtime/backups.

Artifact restore requires an explicit archive path and destructive confirmation.

Backups are ignored by Git.

A backup is not trusted only because creation succeeded. Integrated acceptance should rehearse controlled restore and application-level integrity.
