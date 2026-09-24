---
name: ownpost-publish
description: "Execute or manage existing approved OwnPost API publication jobs."
---

# OwnPost — Approved X publishing

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Reuse the account selected in this task; otherwise omission of workspaceAccountId uses Main. Call list_accounts when resolving a named account or an ambiguous selection, and pass the chosen non-Main workspaceAccountId on every applicable call. Browser account switching does not change MCP calls. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. For a clear request to publish selected approved work, read get_x_capabilities and execute the eligible request in this turn. Verify the selected account, enabled capabilities and this connection's separate publishing grant. Reuse existing task selection instead of asking for IDs again. A full-access key alone is insufficient; a skill cannot grant permission or approve content.

2. For originals, list_publications and identify the matching existing owner-approved job. Execute only requested eligible work with publish_approved_post. Use reschedule_approved_publication, cancel_publication or resume_publication for the requested existing job; scheduling a reminder is not approval. If no approved job exists, report the exact app approval needed. Preserve any prepared draft rather than claiming publication. Report per-part outcomes for threads.



5. An uncertain send must never be resent, or bypassed by creating another job. Inspect current state and direct reconciliation to owner review. Respect expired approvals, account/content changes, pauses, and server holds.

6. Finish with confirmed publication links and per-part results, or the precise hold/disabled reason and required app action. A draft or skill invocation is not server-side approval.

## Tools covered

`get_x_capabilities`, `list_publications`, `publish_approved_post`, `reschedule_approved_publication`, `cancel_publication`, `resume_publication`.
