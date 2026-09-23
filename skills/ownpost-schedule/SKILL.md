---
name: ownpost-schedule
description: "Plan OwnPost reminders and manage recurring posting slots in the workspace timezone."
---

# OwnPost — Schedule and posting slots

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Read get_today for timezone and get_post for each selected post. Call get_schedule_options with excludePostId when moving an existing post. Use returned future times and show the workspace-local time and date; resolve ambiguous dates before saving.

2. Call schedule_post with scheduledAt as an ISO instant and expectedUpdatedAt from the post. This schedules a manual reminder; API delivery is a separate approved publication workflow.

3. For weekly preferences, read list_posting_slots. weekday is 0–6 (Sunday–Saturday); minutesAfterMidnight is 0–1439 in the workspace timezone. Create or update only requested slots and delete only selected IDs.

4. create_posting_slots appends 1–100 slots atomically. On an uncertain create, re-read before retrying because creation is not idempotent. delete_posting_slots accepts 1–100 IDs and safely reports missing IDs. Slot changes do not move already scheduled posts.

5. Return the saved local times and distinguish recurring preferences from actual post reminders.

## Tools covered

`get_schedule_options`, `schedule_post`, `list_posting_slots`, `create_posting_slot`, `create_posting_slots`, `update_posting_slot`, `delete_posting_slot`, `delete_posting_slots`.
