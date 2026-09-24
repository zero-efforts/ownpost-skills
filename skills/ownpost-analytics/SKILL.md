---
name: ownpost-analytics
description: "Analyze OwnPost post performance or writing quality; record screenshot metrics and propose evidence-based lessons."
---

# OwnPost — Analytics and learning

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Reuse the account selected in this task; otherwise omission of workspaceAccountId uses Main. Call list_accounts when resolving a named account or an ambiguous selection, and pass the chosen non-Main workspaceAccountId on every applicable call. Browser account switching does not change MCP calls. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Match the analysis to the request. For post performance, read get_performance_context and selected list_post_metrics history. For a post writing critique, inspect the provided text or fetch get_post and get_assistant_context; analyze clarity, hook, relevance and voice directly. Read a supplied source link before assessing it, and ask for text only when essential context is inaccessible. Reuse saved preferences instead of asking the user to restate them.


3. When asked to record a metrics screenshot, inspect visible evidence and use match_performance_screenshot with visibleText or the explicit postId. Resolve ambiguous matches before record_metric_snapshot. It records metrics for a confirmed published original post. Use observed measurements and the real observation time; omit unavailable values because unknown is not zero. After an uncertain write, read list_post_metrics before retrying because each call creates a snapshot. A request for analysis alone does not imply recording a snapshot.

4. Give the useful result immediately: the strongest supported finding, the sample/time window actually available, and concrete next writing changes. The returned performance score is weighted, not a standard engagement rate. Distinguish missing data from poor performance and correlations from causes. A lack of measurements still permits a labeled writing critique; it cannot support performance rankings or growth claims.

5. When the request includes learning from performance and evidence supports a lesson, propose_learning_note with lesson, rationale and real sourcePostIds. This only proposes a change; owner approval in the app is required before voice changes. Finish with concise findings and any saved snapshot/proposal ID and status. Use the app for X analytics sync, which is not exposed by this MCP.

## Tools covered

`match_performance_screenshot`, `record_metric_snapshot`, `list_post_metrics`, `get_performance_context`, `propose_learning_note`.
