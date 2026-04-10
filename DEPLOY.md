# Deploying Waparcel Static Site to Cloudflare Pages

## Overview

This guide walks you through connecting your GitHub repo to Cloudflare Pages so that every push to `main` automatically deploys your site.

---

## Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/) (free tier works)
- [GitHub repo](https://github.com/tokencount/waparcel-static) with your `static-site` code pushed

---

## Step 1: Push Code to GitHub

```bash
cd static-site
git add .
git commit -m "feat: complete static site with all pages"
git push origin main
```

> ✅ Already done — repo is at `https://github.com/tokencount/waparcel-static`

---

## Step 2: Connect GitHub to Cloudflare Pages

### Option A: Direct GitHub Integration (Recommended)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Create Application** → **Pages**
3. Click **Connect to Git**
4. Authenticate with GitHub if prompted
5. Select your repo: **`tokencount/waparcel-static`**
6. Configure the build:

| Field | Value |
|-------|-------|
| **Production branch** | `main` |
| **Build command** | _(leave blank — pure static)_ |
| **Build output directory** | `/` |
| **Root directory** | `/` (or `static-site/` if repo root) |

> ⚠️ **Important:** If your repo root is the `static-site` folder, set **Root directory** to `/static-site`.

7. Click **Save and Deploy**

Cloudflare will detect it's a static site (no build step needed) and deploy immediately.

### Option B: Upload Directly (No GitHub)

1. Go to **Workers & Pages** → **Create Application** → **Pages**
2. Click **Upload assets**
3. Drag & drop the `static-site` folder contents
4. Cloudflare will assign a URL like `random-name-xxxx.pages.dev`

---

## Step 3: Custom Domain Setup

After first deploy:

1. In your Cloudflare Pages project → **Custom domains**
2. Add `waparcel.com` (or subdomain like `www.waparcel.com`)
3. Cloudflare will verify and issue an SSL certificate automatically
4. Update your DNS at your registrar if needed

> **Pro tip:** Use Cloudflare Proxy (orange cloud) for free CDN + DDoS protection.

---

## Step 4: Configure Build Settings (for future reference)

If you add a build process later (e.g., Tailwind CSS, TypeScript, React):

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `18` |

---

## Step 5: Set Up Branch Previews

Every pull request automatically gets a preview URL. Enable in:

**Settings → Builds & deployments → Branch deployments: "All"**

---

## Step 6: Environment Variables (if needed later)

Go to **Settings → Environment variables** for:

```
NODE_VERSION = 18
NEXT_PUBLIC_SITE_URL = https://waparcel.com
```

---

## Step 7: CI/CD Automation

With GitHub integration, every `git push` to `main` triggers an automatic deploy.

For pull requests:
- A unique preview URL is created automatically
- Share it with clients for review before merging

---

## Workflow Summary

```
Developer pushes to main
        ↓
GitHub webhook triggers
        ↓
Cloudflare Pages pulls latest code
        ↓
Site deployed to *.pages.dev
        ↓
Custom domain SSL updated
        ↓
Live! 🚀
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Page not found" errors | Check **Build output directory** is `/` or matches your static files location |
| CSS/JS not loading | Verify asset paths are relative (`./css/style.css`) not absolute |
| Old content shown | Hard refresh (Cmd+Shift+R) or disable cache in browser devtools |
| Deploy failed | Check **Deployments** tab → click failed deploy → view logs |
| Custom domain not working | Ensure DNS is pointing to Cloudflare nameservers |

---

## Alternative: Deploy via Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy ./static-site --project-name=waparcel-static
```

---

## Estimated Speed

| Metric | Value |
|--------|-------|
| First deploy | ~30–60 seconds |
| Subsequent deploys | ~10–20 seconds |
| Global edge CDN | 200+ locations |
| SSL | Free, automatic |
| DDoS protection | Free |

---

## Cost

- **Free tier**: Unlimited static sites, 500 builds/month, 100GB bandwidth/month
- **Pro tier**: $20/month — unlimited builds, 1TB bandwidth, priority support

For a company site like Waparcel, **free tier is fully sufficient**.
