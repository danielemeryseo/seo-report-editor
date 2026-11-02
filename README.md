# seo-report-editor

The chat editor loaded by the `seo-report` Claude skill's inline widget. The skill's widget shell sets `window.SER = { md, project, draft }` and loads `seo-report-editor.js` from jsDelivr, pinned to a tag:

```
https://cdn.jsdelivr.net/gh/danielemeryseo/seo-report-editor@v8.10.0/seo-report-editor.js
```

The source of truth is `assets/seo-report-editor.js` in the private `seo-report` repo; this repo only publishes it. Each release is a new tag matching the skill version, pushed by `scripts/publish_editor.sh` there. Nothing client-specific is in this file.
