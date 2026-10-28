# 割草养土 Grass Cutting

A small offline-capable web app (PWA) on building orchard soil by cutting grass instead of spraying it, written for durian growers.

Open the published site on a phone and use **Install** (Android) or **Share → Add to Home Screen** (iPhone).

To update the app, edit the files (usually `index.html`) and push. The service worker is network-first, so installed copies show the new version the next time they open online. No version bump is needed. The cached copy is only used offline.

All text is in `content.js`, in three languages (`zh`, `en`, `ms`). Edit the wording there; keep the three in step.

To add a new file to the offline copy, list it in `SHELL` in `sw.js`.
