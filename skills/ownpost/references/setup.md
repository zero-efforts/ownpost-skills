# OwnPost — First-time setup

## Workflow

1. If the workspace is not deployed or the MCP connection is missing, read [connection and hosting setup](connection-setup.md). Finish connection verification before personal setup.

2. Call get_personal_setup and reuse existing choices. If the user supplied a concrete change, save it directly without restarting onboarding or requesting confirmation of the same values. For first-time guided setup, ask one short question at a time only for unanswered choices, let the owner keep or skip sections, and distinguish stored defaults from their answers. An unrelated writing request does not require completing every setup section.

3. Save only answered sections with save_personal_setup. Posting uses an IANA timezone; weekday 0 is Sunday, and times are minutes after midnight. dailyTarget 0 disables the goal. Supplied slots replace the entire list, including clearing it with []; omit slots to retain existing times.

4. Content saves require the current expectedRevision. Read again before editing and merge only requested changes. For notification-only changes, get_notification_preferences then update_notification_preferences with its revision. Quiet hours use local minutes, support overnight ranges, and require both endpoints; both null or equal disables them. dailyLimit 0 mutes all; quiet hours do not move schedules.

5. Personal setup neither connects Telegram nor creates routines, publishes, or changes the approved voice. Finish with the settings actually saved and a short next-use example such as “$ownpost-posts post about my latest project”. Mention skipped sections or a remaining connection step only when useful to the user's request.

## Tools covered

`list_accounts`, `get_personal_setup`, `save_personal_setup`, `get_notification_preferences`, `update_notification_preferences`.
