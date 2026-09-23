---
name: ownpost-publish
description: "Execute or manage existing approved OwnPost API publication jobs and owner-accepted reply targets."
---

# OwnPost — Approved X publishing

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Read get_x_capabilities before execution and verify the selected account, enabled capabilities, and this connection's separate publishing grant. A full-access key alone is insufficient. A skill cannot grant permission or approve a target.

2. For originals, list_publications and identify the existing owner-approved job. Execute only requested eligible work with publish_approved_post. Use reschedule_approved_publication, cancel_publication, or resume_publication for the requested existing job; scheduling a reminder is not approval. Report per-part outcomes for threads.

3. For replies, inspect list_reply_opportunities when selecting work. claim_approved_reply uses clientName matching the actual runner ("codex" or "claude"). A successful claim of an accepted target permits generating and sending one response without a second wording approval. Use the returned context/voice and preserve generatedText exactly when already present.

4. Call publish_approved_reply with the claim's id, active leaseToken, and text. If generation is blocked before sending, use fail_reply_work with a short reason.

5. An uncertain send must never be resent, reset with fail_reply_work, or bypassed by creating another job. Inspect current state and direct reconciliation to owner review. Respect expired approvals, account/content changes, pauses, and server holds.

6. Return confirmed publication links and per-part results, or the precise hold/disabled reason. A pending target, draft, or skill invocation is not server-side approval.

## Tools covered

`get_x_capabilities`, `list_reply_opportunities`, `claim_approved_reply`, `publish_approved_reply`, `fail_reply_work`, `list_publications`, `publish_approved_post`, `reschedule_approved_publication`, `cancel_publication`, `resume_publication`.
