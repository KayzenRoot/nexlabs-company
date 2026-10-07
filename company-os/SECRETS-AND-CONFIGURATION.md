# NexLabs Company OS — Local Secrets & Configuration

Status: CANONICAL_WO_017

Committed public-safe defaults live in infra/docker/.env.example.

Local runtime configuration lives in infra/docker/.env and is ignored by Git.

Local secrets live in infra/docker/secrets/local/, are ignored by Git and are mounted through Compose secrets.

Rules:
- no real credential in committed defaults;
- no secrets in Git;
- no raw secret in normal Company OS domain tables;
- no raw secret in logs or telemetry;
- production credentials are not copied from local development;
- bootstrap creates only missing local secret files.

Changing the PostgreSQL bootstrap secret file does not automatically rotate the password inside an initialized database. Initialized-state rotation is deliberate.
