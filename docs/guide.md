# OwnPost skills guide

## First use

Run `npx skills add zero-efforts/ownpost-skills --agent codex --global --skill ownpost --yes` to install the single entry skill. The [README](../README.md) has other agent options and the complete catalog.

Skills are local instructions. Connect your private OwnPost MCP server separately, then invoke `$ownpost` and ask for the task you want. For first-time preferences, ask it to set up your preferences; it will read existing choices, ask one question at a time, and save only your answers. You may skip sections.

The [setup reference](../skills/ownpost-setup/references/setup.md) covers new hosting, credentials, connection checks, and troubleshooting. Use your own HTTPS workspace URL. Never use another person's server merely because they shared these skills.

## One tag, natural requests

Use `$ownpost` for any of these. It chooses the necessary workflow internally; installing only this skill includes all its references.

| Ask                                               | Result                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Post about this, with supplied text or screenshot | Reads saved voice/preferences and saves one original draft.                           |
| Write a thread and attach this photo              | Saves the requested thread and attaches the photo to the specified part.              |
| Plan this draft for tomorrow                      | Reads real choices and saves a manual reminder in workspace time.                     |
| Analyse this conversation and reply               | Reads the real conversation, chooses a useful angle, and saves a reply.               |
| Analyse my replies this week                      | Reviews available reply wording, activity and delivery outcomes; reports data limits. |
| Analyse this draft, do not change it              | Gives a critique without writing.                                                     |
| Prepare today's news brief now                    | Creates/claims the requested job and completes supported outputs in the same session. |
| Publish this approved job now                     | Checks capabilities and executes the existing eligible approval.                      |

Ordinary requests do not start onboarding or ask again for saved preferences. Missing source text, an ambiguous target, or a missing server approval can still require your input. If part of a combined request is blocked, the skill finishes independent authorized steps and reports the remaining action.

Reply analysis includes wording quality, manual reply activity and API delivery outcomes. Per-reply impressions, likes, engagement rates, and follower attribution are not available through the current MCP tools. Manual reply history and reply progress are workspace-wide; API reply opportunities are account-scoped. Original-post metric snapshots cannot store reply metrics.

## Specialist shortcuts

You can keep using these tags if you installed the corresponding optional specialist. With `$ownpost`, simply describe the same task:

1. Use ownpost-setup for timezone, topics, audience, posting slots, and quiet hours.
2. Use ownpost-ideas for selected sources and original suggestions.
3. Use ownpost-posts to save/edit a draft and ownpost-media for attachments.
4. Use ownpost-schedule for manual reminders. A reminder is not API authorization.
5. Publish manually, then report the actual publication. For API delivery, approve the content in OwnPost and use ownpost-publish only with the separate connection grant.
6. Use ownpost-analytics to record real measurements and propose lessons for owner review.

Use ownpost-replies for manual reply preparation. Use ownpost-routines plus a separately configured running client for ongoing preparation; ownpost-run-assistant processes leased jobs.

## Access and troubleshooting

| Problem                       | What to check                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| npx command unavailable       | Install Node.js/npm and reopen the terminal; Git must also be available.           |
| Repository clone fails        | Check GitHub connectivity and the exact repository name.                           |
| Skill missing in selector     | Verify the target agent and install scope, open a new task, and restart if needed. |
| Duplicate skills              | Remove or move earlier manually installed copies outside discovery directories.    |
| Skill loaded but no MCP tools | Configure and enable the private workspace connection.                             |
| HTTP 401                      | Verify the private bearer credential and connection revocation status.             |
| Missing write tools           | Full workspace access is required for setup and ordinary content changes.          |
| Missing publishing tools      | Check the separate publishing grant and returned X capabilities.                   |
| Revision conflict             | Re-read current content and reconcile owner changes.                               |
| Uncertain publication         | Inspect recorded outcomes and X; do not resend automatically.                      |
| Routine saved but no output   | A live client must claim work; saving a routine does not launch one.               |

Each independent owner needs their own appropriately isolated OwnPost workspace. The skills repository has no credentials and creates no shared workspace access.

## Sharing

Share [this public repository](https://github.com/zero-efforts/ownpost-skills) and the install command. No npm publishing or OpenAI directory submission is required for this GitHub-based installation route. ChatGPT's hosted skill/plugin installation is a separate distribution route; local CLI installation does not install into ChatGPT.

## Maintenance and release

This repository is the public source for installable skills. The OwnPost application currently retains a development copy at plugins/ownpost/skills for its MCP coverage test. When the app changes tools:

1. Update the relevant public skill and tool-coverage.json.
2. Synchronize the app's development copy and run its MCP skill coverage test against the real tool inventory.
3. Run `npm run build` to refresh the standalone entry skill, then `npm test` here.
4. Run `npx skills add . --list` to check discovery.
5. Try a selected install in a temporary empty project using `--agent codex --skill ownpost --yes`.
6. Commit and push the reviewed changes. Users can then update through the skills CLI.

Validate realistic behavior in a test workspace: skip a setup section, retry the same draft ID, reconcile a stale post, handle a partially failing batch, complete a leased research job, reject an unapproved publication, and preserve an uncertain-send hold. Structural validation alone does not prove live publishing behavior.

The application deployment guide remains [in the OwnPost application repository](https://github.com/zero-efforts/x-post/blob/main/docs/deployment.md).
