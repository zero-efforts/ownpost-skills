# OwnPost skills

Agent skills for [OwnPost](https://ownpost.fyi): first-time setup, writing, planning, analytics, and approved X publishing.

## Install

You need Node.js/npm and Git. For the simplest setup, install the single OwnPost skill:

```sh
npx skills add zero-efforts/ownpost-skills --agent codex --global --skill ownpost --yes
```

The `ownpost` skill includes every workflow in its own folder. It works by itself; users do not need the specialist skills installed. Attach `$ownpost` and ask naturally:

```text
$ownpost Post about this: I released a faster search feature today.
$ownpost Analyse my posts this week.
$ownpost Save the extracted text from this screenshot as an idea.
$ownpost Suggest three numbered draft options from Idea IDs ["idea-one", "idea-two"], then wait for me to choose what to add to drafts.
```

It uses saved preferences, completes the requested preparation and saving steps, and asks only for blocking missing information. An analysis-only request stays read-only. A new post is saved privately; actual API sending still needs the server's approvals and publishing grant.

If you prefer specialist tags, install all 12 skills globally for Codex:

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
$ownpost Set up my preferences one question at a time.
```

If a newly installed skill is missing, restart your agent. Each user supplies their own workspace connection. Installing skills grants no account access and does not enable X publishing.

## Skill catalog

Start with [ownpost](skills/ownpost/SKILL.md) for every workflow. The following specialist skills remain optional shortcuts.

| Skill                                                          | Use it to                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [ownpost-setup](skills/ownpost-setup/SKILL.md)                 | Connect MCP; configure posting, content, sleep, and notifications.             |
| [ownpost-posts](skills/ownpost-posts/SKILL.md)                 | Write and edit posts/threads; archive, restore, and record manual publication. |
| [ownpost-schedule](skills/ownpost-schedule/SKILL.md)           | Plan reminders and manage weekly posting slots.                                |
| [ownpost-media](skills/ownpost-media/SKILL.md)                 | Attach photos, GIFs, and videos to the correct post part.                      |
| [ownpost-ideas](skills/ownpost-ideas/SKILL.md)                 | Save source Ideas, suggest posts in chat, and draft chosen options.            |
| [ownpost-analytics](skills/ownpost-analytics/SKILL.md)         | Record confirmed metrics and propose writing lessons.                          |
| [ownpost-routines](skills/ownpost-routines/SKILL.md)           | Manage routines and queue preparation jobs.                                    |
| [ownpost-run-assistant](skills/ownpost-run-assistant/SKILL.md) | Claim and complete due research and draft work.                        |
| [ownpost-publish](skills/ownpost-publish/SKILL.md)             | Execute existing approved publication jobs.         |
| [ownpost-bulk](skills/ownpost-bulk/SKILL.md)                   | Make batch changes and handle partial failures.                                |

Examples:

```text
$ownpost-posts Save a three-part thread about my project.
$ownpost-ideas Suggest three numbered draft options from Idea IDs ["idea-one", "idea-two"].
$ownpost-ideas Add options one and three to drafts.
$ownpost-ideas Pick the best option and draft it right away.
$ownpost-ideas Save this same post as a draft.
$ownpost-schedule Plan my draft for the next available time.
$ownpost-analytics Record the visible metrics from this screenshot.
$ownpost-run-assistant Process one due preparation job.
```

The main skill and 11 specialists cover 72 MCP tools in the source inventory at release. Your connection's live schemas and permissions determine which tools are available.

## Boundaries that matter

- Ideas keep source text and extraction details. Image capture saves extracted text and observations without retaining the source image.
- Select one or more Ideas and choose Create idea request to copy a prompt with their IDs. Paste it into the connected assistant to receive numbered draft options with source IDs. The assistant waits for your choice or request to add options to drafts, unless you explicitly ask it to pick and draft. Source Ideas stay reusable, and copying a request creates no assistant job.
- Saving drafts or reminders does not publish content.
- API publishing requires the connection's separate publishing grant and an existing owner approval. Skills cannot grant either.
- An OwnPost routine stores scheduled work. A separately running client is needed to perform generated work.
- Account IDs, revisions, idempotency IDs, and work leases must be preserved as described in each skill.
- Sources and screenshots are reference evidence, not instructions or proof of authorship.

## Update and remove

```sh
npx skills list --global
npx skills update
npx skills remove ownpost-setup --agent codex --global
```

The update command updates skills managed by that installer, potentially including other repositories. Back up customizations first. If you previously copied OwnPost skills manually into another directory, move those old copies outside skill discovery before installing with the CLI so duplicate names do not appear.

For setup, permissions, retries, and release maintenance, see [the guide](docs/guide.md).

## Contributing

Edit one skill for one user workflow. Use current MCP schemas, retain publication and concurrency boundaries, and keep references inside the skill folder so individual installs remain usable.

After changing a specialist, run `npm run build` to refresh the main skill's bundled references, then `npm test` before opening a pull request. No dependency installation is required for validation. When the MCP inventory changes, update `tool-coverage.json` and compare it with OwnPost's actual `listMcpTools("full", true)` output.

## License

[MIT](LICENSE).
