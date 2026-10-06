# NexLabs Technology — Supply-Chain Security

**Status:** `CANONICAL_WO_011`

## Covered supply chain

- packages/dependencies;
- containers/base images;
- GitHub Actions;
- models;
- datasets;
- plugins/connectors;
- CLIs;
- build artifacts;
- infrastructure modules;
- external APIs.

## Provenance

Material components should have traceable:
- source;
- version;
- license/terms;
- integrity/hash/signature where available;
- maintainer/provider;
- update history.

## Dependency control

Prefer:
- lockfiles;
- pinned versions/digests where appropriate;
- verified registries/sources;
- minimal dependency surface;
- automated vulnerability checks;
- controlled upgrades.

## CI third-party actions

Third-party CI actions are executable supply-chain dependencies.

Pin or otherwise constrain them according to risk and review changes before privileged use.

## Containers

For production/high-trust workloads:
- minimize base image;
- avoid unnecessary root;
- scan dependencies/images;
- prefer immutable image identity;
- rebuild regularly for security updates.

## Models/plugins/connectors

Treat model/tool integrations as third-party capabilities with:
- permission review;
- data-use review;
- version/provider identity;
- failure/compromise boundary.

## Vulnerability response

Material vulnerable dependencies require:
- severity/exploitability review;
- exposure mapping;
- upgrade/mitigation;
- retest;
- evidence.

## Typosquatting/confusion

Package/model/plugin names from untrusted content are not automatically install authority.
