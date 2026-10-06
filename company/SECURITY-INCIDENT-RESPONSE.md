# NexLabs Technology — Security Incident Response

**Status:** `CANONICAL_WO_011`

## Incident lifecycle

`DETECT → TRIAGE → CONTAIN → PRESERVE_EVIDENCE → ASSESS → ESCALATE/NOTIFY → ERADICATE → RECOVER → VERIFY → LEARN`

## Severity inputs

Assess:
- data sensitivity;
- credentials/keys affected;
- privilege obtained;
- production/customer impact;
- money/value at risk;
- persistence/lateral movement;
- legal/regulatory exposure;
- scale;
- exploitability.

## Immediate rules

- protect people/data/value first;
- do not destroy useful evidence;
- rotate/revoke exposed credentials;
- isolate compromised systems when appropriate;
- preserve timestamps and actor/action receipts;
- avoid speculative public statements.

## Personal-data incidents

When personal data is involved:
- identify controller/operator roles;
- assess risk/damage to data subjects;
- determine whether ANPD/data-subject notification is required under current law/regulation;
- capture required facts;
- preserve incident record for the applicable retention period.

Current baseline notes that ANPD Resolution CD/ANPD 15/2024 requires incident records involving personal data to be retained for at least five years. Applicability and deadlines must be current-checked at incident time.

## Notification

External notification is not automated solely from an agent conclusion.

Legal/privacy/security assessment determines:
- regulator;
- data subjects;
- customers/partners;
- insurers;
- law enforcement;
- public communication.

## Recovery

Recovery requires:
- known-good state;
- credential/key remediation;
- vulnerability/root-cause treatment;
- monitoring;
- read-back/health verification.

## Post-incident

Produce:
- timeline;
- root cause;
- impact;
- evidence;
- controls that failed;
- remediation;
- owner/date;
- follow-up tests.

Blameless analysis does not mean accountability-free operation.
