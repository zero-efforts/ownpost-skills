---
name: ownpost-routines
description: "Set up OwnPost recurring preparation or reminders, complete requested one-time preparation, and inspect routine progress."
---

# OwnPost — Routines and preparation jobs

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Reuse the account selected in this task; otherwise omission of workspaceAccountId uses Main. Call list_accounts when resolving a named account or an ambiguous selection, and pass the chosen non-Main workspaceAccountId on every applicable call. Browser account switching does not change MCP calls. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Read get_assistant_overview and get_assistant_context for existing routines, preferences and timezone. Match the requested routine before creating another. Distinguish “prepare this now” from “prepare this every weekday”: only the latter requests recurrence. Reuse supplied choices and saved preferences; ask only for an unresolved schedule or required source.

2. Resolve task kind, local schedule/date, sources, output count and notification intent. Use save_assistant_routine for a requested recurring or one-time routine; reuse its UUID on retry and supply expectedRevision for edits. Editing cancels unfinished previous occurrences. Preserve existing notification settings for edits; a new preparation job defaults notifications off unless requested.

3. Use request_assistant_work for requested preparation, reusing its UUID on retry. When the user asks for the result now, continue in this session: pass the returned occurrence's id as occurrenceId to claim_assistant_work, read the selected context, and produce the requested draft_preparation drafts. Save every output atomically through complete_assistant_work with the returned occurrence ID and leaseToken, using its drafts array for draft_preparation; a queued record alone does not complete a “prepare now” request.

4. Follow the claim's sources, quantities and 30-minute lease. Ground original writing in the owner's context. After uncertain completion inspect status and retry only with the same ID/token when valid; use fail_assistant_work for a blocked active claim. These outputs are preparation, not publication.

5. Future routines require a running Codex/Claude session or explicitly configured client automation to claim due work. Saving a routine does not launch that runner. Explain whether a runner is actually configured, without claiming that an interval creates one. Finish with the saved routine/job ID, local timing and status; for immediate work, include the outputs actually completed or the precise remaining blocker.

## Tools covered

`get_assistant_overview`, `save_assistant_routine`, `request_assistant_work`.
