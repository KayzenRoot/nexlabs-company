# WO-022 — Historical secret-scan triage (evidence, not blanket security clearance)

**Classification:** ELEVATED, read-only evidence. **No credentials or raw matching strings reproduced here.**
**Evidence source:** GitHub Actions [run 37714353494](https://github.com/KayzenRoot/nexlabs-company/actions/runs/37714353494), job `113107312051`, candidate HEAD `341dde8c701c39e76090a3adfd53a68feadfadb9`.
**Tool:** pinned Gitleaks Action v3.0.0 SHA `e0c47f4f8be36e29cdc102c57e68cb5cbf0e8d1e`, scanner v8.24.3, fetched Git history and current PR change range.
**Result:** **664 commits scanned** in the full-history pass; **0 unhandled findings** after targeted historical exceptions. Separate PR scan also passed.

## Eight historical alerts, investigated without exposing potential secrets

All eight were from Gitleaks rule `generic-api-key`, across four source paths:

| Source | Hits | Context validated at the historical revisions |
| --- | ---: | --- |
| `.engineering/CHECKPOINT.md` | 2 | Documentation about a negative test for *missing* approval tokens; no token value in the cited lines. |
| `.engineering/context-locks/NXL-COMPANY-WO-020.json` | 2 | Git object blob SHA-1 fingerprints (40 hexadecimal digits) identifying source versions, not bearer credentials. |
| `.engineering/evidence/NXL-COMPANY-GEF-BOOTSTRAP-001/init-plan.json` | 2 | Synthetic GEF idempotency SHA-256 identifiers (64 hexadecimal digits), not keys used for authentication. |
| `.engineering/evidence/NXL-COMPANY-GEF-BOOTSTRAP-001/init-apply.json` | 2 | Corresponding synthetic idempotency SHA-256 identifiers, not keys used for authentication. |

The exception file `company-os/acceptance/.gitleaksignore` records **only the eight exact commit/path/rule/line fingerprints** after inspection. No global path, repository, secret detector, or rule has been excluded; later findings from these paths must still trigger review. Rewriting historical commits is unnecessary for these confirmed non-credential strings.

## Remaining limits

This proof is **automated secret-pattern screening of the fetched Git history**, not a complete security audit, pentest, credential-inventory reconciliation, remote secret revocation check, or guarantee about all possible undetectable secrets. In particular, it does **not** clear `GOV-04` or independently certify production.

**Owner self-triage**, not independent audit. Preserve fail-closed status for other release gaps. Exact HEAD verification must be rerun for any subsequent changes; do not treat a previous green job as proof for a later SHA.
