# OwnPost — Schedule and posting slots

## Workflow

1. Resolve the draft from the conversation or list_posts, then read get_today for workspace timezone and get_post for its current revision. “Schedule this next” selects the real next available option from get_schedule_options; “tomorrow at 9” uses the workspace date/time when unambiguous. Use excludePostId when moving an existing post. Ask only if the post or intended time cannot be resolved; do not ask for a timezone already saved.

2. For a request to write and schedule a new post, read get_assistant_context, generate from the brief, and save create_draft with a reusable clientRequestId before scheduling. Call schedule_post with scheduledAt as an ISO instant and the latest expectedUpdatedAt. This schedules a manual reminder. Explicit automatic delivery requires a matching owner-approved API publication job and its separate publishing grant; report any missing app approval after preparing the draft.

3. For weekly preferences, read list_posting_slots. weekday is 0–6 (Sunday–Saturday); minutesAfterMidnight is 0–1439 in the workspace timezone. Create or update only requested slots and delete only selected IDs.

4. create_posting_slots appends 1–100 slots atomically. On an uncertain create, re-read before retrying because creation is not idempotent. delete_posting_slots accepts 1–100 IDs and safely reports missing IDs. Slot changes do not move already scheduled posts.

5. Return the post ID, saved workspace-local date/time with timezone, and “manual reminder” status. For slot changes, show the resulting recurring times and explain that already scheduled posts keep their saved times.

## Tools covered

`get_schedule_options`, `schedule_post`, `list_posting_slots`, `create_posting_slot`, `create_posting_slots`, `update_posting_slot`, `delete_posting_slot`, `delete_posting_slots`.
