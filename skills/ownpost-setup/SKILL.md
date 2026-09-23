---
name: ownpost-setup
description: "Set up or revisit OwnPost MCP connection, posting preferences, content interests, quiet hours, and notifications."
---

# OwnPost — First-time setup

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. If the workspace is not deployed or the MCP connection is missing, read [connection and hosting setup](references/setup.md). Finish connection verification before personal setup.

2. Call get_personal_setup, show existing choices, and ask one short question at a time. Let the owner keep or skip sections; defaults are not their answers.

3. Save only answered sections with save_personal_setup. Posting uses an IANA timezone; weekday 0 is Sunday, and times are minutes after midnight. dailyTarget 0 disables the goal. Supplied slots replace the entire list, including clearing it with []; omit slots to retain existing times.

4. Content saves require the current expectedRevision. Read again before editing and merge only requested changes. For notification-only changes, get_notification_preferences then update_notification_preferences with its revision. Quiet hours use local minutes, support overnight ranges, and require both endpoints; both null or equal disables them. dailyLimit 0 mutes all; quiet hours do not move schedules.

5. Personal setup neither connects Telegram nor creates routines, publishes, or changes the approved voice. Finish with saved settings, skipped sections, and any remaining connection step.

## Tools covered

`list_accounts`, `get_personal_setup`, `save_personal_setup`, `get_notification_preferences`, `update_notification_preferences`.
