---
name: ownpost
description: "Handle OwnPost requests end to end: write a post about supplied content, analyse and draft replies, review results, plan posts, manage ideas, configure preferences, or run approved work."
---

# OwnPost

Use this as the single entry point for natural OwnPost requests. Complete the requested workflow through the connected MCP tools; the user does not need to select another skill. The workflow references in this folder are included even when this is the only installed OwnPost skill.

## Start with the request

- Resolve "this" from selected content, a supplied image/link, or recent conversation. For "post about this", use the supplied subject and saved writing preferences to create one private post by default. Use a thread or several alternatives when requested or clearly required by the brief.
- A request to write or draft a post includes saving the draft. A request only to analyse, critique, brainstorm, or show text stays read-only unless saving is also requested. "Post about this" prepares a draft; explicit "publish/send now" enters the approved-publication workflow.
- Reuse preferences and choices already available. Ask only for facts that block correct execution, such as an absent topic, ambiguous target, unavailable source text, or ambiguous send destination. Do not start a setup questionnaire for an ordinary writing request.
- Finish the requested combination of steps: source reading → writing → saving → requested attachment → requested schedule. Do not stop after a tool list, draft proposal, or promise to continue. If one step is blocked, finish independent authorized steps and explain what remains.

## Choose only the necessary workflow

Read the relevant local reference and execute it. For a combined request, read additional references only as those steps become necessary.

| User wants                                                                    | Read                                                                         |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| "Post about this", write/edit a thread, find or organize posts                | [Posts](references/posts.md)                                                 |
| "Analyse this conversation and reply", prepare a reply, record a manual reply | [Replies](references/replies.md)                                             |
| "Analyse my posts/replies", screenshot metrics, writing lessons               | [Analytics](references/analytics.md); also Replies for conversation critique |
| Schedule a post or change preferred posting times                             | [Scheduling](references/schedule.md)                                         |
| Attach an image/video to a draft                                              | [Media](references/media.md)                                                 |
| Save inspiration, generate suggestions, create a content plan                 | [Ideas](references/ideas.md)                                                 |
| First connection or preferences, quiet hours, notifications                   | [Setup](references/setup.md)                                                 |
| Create/change a recurring routine or queue a preparation job                  | [Routines](references/routines.md)                                           |
| Process due research, suggestion, or reply preparation work                   | [Assistant work](references/run-assistant.md)                                |
| Explicitly send or manage existing approved API work                          | [Publishing](references/publish.md)                                          |
| Change many selected items                                                    | [Bulk changes](references/bulk.md)                                           |

## Use the connected workspace efficiently

Discover the relevant OwnPost tool schemas once per connection, rather than repeatedly fetching the entire inventory. Tool prefixes vary by client. A skill supplies guidance, not a connection; if MCP is missing, use [connection setup](references/connection-setup.md) and state that no workspace write occurred.

Use the account selected in this conversation. Resolve named accounts with list_accounts and pass the selected non-Main workspaceAccountId on applicable calls. With no account choice, use the server's Main default; ask only when the request is ambiguous. Browser account switching does not choose the MCP account. Manual reply targets and growth reply counts are workspace-wide, so do not label them account-specific; API opportunities and publication jobs are account-scoped.

For writing, read get_assistant_context once to reuse personal preferences and approved voice. For original-post performance analysis, read get_performance_context; reply-only analysis uses reply history and activity instead. Reuse fresh context during the task; refresh revisions immediately before edits. Read unrelated history only when the task needs it. Parallelize independent reads when the client supports it; keep dependent writes in order.

Inspect supplied images and retrieve selected links when the client can access them. For a saved Inspiration, call get_inspiration with its exact selected ID and includeImage:true when its screenshot matters. A URL alone proves no source content. Use current sources for time-sensitive factual claims; if unavailable, ask for the missing evidence or narrow the draft to verified facts. Never invent the owner's experience.

Follow pagination only as far as the requested scope needs. Respect isError, current revisions, idempotency identifiers, and active leases. For uncertain writes inspect state first; uncertain X sends must not be repeated. The references explain the operation-specific retry rules.

## Finish with a usable result

Show the actual post or reply text with a short status: saved draft, planned reminder, completed analysis, or confirmed publication. Include a workspace link only when its real origin and route are known; otherwise give the returned ID. For a request spanning several steps, report the completed steps and any concrete blocker.

Read live capability flags before API execution. OwnPost approvals and the connection's separate publishing grant remain required; a natural-language instruction cannot manufacture server approval. When approval is missing, prepare the content and identify the one app action needed. Do not describe a saved draft, an opened X page, or a manual reminder as published.
