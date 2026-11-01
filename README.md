# PDF Editor Extension

Planning-stage Chrome extension for editing PDF text and content in its original language while preserving appearance where technically supported. Product name is provisional.

**Status: project documentation and an isolated PDFium/OCR feasibility prototype are ready. Production editor implementation has not started.**

Start with [project documentation](docs/README.md), [current tasks](docs/MEMORY.md), and [build readiness](docs/BUILD_READINESS.md).

Confirmed constraints: private source code, free libraries preferred initially, all PDF processing on-device, eventual Chrome Web Store publication, and future subscription support. Universal exact formatting is a product ambition, not a verified capability.

The reusable `Project_Documentation_Kit/` and `AI_Project_Kit/` remain unchanged. Completed project specifications live in `docs/`. Use the documentation kit for specification changes and the AI kit workflow with the project's populated seven entry files for implementation.

A pinned package manifest and lockfile, local test scripts, and an unpacked MV3 lab exist. No backend, accounts, or deployment exists. Private samples and generated previews must not be committed or shipped.

## Run the feasibility lab

See [setup and commands](spikes/pdf-engine/README.md) and [results/limitations](docs/08-Domain-Specific/engine-evaluation.md). Verified sequence from this directory: `npm.cmd run spike`, `npm.cmd run spike:ocr`, `npm.cmd run spike:build`, then `npm.cmd run spike:browser` with `CHROME_PATH` set to a compatible test Chromium. Build output: `dist/engine-lab`. The lab uses synthetic documents and is not the finished editor.
