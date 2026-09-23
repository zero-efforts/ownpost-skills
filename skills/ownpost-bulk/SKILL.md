---
name: ownpost-bulk
description: "Apply bulk OwnPost draft, schedule, slot, inspiration, or suggestion changes and reconcile partial failures."
---

# OwnPost — Bulk workspace changes

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Resolve the exact requested items and fetch current state before writing. Discover each tool's live schema; these content batches take {items:[...]} with 1–25 entries.

2. Every bulk draft needs its own clientRequestId UUID, reused only for retries of that draft. Bulk post changes require expectedUpdatedAt from get_post. Preserve partIds when editing threads. Schedule ISO instants based on real schedule choices and workspace timezone.

3. Bulk operations validate inputs first but commit content items independently. Inspect every ordered results entry (index, ok, result/error), succeededCount, and failedCount. Successful entries remain committed. Retry only failures after resolving their current state; for uncertain creates, inspect existing data before retrying.

4. Post cleanup uses archive_posts. Permanent Inspiration/Suggestion cleanup requires an explicit request for the selected eligible items and confirm:"DELETE" on every item. Archive sources first only when the owner's requested cleanup includes that action.

5. Dedicated create_posting_slots/delete_posting_slots use slots/ids with 1–100 entries and atomic behavior; they are different from these content batches.

6. Report successes and failures separately with IDs and actionable reasons. Bulk writes never publish to X.

## Tools covered

`create_drafts`, `update_posts`, `schedule_posts`, `archive_posts`, `restore_posts`, `move_posts_to_drafts`, `skip_posts`, `update_posting_slots`, `create_inspirations`, `update_inspirations`, `archive_inspirations`, `restore_inspirations`, `permanently_delete_inspirations`, `create_suggestions`, `permanently_delete_suggestions`.
