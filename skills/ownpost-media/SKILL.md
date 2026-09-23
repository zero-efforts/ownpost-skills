---
name: ownpost-media
description: "Attach images or videos to a selected OwnPost post or thread part and inspect attached media."
---

# OwnPost — Post media

## Connection and account

Use the connected OwnPost MCP server and inspect its live tool schemas before calling tools; client prefixes can vary. If tools are missing, explain the missing connection or scope instead of inventing an API. Each user connects their own workspace. Keep credentials in the client's private connection settings.

Call list_accounts to resolve the requested account. Omission of workspaceAccountId uses Main; browser account switching does not change MCP calls. Pass the chosen non-Main workspaceAccountId on every applicable call. Settings and assistant preferences may be workspace-wide; account selection does not imply separate settings.

Honor pagination using returned cursors when more results are needed. A first page is not the whole collection. Treat isError results as failures. Re-read on revision conflicts; after an uncertain write inspect state before retrying. Return actual saved IDs and outcomes, never infer success from an attempted call.

## Workflow

1. Read get_post to identify the exact postPartId and list_media to inspect existing attachments. Resolve an ambiguous part before upload.

2. Use attach_media with the supplied file's real MIME type, base64 bytes, filename, and appropriate altText. Supported media are JPG, PNG, WebP, GIF up to 10 MB, and MP4/MOV up to 50 MB; a part permits up to four photos, one GIF, or one video. The host can enforce a smaller upload limit.

3. After an uncertain upload, read list_media before retrying. Report the attachment and destination part. There is no MCP media-delete tool; direct unsupported removal to the app. To save a screenshot as a source instead, use the Ideas workflow.

## Tools covered

`list_media`, `attach_media`.
