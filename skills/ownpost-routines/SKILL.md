---
name: ownpost-routines
description: "Create or change OwnPost personal routines and queued preparation jobs, and inspect their progress."
---

# OwnPost — Routines and preparation jobs

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Read get_assistant_overview and get_assistant_context to understand existing routines, preferences, and timezone. Match the requested routine before creating another.

2. Resolve task kind, local schedule/date, source or target selection, desired outputs, and notification intent. Use save_assistant_routine for a requested recurring or one-time routine; reuse its UUID on retry and supply expectedRevision for edits. Editing cancels unfinished previous occurrences.

3. Use request_assistant_work for a requested preparation job or reply session. Reuse the job UUID on retry. Notifications default off; enable only when requested.

4. Saving these records does not start an AI client. A separate running Codex/Claude session or explicitly configured client automation must claim and complete due work. Explain that distinction and report whether an actual runner was configured; do not claim that saving an interval creates it.

5. Return the routine/job ID, timing, notification choice, and current status.

## Tools covered

`get_assistant_overview`, `save_assistant_routine`, `request_assistant_work`.
