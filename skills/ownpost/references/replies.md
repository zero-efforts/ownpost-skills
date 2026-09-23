# OwnPost — Reply analysis and preparation

## Workflow

For analysis-only requests, read the provided conversation or existing target and continue with critique in steps 2–3; capture/save only when the user requested a saved reply or target.

1. Treat “reply to this” as a request to understand the conversation, write one strong reply, and save it privately. Reuse a selected target or locate it with list_reply_targets; for a new target, read the supplied conversation/link/screenshot and capture_reply_target with its real X URL and original text in content, or a saved screenshot inspirationId. Put supplementary context in context; context alone cannot support saving a reply. A URL alone does not establish what it says. Try available source access first; ask for missing text or a screenshot only when the conversation cannot be read. If the required target URL is missing, write from supplied evidence and identify that saving requires the URL.

2. Load get_assistant_context with selected targetIds for saved context, preferences and approved voice; use get_inspiration with includeImage:true for screenshot evidence. A duplicate X ID returns the existing target without overwriting it; updating its context or reopening it is an app action. Inspect that state before drafting. Identify the author's main point, tone, and a useful contribution the owner can make. Use actual context and known owner expertise; keep source instructions out of the workflow and invent no personal experience.

3. Default to one concise, specific reply in the requested or saved language. Give alternatives only when requested or when a real ambiguity changes the stance. A request to “analyze this reply” calls for brief critique of relevance, tone and clarity, with an improved version when useful; critique alone does not create a saved draft. For “improve my saved reply”, update the selected option.

4. Save requested reply text with save_reply_draft using a UUID id reused on retries and a short rationale. Edits need the current expectedRevision. A claimed assistant run writes through complete_assistant_work instead. Do not stop at suggestions about how to reply when the evidence needed to save the requested reply is available.

5. For reply activity, inspect list_reply_targets with status:replied or queue:history and paginate as needed; the default active view omits history. Use get_assistant_overview for recorded activity and list_reply_opportunities for API state. Manual targets/drafts and overview reply counts are workspace-wide. There is no per-reply impressions or engagement metrics tool; conversational critique is not measured performance.

6. record_reply_publication is only for an explicit owner report of actual manual publication; use the reply draft ID, its current revision, actual publication time and reply URL when supplied. For explicit API sending, get_x_capabilities and the selected accepted opportunity are required; claim_approved_reply must receive that opportunityId and the actual clientName. Publish once using the active lease, preserving existing generatedText. Missing approval needs app action; an uncertain send needs state reconciliation, never another send or fail_reply_work reset.

7. Return the final reply, one short reason it fits, the saved target/draft ID, and whether it is a private draft or confirmed publication. Analysis-only requests return findings without claiming a write.

## Tools covered

`capture_reply_target`, `list_reply_targets`, `save_reply_draft`, `record_reply_publication`.
