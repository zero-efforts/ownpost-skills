---
name: ownpost-analytics
description: "Record confirmed OwnPost screenshot metrics, inspect performance, and propose evidence-based learning notes."
---

# OwnPost — Analytics and learning

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. For a screenshot, inspect visible evidence and use match_performance_screenshot with visibleText or the explicit postId. Resolve ambiguous candidates before writing.

2. Call record_metric_snapshot only for the confirmed post and observed measurements. Omit unavailable values; unknown is not zero. Use the real observation time and avoid invented publication details.

3. Use list_post_metrics for history and get_performance_context for measured posts, approved learning, and voice. State the sample size and distinguish missing data from poor performance; avoid causal claims from limited correlations.

4. When a lesson is supported, propose_learning_note with lesson, rationale, and sourcePostIds. This only proposes a change: the owner approves it in the app before it affects voice.

5. Report saved measurements or a concise finding and the proposal's status. The MCP inventory has no X analytics-sync trigger; use the app for that action.

## Tools covered

`match_performance_screenshot`, `record_metric_snapshot`, `list_post_metrics`, `get_performance_context`, `propose_learning_note`.
