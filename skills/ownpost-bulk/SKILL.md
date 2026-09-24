---
name: ownpost-bulk
description: "Apply bulk OwnPost draft, schedule, slot, or inspiration changes and reconcile partial failures."
---

# OwnPost — Bulk workspace changes

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Reuse the account selected in this task; otherwise omission of workspaceAccountId uses Main. Call list_accounts when resolving a named account or an ambiguous selection, and pass the chosen non-Main workspaceAccountId on every applicable call. Browser account switching does not change MCP calls. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Resolve the requested collection with precise filters and pagination, or reuse selected IDs. For a clear request such as “archive these drafts”, fetch current state and perform it without asking for the same selection again. Ask only when the selection or requested action is ambiguous. Discover each tool's live schema; these content batches take {items:[...]} with 1–25 entries, so split a larger authorized set into batches.

2. For requested content generation, read get_assistant_context once, write in the saved voice within the brief and save all requested items. Every bulk draft needs its own clientRequestId UUID, reused only for retries of that draft. Bulk post changes require expectedUpdatedAt from get_post. Preserve partIds when editing threads. Schedule ISO instants from requested times or real schedule choices in the workspace timezone; inferred writing defaults do not authorize additional scheduling.

3. Bulk operations validate inputs first but commit content items independently. Inspect every ordered results entry (index, ok, result/error), succeededCount, and failedCount. Successful entries remain committed. Retry only failures after resolving their current state; for uncertain creates, inspect existing data before retrying.

4. Post cleanup uses archive_posts. Permanent Idea cleanup requires an explicit request for the selected eligible items and confirm:"DELETE" on every item. Archive sources first only when the owner's requested cleanup includes that action.

5. Dedicated create_posting_slots/delete_posting_slots use slots/ids with 1–100 entries and atomic behavior; they are different from these content batches.

6. Finish after every requested item has a known success or actionable failure. Summarize counts with saved IDs or a compact item list, and identify remaining failures. Bulk writes never publish to X.

## Tools covered

`create_drafts`, `update_posts`, `schedule_posts`, `archive_posts`, `restore_posts`, `move_posts_to_drafts`, `skip_posts`, `update_posting_slots`, `create_inspirations`, `update_inspirations`, `archive_inspirations`, `restore_inspirations`, `permanently_delete_inspirations`.
