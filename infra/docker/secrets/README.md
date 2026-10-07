# Local Docker secrets

Only this README is committed.

Create runtime secrets under `infra/docker/secrets/local/`. That directory is ignored by Git.

`bootstrap.sh` / `bootstrap.ps1` create:
- `postgres_password.txt`
- `grafana_admin_password.txt`

These credentials are for the local development environment only. Never copy production credentials into this directory or commit secret values.
