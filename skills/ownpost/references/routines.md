# OwnPost — Routines and preparation jobs

## Workflow

1. Read get_assistant_overview and get_assistant_context for existing routines, preferences and timezone. Match the requested routine before creating another. Distinguish “prepare this now” from “prepare this every weekday”: only the latter requests recurrence. Reuse supplied choices and saved preferences; ask only for an unresolved schedule or required source/target.

2. Resolve task kind, local schedule/date, sources or targets, output count and notification intent. Use save_assistant_routine for a requested recurring or one-time routine; reuse its UUID on retry and supply expectedRevision for edits. Editing cancels unfinished previous occurrences. Preserve existing notification settings for edits; a new preparation job defaults notifications off unless requested.

3. Use request_assistant_work for requested preparation or a reply session, reusing its UUID on retry. When the user asks for the result now, continue in this session: pass the returned occurrence's id as occurrenceId to claim_assistant_work, read the selected context, and produce the requested news_brief, draft_preparation suggestions, or reply_session options. Save every output atomically through complete_assistant_work with the returned occurrence ID and leaseToken; a queued record alone does not complete a “prepare now” request.

4. Follow the claim's sources, quantities and 30-minute lease. Verify news dates/URLs; unknown dates stay null. Use only known conversation evidence for replies and original writing grounded in the owner's context for suggestions. After uncertain completion inspect status and retry only with the same ID/token when valid; use fail_assistant_work for a blocked active claim. These outputs are preparation, not publication.

5. Future routines require a running Codex/Claude session or explicitly configured client automation to claim due work. Saving a routine does not launch that runner. Explain whether a runner is actually configured, without claiming that an interval creates one. Finish with the saved routine/job ID, local timing and status; for immediate work, include the outputs actually completed or the precise remaining blocker.

## Tools covered

`get_assistant_overview`, `save_assistant_routine`, `request_assistant_work`.
