---
name: ownpost-posts
description: "Create, edit, find, archive, restore, or record manual publication of OwnPost posts and threads."
---

# OwnPost — Posts and threads

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Read get_today for a next-action request; otherwise filter list_posts to the requested collection. Read get_assistant_context or get_performance_context when writing in the owner's voice.

2. Create original content grounded in provided experience. Save using create_draft with one clientRequestId UUID per new draft; reuse it only to retry the same creation. A thread needs at least two parts; title may be omitted.

3. Before changing a post, get_post and pass updatedAt as expectedUpdatedAt. Preserve existing partIds when editing or reordering to keep media attached; new parts use null IDs. On POST_CONFLICT, re-read and reconcile the owner's edits before another write.

4. Use archive_post for removal, restore_post for recovery, move_post_to_drafts to clear planning, or skip_post to skip a planned item. None sends content to X.

5. Use record_publication only for an explicit owner report of actual manual publication, with the actual publishedAt and optional X URL. Opening X or preparing text is not publication. Report saved IDs and resulting state.

## Tools covered

`get_today`, `list_posts`, `get_post`, `create_draft`, `update_post`, `archive_post`, `restore_post`, `move_post_to_drafts`, `skip_post`, `record_publication`.
