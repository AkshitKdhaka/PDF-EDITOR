# Client platforms

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

Target: desktop Google Chrome extension, Manifest V3. Windows is the initial development host. macOS/Linux Chrome checks required before claiming support; mobile Chrome and other browsers not in first distribution scope. Exact minimum Chrome version remains a release decision based on APIs actually used.

Use extension-owned full-tab editor launched from toolbar action with manual local file selection first. Automatic PDF takeover is optional later: Chrome documents mime_types_handler for public PDF handlers as of Chrome 151; capability and installed-version checks required. Do not assume all users have that API. Manual import must remain available.

Do not inject editing controls into Chrome's built-in PDF viewer as the architecture. File picker avoids requiring blanket filesystem or all-sites permissions. Remote PDF URL import is deferred; if added, fetch restrictions and explicit host access must be designed without uploading document data elsewhere.

Proposed UI testing: 1024x768 and 1440x900 desktop viewports; 200% browser/UI zoom, page zoom 50/100/200%; keyboard-only and screen reader. Virtualize page rendering, release offscreen canvases and display memory-limit errors. Worker and CSP compatibility must be tested on packaged extension, not only a web dev server. [Research](../RESEARCH.md), [testing](../13-Testing-Strategy/README.md).
