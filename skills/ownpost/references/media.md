# OwnPost — Post media

## Workflow

1. Use the post selected in the conversation or resolve a named post with list_posts, then get_post for postPartId and list_media for existing attachments. “Add this image” means attach the supplied file now. Use a single-part post directly; for a thread use the user's selected part and ask only if the destination is genuinely ambiguous. Read saved context instead of asking the user for IDs already available.

2. Use attach_media with the supplied file's real MIME type, base64 bytes, filename, and appropriate altText. Supported media are JPG, PNG, WebP, GIF up to 10 MB, and MP4/MOV up to 50 MB; a part permits up to four photos, one GIF, or one video. The host can enforce a smaller upload limit.

3. If the request also asks for a new post, write from the supplied brief and get_assistant_context, save it using create_draft with a reusable clientRequestId, then attach to its returned part ID. If a file is required but unavailable, explain exactly what is needed; a filename or inaccessible URL is not image bytes.

4. After an uncertain upload, read list_media before retrying. Return the saved attachment, destination post/part and any failed addition. There is no MCP media-delete tool; direct removal or replacement that needs deletion to the app. For a screenshot used as source material, inspect it and save only the extracted text and observations through create_image_inspiration when Idea capture is requested. Attach source images to a post only when the user requests an attachment.

## Tools covered

`list_media`, `attach_media`.
