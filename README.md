# PitchGuard XR

Website for the 2026 Congressional App Challenge (Texas 31st District).
Two tabs: the demo video and an interactive Unity WebGL build.

```
index.html          page
css/style.css       styles
js/main.js          tabs, lazy-loads the Unity build
assets/             demo video (1080p), poster, captions (.vtt), logo
unity/              put your Unity WebGL build here
netlify.toml        Netlify settings and headers for compressed Unity builds
```

## 1. Add your Unity build

1. In Unity: File > Build Settings > WebGL > Build.
   Easiest setup: Player Settings > Publishing Settings > Compression Format = **Disabled**.
   (Brotli and Gzip also work. `netlify.toml` already has the headers for them.)
2. Open the folder Unity made. Copy its contents (`index.html`, `Build/`, `TemplateData/`) into `unity/`.
   Replace the placeholder `unity/index.html`.
3. Open the site locally with a web server, not by double-clicking the file:
   `python3 -m http.server 8000` in this folder, then go to http://localhost:8000

## 2. Put it on GitHub

GitHub rejects any single file over 100 MB. The demo video here is already compressed to fit.
If a Unity file in `Build/` is over 100 MB, shrink it before pushing (texture compression,
fewer assets) or deploy to Netlify by dragging the folder onto the Netlify dashboard instead.

```
git init
git add .
git commit -m "PitchGuard XR site"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/pitchguard-xr.git
git push -u origin main
```

## 3. Deploy on Netlify

Add new site > Import an existing project > pick the GitHub repo.
Build command: leave empty. Publish directory: `.` (already set in `netlify.toml`).

## Updating the video

Replace `assets/pitchguard-xr-demo.mp4` with your new export (same file name, H.264 MP4, 1080p,
under 100 MB). The captions in `assets/captions.vtt` are timed to the current cut. If you change
the video or burn captions into it, update or delete the `<track>` line in `index.html`.
