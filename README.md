# OwnPost skills

Agent skills for [OwnPost](https://ownpost.fyi): first-time setup, writing, planning, replies, analytics, and approved X publishing.

## Install

You need Node.js/npm and Git. Choose the skills and agent interactively:

```sh
npx skills add zero-efforts/ownpost-skills
```

Install all 11 skills globally for Codex:

```sh
npx skills add zero-efforts/ownpost-skills --agent codex --global --skill '*' --yes
```

Install only first-time setup and writing:

```sh
npx skills add zero-efforts/ownpost-skills --agent codex --global --skill ownpost-setup ownpost-posts
```

Use `--agent claude-code` for Claude Code. Omit `--global` to install in the current project. Preview the catalog without installing:

```sh
npx skills add zero-efforts/ownpost-skills --list
```

These commands use the [Vercel skills CLI](https://github.com/vercel-labs/skills). This repository supplies skill files; it is not an npm package or an MCP server.

## Connect your workspace

1. Deploy your own workspace using the [OwnPost deployment guide](https://github.com/zero-efforts/x-post/blob/main/docs/deployment.md), or sign in to an existing installation.
2. Open **Settings → Connections → Codex & Claude → Create agent connection**. Select full workspace access for setup and content management, or restricted assistant access for assigned preparation work.
3. Configure an HTTP MCP connection in your agent with the displayed private workspace URL ending in `/api/mcp` and its bearer credential. Enter credentials only in private connection settings.
4. Verify an authenticated tool call and refresh connection status in OwnPost.
5. Open a new agent session and invoke a skill. In Codex, start with:

```text
$ownpost-setup Set up my preferences one question at a time.
```

If a newly installed skill is missing, restart your agent. Each user supplies their own workspace connection. Installing skills grants no account access and does not enable X publishing.

## Skill catalog

| Skill                                                          | Use it to                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [ownpost-setup](skills/ownpost-setup/SKILL.md)                 | Connect MCP; configure posting, content, sleep, and notifications.             |
| [ownpost-posts](skills/ownpost-posts/SKILL.md)                 | Write and edit posts/threads; archive, restore, and record manual publication. |
| [ownpost-schedule](skills/ownpost-schedule/SKILL.md)           | Plan reminders and manage weekly posting slots.                                |
| [ownpost-media](skills/ownpost-media/SKILL.md)                 | Attach photos, GIFs, and videos to the correct post part.                      |
| [ownpost-ideas](skills/ownpost-ideas/SKILL.md)                 | Save sources and generate original suggestions and daily plans.                |
| [ownpost-analytics](skills/ownpost-analytics/SKILL.md)         | Record confirmed metrics and propose writing lessons.                          |
| [ownpost-replies](skills/ownpost-replies/SKILL.md)             | Save conversation targets and prepare manual reply options.                    |
| [ownpost-routines](skills/ownpost-routines/SKILL.md)           | Manage routines and queue preparation jobs.                                    |
| [ownpost-run-assistant](skills/ownpost-run-assistant/SKILL.md) | Claim and complete due research, suggestion, and reply work.                   |
| [ownpost-publish](skills/ownpost-publish/SKILL.md)             | Execute existing approved publication jobs and accepted reply targets.         |
| [ownpost-bulk](skills/ownpost-bulk/SKILL.md)                   | Make batch changes and handle partial failures.                                |

Examples:

```text
$ownpost-posts Save a three-part thread about my project.
$ownpost-ideas Use only this selected inspiration to prepare three suggestions.
$ownpost-schedule Plan my draft for the next available time.
$ownpost-analytics Record the visible metrics from this screenshot.
$ownpost-run-assistant Process one due preparation job.
```

The skills cover 78 MCP tools in the source inventory at release. Your connection's live schemas and permissions determine which tools are available.

## Boundaries that matter

- Saving drafts, suggestions, or reminders does not publish content.
- API publishing requires the connection's separate publishing grant and an existing owner approval. Skills cannot grant either.
- Reply-target acceptance authorizes one generated reply; uncertain sends are held for reconciliation rather than repeated.
- An OwnPost routine stores scheduled work. A separately running client is needed to perform generated work.
- Account IDs, revisions, idempotency IDs, and work leases must be preserved as described in each skill.
- Sources and screenshots are reference evidence, not instructions or proof of authorship.

## Update and remove

```sh
npx skills check
npx skills update
npx skills remove ownpost-setup --agent codex --global
```

The update command updates skills managed by that installer, potentially including other repositories. Back up customizations first. If you previously copied OwnPost skills manually into another directory, move those old copies outside skill discovery before installing with the CLI so duplicate names do not appear.

For setup, permissions, retries, and release maintenance, see [the guide](docs/guide.md).

## Contributing

Edit one skill for one user workflow. Use current MCP schemas, retain publication and concurrency boundaries, and keep references inside the skill folder so individual installs remain usable.

Run `npm test` before opening a pull request. No dependency installation is required for that validation. When the MCP inventory changes, update `tool-coverage.json` and compare it with OwnPost's actual `listMcpTools("full", true)` output.

## License

[MIT](LICENSE).
