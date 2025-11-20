# Quick Deployment Guide

## Deploy to Vercel in 5 Minutes

### Step 1: Get News API Key
1. Visit [newsapi.org/register](https://newsapi.org/register)
2. Sign up for free account
3. Copy your API key

### Step 2: Deploy to Vercel
1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure:
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/timeforgreenv1/browser`

### Step 3: Set Environment Variable
1. Go to Project Settings → Environment Variables
2. Add:
   - Name: `NEWS_API_KEY`
   - Value: `your_api_key_here`
3. Apply to all environments

### Step 4: Deploy
Click "Deploy" and wait for build to complete!

---

## Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## After Deployment

Your app will be live at: `https://your-project.vercel.app`

**Test these features:**
- [ ] Login/Signup works
- [ ] Climate News loads
- [ ] All dashboards accessible
- [ ] Images display correctly

---

## Need Help?

See detailed guide: [docs/VERCEL-DEPLOYMENT.md](./docs/VERCEL-DEPLOYMENT.md)

---

**Ready to go green? Deploy now!** 🌱
