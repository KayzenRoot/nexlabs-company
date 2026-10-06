# NexLabs Technology — High-Assurance Action Protocol

**Status:** `CANONICAL_WO_011`

## Applies to

- money movement;
- trading execution;
- Web3 signing;
- smart-contract deployment/upgrade with value/privilege;
- privileged IAM;
- secret/key administration;
- destructive production data operations;
- security-policy override;
- other actions classified HIGH_ASSURANCE.

## Protocol

### 1. Prepare
Create an exact action package.

### 2. Preview
Show the human-understandable target and expected consequence.

### 3. Validate
Confirm:
- actor;
- authority;
- environment;
- target;
- amount/value;
- dependencies;
- risk;
- rollback/roll-forward;
- freshness.

### 4. Approve
Collect required explicit Founder/authorized approval.

Approval must bind to the specific action package/version.

### 5. Execute once
Use bounded executor and idempotency/nonce/expected-state controls where available.

### 6. Verify
Read back independent provider/system state.

### 7. Receipt
Record attributable execution without secrets.

### 8. Reconcile
If ambiguous, stop and reconcile. Never blindly replay.

## Approval invalidation

Approval becomes stale when material fields change:
- target;
- value;
- chain/account/environment;
- payload;
- permission;
- risk classification.

A changed action requires renewed approval.

## Separation of duties

For material risk, no single agent should generate intent, approve it, execute it and certify success without independent control.

## Emergency

Emergency handling may shorten normal workflow only under a predefined break-glass policy. It may not erase receipts or post-incident review.
