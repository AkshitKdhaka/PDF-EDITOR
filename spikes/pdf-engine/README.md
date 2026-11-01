# Local engine feasibility lab

Experimental, synthetic-fixture harness. **Not a production editor.** The low-level adapter does not guard glyph coverage, overflow, complex text shaping, forms/signatures or nested form objects. Do not expose its replacement method to unrestricted user documents yet.

## Reproduce

From the repository root, Node 24.20.0 and npm 11.19.0 were used:

```powershell
npm.cmd ci --ignore-scripts
npm.cmd run spike
npm.cmd run spike:ocr
node spikes/pdf-engine/script-probe.mjs
npm.cmd run spike:build
$env:CHROME_PATH='C:/path/to/test-chromium/chrome.exe'
npm.cmd run spike:browser
```

`npm ci` is the proposed clean-install equivalent; the recorded run used pinned `npm install --ignore-scripts`. The lockfile fixes transitive versions. esbuild's platform binary is supplied through its optional dependency in this environment.

Browser test requires a Chromium build supporting command-line extension loading. Tested successfully with Chromium 151.0.7922.34. Branded installed Chrome did not load the test extension with these flags; downloaded Chromium 141 failed startup in this host. Use a separate test browser, never a personal profile. The harness creates a new ignored profile for every run and closes it afterward.

Manual use: open Chrome's extensions manager, enable Developer mode, load unpacked `dist/engine-lab`, then click its toolbar action. Run the local synthetic tests. No permissions or account are requested. This does not constitute Chrome Web Store approval.

Optional private probes accept local paths, create outputs only under ignored `tmp/engine-spike`, never print recognized private content, and do not alter sources:

```powershell
node spikes/pdf-engine/private-probe.mjs 'path/to/resume.pdf'
node spikes/pdf-engine/scan-inspect.mjs 'path/to/scan.pdf'
```

The resume probe only targets a heading named `Professional Summary`; it is not a general editor. The scan probe only recognizes text; the scan editing experiment uses a synthetic plain-background fixture and explicit approximate reconstruction.

See [recorded evaluation](../../docs/08-Domain-Specific/engine-evaluation.md). Generated PDFs, screenshots, model caches and test profiles are local/ignored. Build includes synthetic fixture only. The copied license files are an initial inventory; full bundled third-party/model notice review remains a release gate.
