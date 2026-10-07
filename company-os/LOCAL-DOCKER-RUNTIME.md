# NexLabs Company OS — Local Docker Runtime

Status: CANONICAL_WO_017

## Runtime objective

Provide a reproducible local infrastructure substrate before Company OS application/runtime implementation.

## Core stack

PostgreSQL is always-on canonical transactional local state with a named persistent volume, health check, no host port by default and a private data network.

Redis is an optional cache profile with no durable persistence and tmpfs data. If Redis disappears, canonical Company OS state must survive.

Artifact/evidence storage uses a named persistent Docker volume behind the portable artifact-store abstraction.

## Application containers

WO-017 does not create fake company-os-app or company-os-worker images before code exists.

## Networks

data_plane is internal for data/cache/app traffic.
observability is internal for telemetry services and future producers.

## Host exposure

Only optional developer observability ports are host-published, bound to 127.0.0.1.

## No Docker socket

No service mounts /var/run/docker.sock. Future host/container execution uses bounded executor/broker contracts.
