# OwnPost — Approved X publishing

## Workflow

1. For a clear request to publish selected approved work, read get_x_capabilities and execute the eligible request in this turn. Verify the selected account, enabled capabilities and this connection's separate publishing grant. Reuse existing task selection instead of asking for IDs again. A full-access key alone is insufficient; a skill cannot grant permission or approve content.

2. For originals, list_publications and identify the matching existing owner-approved job. Execute only requested eligible work with publish_approved_post. Use reschedule_approved_publication, cancel_publication or resume_publication for the requested existing job; scheduling a reminder is not approval. If no approved job exists, report the exact app approval needed. Preserve any prepared draft rather than claiming publication. Report per-part outcomes for threads.

5. An uncertain send must never be resent, or bypassed by creating another job. Inspect current state and direct reconciliation to owner review. Respect expired approvals, account/content changes, pauses, and server holds.

6. Finish with confirmed publication links and per-part results, or the precise hold/disabled reason and required app action. A draft or skill invocation is not server-side approval.

## Tools covered

`get_x_capabilities`, `list_publications`, `publish_approved_post`, `reschedule_approved_publication`, `cancel_publication`, `resume_publication`.
