# Cloudflare Pages Deployment Guide

## Quick Setup (Recommended Method)

### Step 1: Get Your Cloudflare Credentials

1. **Get Account ID:**
   - Log in to https://dash.cloudflare.com/
   - Click on your domain or "Workers & Pages"
   - Your Account ID is in the right sidebar
   - Copy the Account ID

2. **Create API Token:**
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template or create custom
   - Required permissions:
     - Account - Workers Scripts - Edit
     - Account - Account Settings - Read
     - Zone - Zone - Read
   - Set "Account Resources" to include your account
   - Click "Continue to summary" then "Create Token"
   - **Copy the token immediately** (you won't see it again)

### Step 2: Deploy via GitHub Integration (Easiest)

1. **Connect GitHub to Cloudflare:**
   - Go to https://dash.cloudflare.com/
   - Navigate to "Workers & Pages"
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

2. **Connect Repository:**
   - Select `HLPFLCG/privbranding2`
   - Click "Begin setup"

3. **Configure Build Settings:**
   ```
   Project name: priv-mediakit-builder-v2
   Production branch: main
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   ```

4. **Environment Variables (if needed):**
   - No environment variables required for this project

5. **Deploy:**
   - Click "Save and Deploy"
   - Wait for build to complete (~2-3 minutes)

### Step 3: Access Your Site

After successful deployment, Cloudflare will provide:
- **Live URL:** `https://priv-mediakit-builder-v2.pages.dev`
- **Custom domain:** Add in project settings if desired

---

## Alternative: Manual Deployment with Wrangler CLI

### Prerequisites
```bash
npm install -g wrangler
```

### Login to Cloudflare
```bash
wrangler login
```
This will open a browser for authentication.

### Deploy
```bash
cd priv-mediakit-builder-v2
wrangler pages deploy dist --project-name=priv-mediakit-builder-v2
```

### Subsequent Deployments
```bash
npm run build
wrangler pages deploy dist --project-name=priv-mediakit-builder-v2
```

---

## GitHub Actions Setup (Optional)

### Add Secrets to GitHub Repository

1. Go to https://github.com/HLPFLCG/privbranding2/settings/secrets/actions
2. Add the following secrets:
   - `CLOUDFLARE_API_TOKEN`: Your API token from Step 1
   - `CLOUDFLARE_ACCOUNT_ID`: Your Account ID from Step 1

### Enable GitHub Actions

The `.github/workflows/cloudflare-pages.yml` file is already included. Once you add the secrets, it will automatically deploy on every push to the `main` branch.

---

## Troubleshooting

### Build Failures
- Check that `package.json` has correct build scripts
- Verify `dist` directory exists after `npm run build`
- Check build logs in Cloudflare dashboard

### API Token Issues
- Ensure token has correct permissions
- Verify token hasn't expired
- Make sure account ID matches your Cloudflare account

### Custom Domain Issues
- Add domain in Cloudflare dashboard
- Update DNS records as instructed
- Wait for DNS propagation (up to 24 hours)

---

## Custom Domain Setup (Optional)

1. **Add Custom Domain in Cloudflare:**
   - Go to your Pages project settings
   - Click "Custom domains"
   - Click "Set up a custom domain"
   - Enter your domain (e.g., `mediakit.hlpfl.com`)

2. **Configure DNS:**
   - Cloudflare will provide DNS records
   - Add them to your domain's DNS settings
   - If using Cloudflare for DNS, it's automatic

3. **SSL Certificate:**
   - Cloudflare automatically provisions SSL
   - Available immediately after DNS propagates

---

## Performance Optimization

Your application is already optimized for Cloudflare Pages:
- ✅ Static site generation with Vite
- ✅ Code splitting and tree shaking
- ✅ Asset optimization
- ✅ CDN distribution via Cloudflare

Additional optimizations (optional):
- Enable Cloudflare caching rules
- Set up Cloudflare Analytics
- Configure image optimization
- Enable Brotli compression

---

## Support & Resources

- **Cloudflare Pages Documentation:** https://developers.cloudflare.com/pages/
- **Wrangler CLI Documentation:** https://developers.cloudflare.com/workers/wrangler/
- **GitHub Actions for Pages:** https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/

---

## Current Status

✅ **Project:** Ready for deployment
✅ **Build:** Tested and working
✅ **Repository:** HLPFLCG/privbranding2 (main branch)
✅ **Configuration:** Cloudflare Pages workflow added

**Next Step:** Follow the "Quick Setup" guide above to deploy!