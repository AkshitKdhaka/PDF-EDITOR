# Why the Complete Kit Is the Recommended Format

Research checked 2026-09-20. Recommendation: distribute one ZIP containing a short entry document, seven editable project files and separate reference material. Extract it into the agent's accessible workspace. This is a practical recommendation for this user's reusable project workflow, not a benchmark proving one format wins for every model or tool.

## Official documentation findings

- OpenAI documents automatic discovery of `AGENTS.md` and related instruction files, with a default combined project-instruction limit of 32 KiB. A short entry avoids relying on a large manual being loaded as startup instructions. [OpenAI instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
- Claude Code recommends specific, concise, structured `CLAUDE.md` guidance and targeting fewer than 200 lines. Imports still consume startup context, so splitting files alone does not help if everything is imported every time. [Claude Code memory guidance](https://code.claude.com/docs/en/memory).
- VS Code recommends concise instructions, selective topic-specific files and references that avoid duplicated guidance. It also documents supported instruction locations and ways to inspect whether they apply. [VS Code custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions).
- GitHub documents Markdown repository-wide instructions and path-specific instructions. Support varies across Copilot features, so a generic filename should not be assumed to load automatically. [GitHub repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions).

## Comparison for this use case

| Need | One long standalone manual | This complete kit |
| --- | --- | --- |
| Initial transfer | One directly readable attachment | One ZIP; extraction or folder access required |
| Ready project documents | Agent must create files from embedded templates | Seven files already exist and can be populated |
| Ongoing edits | Detailed context must be separated or maintained in a large file | Each topic has one clear owner and path |
| Context management | Easy to repeatedly include irrelevant templates and examples | Short entry; relevant project sections loaded as needed |
| Handoff | Must provide current project state separately | Current docs travel with the repository |
| Tool with no folder access | Easier to paste in one conversation | User supplies extracted contents; actual edits remain unavailable |

## Decision and its limits

The complete kit is the better fit for repeated project creation and continuation because this workflow already depends on seven maintained files. It combines the instruction document and templates in one deliverable while separating reusable guidance from changing project facts.

ZIP packaging itself does not improve reasoning. The useful design is the short entry, clear ownership, consistent paths, current state and selective reading. A chat-only interface unable to access the ZIP needs the extracted files supplied manually. No document guarantees that every model will follow every instruction.

Keep `START_HERE.md` small and link to the needed references. Populate the seven documents with project-specific content, remove obsolete placeholders, and review stale instructions. Keep the source audit and research out of routine task context unless requested. Do not use this entire kit as a single always-on system instruction.
