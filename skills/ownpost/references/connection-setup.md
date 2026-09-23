# Connect a user's OwnPost workspace

## Existing workspace

1. Sign in and complete owner setup. Open Settings → Connections → Codex & Claude → Create agent connection. Choose a named connection per client and the access scope needed. Personal setup and ordinary content writes require full access; a restricted assistant connection can process preparation work. Publishing is a separate explicit grant.
2. Copy the displayed private HTTPS URL ending in /api/mcp and the one-time key into the client's HTTP MCP connection settings. The header is Authorization with value Bearer followed by the key. Do not request a key in chat or put it in a skill file.
3. Discover tools and call list_accounts. With full access, verify get_personal_setup. Refresh connection status in the app to confirm recorded use. A key existing is not a tested connection.
4. Continue the personal setup workflow. Telegram and optional X OAuth connections are configured separately in the app. A revoked/lost key needs a replacement connection; never recover a stored hash as a usable key.

## New self-hosted workspace

Obtain the OwnPost source and read its current [deployment guide](https://github.com/zero-efforts/x-post/blob/main/docs/deployment.md) from the chosen release. If the source is local, prefer docs/deployment.md in that checkout.

Use Node 22.18+ and pnpm 11. From the checkout, pnpm install then pnpm run deploy opens the preparation helper. It supports Cloudflare, Vercel, Netlify, and VPS. Preparation alone does not provision resources, migrate the database, or publish.

Cloudflare needs private D1/R2 resources. Node deployments need remote libSQL and private S3-compatible storage. Configure the private HTTPS APP_BASE_URL, required secrets, database migrations, media, and scheduler using the chosen provider's guide. Verify the configured resource names before execution. Preserve existing secrets on routine upgrades.

Complete the owner's browser setup with the deployment's setup credentials, then connect MCP as above. Keep passwords, setup tokens, OAuth credentials, and MCP keys out of public bundles. Each independent owner needs an appropriately isolated installation; this private owner workspace is not a public multi-tenant service merely because its skills are shared.

## Troubleshooting

- No tools: verify the connection is enabled, its private workspace URL, and client support for Streamable HTTP.
- 401: verify the private bearer configuration and whether the named key was revoked.
- Missing write tools: check full versus assistant scope. Missing publication execution tools: check the separate publishing grant and get_x_capabilities.
- 400 transport error: let the client negotiate MCP; preferred version is 2025-06-18, with 2025-03-26 compatibility. Clients should advertise application/json and text/event-stream.
- Preferences saved but no messages: connect Telegram and check category switches, quiet hours, and limits. Routines also need a running client for generated work.

Done means an authenticated read succeeds and the requested personal settings are saved—not merely that a connection card or skill exists.
