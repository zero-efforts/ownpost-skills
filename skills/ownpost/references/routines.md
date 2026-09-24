# OwnPost — Routines and progress

## Workflow

1. Read get_assistant_overview for existing routines, pendingOccurrences, paginated occurrence history and routineStats. pendingOccurrences contains all materialized unfinished items, including older and snoozed items. dashboardOccurrences contains at most five unfinished items tied to saved routines with scheduledAt and reminderAt both today in the workspace timezone, where reminderAt is overdue or within ten minutes; dashboardPendingCount counts all matches for that window. Older occurrences snoozed into today remain outside Dashboard. Match the requested routine or occurrence before creating or changing one. Read get_assistant_context when writing preferences or preparation sources are needed. Reuse the saved timezone and supplied choices; ask only for an unresolved schedule or required source.

2. Use save_assistant_routine for a requested routine, with task.title as its name, task.instructions as the activity, task.timezone, task.notify and a one-time or weekday/time schedule. Omit task.kind for an ordinary routine; it defaults to reminder and needs no AI runner. Every activity uses the same routine form and actions. Reuse its UUID on retry and supply expectedRevision for edits. Preserve the existing enabled state, notification settings and typed preparation configuration unless the user asks to change them. Editing closes unfinished due occurrences and updates future prepared occurrences for the new definition and schedule. Explicitly completed or skipped occurrences stay final.

3. For a requested occurrence action, call update_assistant_occurrence with its id, current expectedRevision and action: finish for Mark done, skip, or snooze for ten minutes. Completion affects that occurrence and is shared with Dashboard and Telegram. It never completes future occurrences or records an X publication. After an uncertain write, read the occurrence before retrying; reconcile a stale revision instead of overwriting it.

4. For progress, use routineStats rather than counting one page of history. It covers due occurrences tied to saved routines: pending, completed, skipped and completionRate, with last7Days grouped by scheduled date in the workspace timezone. The percentage is completed divided by all due occurrences. State that scope; completion records do not establish post performance or follower growth. Assistant holds the routines table, Pending/History views and Routine analytics; completed and skipped items belong in history. Dashboard's View all opens this complete routine list.

5. When the user explicitly requests generated preparation, preserve the supported draft_preparation or weekly_review task kind and its required configuration. For immediate preparation, use request_assistant_work with a reusable UUID, then claim_assistant_work with the returned occurrenceId and complete the requested output in this session. Follow the selected sources, quantities and 30-minute lease; draft_preparation saves its drafts atomically through complete_assistant_work with the occurrence ID and leaseToken. After uncertain completion inspect status; use fail_assistant_work for a blocked active claim. A queued job alone does not complete a “prepare now” request.

6. Generated preparation needs a running client or separately configured client automation. Saving a routine creates neither. Ordinary routines and their opted-in Telegram reminders run through OwnPost's scheduler independently. Finish with the actual saved ID, local timing, completed action or analytics finding, and any remaining preparation blocker.

## Tools covered

`get_assistant_overview`, `save_assistant_routine`, `update_assistant_occurrence`, `request_assistant_work`.
