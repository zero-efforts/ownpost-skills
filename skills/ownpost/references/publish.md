# OwnPost — Approved X publishing

## Workflow

1. For a clear request to publish selected approved work, read get_x_capabilities and execute the eligible request in this turn. Verify the selected account, enabled capabilities and this connection's separate publishing grant. Reuse existing task selection instead of asking for IDs again. A full-access key alone is insufficient; a skill cannot grant permission or approve a target.

2. For originals, list_publications and identify the matching existing owner-approved job. Execute only requested eligible work with publish_approved_post. Use reschedule_approved_publication, cancel_publication or resume_publication for the requested existing job; scheduling a reminder is not approval. If no approved job exists, report the exact app approval needed. Preserve any prepared draft rather than claiming publication. Report per-part outcomes for threads.

3. For replies, inspect account-scoped list_reply_opportunities and select the requested accepted opportunity. Call claim_approved_reply with that opportunityId and clientName matching the actual runner ("codex" or "claude"). Omitting opportunityId claims the oldest accepted target, so omit it only when the user requested next eligible work. The reply lease is 15 minutes. A successful claim permits generating and sending one response without a second wording approval. Analyze the returned conversation/voice and preserve generatedText exactly when already present.

4. Call publish_approved_reply with the claim's id, active leaseToken, and text. If generation is blocked before sending, use fail_reply_work with a short reason.

5. An uncertain send must never be resent, reset with fail_reply_work, or bypassed by creating another job. Inspect current state and direct reconciliation to owner review. Respect expired approvals, account/content changes, pauses, and server holds.

6. Finish with confirmed publication links and per-part results, or the precise hold/disabled reason and required app action. Distinguish API opportunities from workspace-wide manual reply drafts/activity. A pending target, draft or skill invocation is not server-side approval.

## Tools covered

`get_x_capabilities`, `list_reply_opportunities`, `claim_approved_reply`, `publish_approved_reply`, `fail_reply_work`, `list_publications`, `publish_approved_post`, `reschedule_approved_publication`, `cancel_publication`, `resume_publication`.
