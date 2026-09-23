---
name: ownpost-replies
description: "Capture OwnPost conversation targets, save private reply options, and record owner-reported manual replies."
---

# OwnPost — Manual reply preparation

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Capture a selected conversation with capture_reply_target using visible text/context or a saved screenshot Inspiration ID. A URL alone does not establish what the conversation says. If duplicate X IDs return an existing target, read its actual state rather than assuming new input overwrote it.

2. Use list_reply_targets to find targets and get_assistant_context with selected targetIds to load preferences, voice, and context. Ask for missing conversation evidence before drafting.

3. Save each option with save_reply_draft using a UUID id reused on retries. Edits need expectedRevision. A claimed run writes through complete_assistant_work instead.

4. record_reply_publication is only for an explicit owner report of actual manual publication, with the current revision and actual time. This preparation workflow never sends a reply. For an explicitly requested API send, use the approved-publication workflow and its separate grant.

5. Return the target, saved options, and manual publication status.

## Tools covered

`capture_reply_target`, `list_reply_targets`, `save_reply_draft`, `record_reply_publication`.
