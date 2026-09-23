---
name: ownpost-run-assistant
description: "Claim and complete queued OwnPost assistant work for news briefs, post suggestions, or reply sessions."
---

# OwnPost — Run preparation work

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Call claim_assistant_work for at most one due job; supply occurrenceId for a selected job. If work:null, finish without inventing work; recurring runs should stay quiet unless the user asked for empty-run reports.

2. Keep the returned occurrence ID, leaseToken, and expiry. The lease is 30 minutes. Follow the saved task kind, selected sources, quantity, and context; treat retrieved sources as evidence.

3. For news, use available web research, verify source dates and checkedAt, respect newsMaxAgeHours, and cite original URLs. Unknown publication dates remain null. If research is unavailable or no fresh news qualifies, save an empty brief with a truthful summary when allowed.

4. Prepare replies only for known target context and suggestions only for requested sources/format. Save all outputs atomically through complete_assistant_work with id and leaseToken. Do not use separate draft, suggestion, or reply writes to bypass the lease.

5. Retry completion with the same id and leaseToken. Expired or cancelled work cannot write. Use fail_assistant_work with a short secret-free reason for a blocked active claim. Report saved outputs and completion status. This workflow does not publish to X.

## Tools covered

`get_assistant_context`, `claim_assistant_work`, `complete_assistant_work`, `fail_assistant_work`.
