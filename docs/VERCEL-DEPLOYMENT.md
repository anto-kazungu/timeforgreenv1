# Vercel Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Time For Green application to Vercel.

---

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **News API Key**: Get your API key from [newsapi.org](https://newsapi.org/register)

---

## Quick Deployment

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Select the repository containing Time For Green

2. **Configure Project**
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist/timeforgreenv1/browser`
   - **Install Command**: `npm install`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following:
     ```
     Name: NEWS_API_KEY
     Value: your_news_api_key_here
     ```
   - Apply to: Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts to configure your project
```

---

## Configuration Files

### vercel.json

The project includes a `vercel.json` configuration file:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/timeforgreenv1/browser"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NEWS_API_KEY": "@news-api-key"
  }
}
```

**Key Settings:**
- **distDir**: Points to Angular's output directory
- **routes**: Enables client-side routing (SPA)
- **env**: References environment variables

---

## Environment Variables Setup

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEWS_API_KEY` | News API authentication key | `e3d1e9556fd34da4aca2be25c22e5af9` |

### Setting Variables in Vercel

**Via Dashboard:**
1. Go to your project on Vercel
2. Navigate to Settings → Environment Variables
3. Click "Add New"
4. Enter variable name and value
5. Select environments (Production, Preview, Development)
6. Click "Save"

**Via CLI:**
```bash
# Add environment variable
vercel env add NEWS_API_KEY

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm NEWS_API_KEY
```

### Local Development

For local development, create a `.env.local` file:

```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
NEWS_API_KEY=your_api_key_here
```

**Note**: `.env.local` is gitignored and won't be committed.

---

## Build Configuration

### Angular Configuration

The project uses Angular's production configuration defined in `angular.json`:

```json
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
        }
      ],
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    }
  }
}
```

### Build Scripts

```json
{
  "scripts": {
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "vercel-build": "ng build --configuration production"
  }
}
```

- **build**: Development build
- **build:prod**: Production build
- **vercel-build**: Vercel-specific build command

---

## Deployment Process

### Automatic Deployments

Vercel automatically deploys when you push to your repository:

1. **Production Deployments**
   - Triggered by pushes to `main` or `master` branch
   - Uses production environment variables
   - Deployed to your production domain

2. **Preview Deployments**
   - Triggered by pushes to other branches
   - Each branch gets a unique preview URL
   - Uses preview environment variables

3. **Pull Request Deployments**
   - Automatic preview for each PR
   - Comment with preview URL added to PR
   - Updates on each commit

### Manual Deployments

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Deploy specific branch
vercel --prod --branch=main
```

---

## Custom Domain Setup

### Add Custom Domain

1. **Via Dashboard**
   - Go to Project Settings → Domains
   - Click "Add"
   - Enter your domain name
   - Follow DNS configuration instructions

2. **Via CLI**
   ```bash
   vercel domains add yourdomain.com
   ```

### DNS Configuration

**For Vercel DNS:**
- Vercel automatically configures DNS

**For External DNS:**
Add these records to your DNS provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate

- Vercel automatically provisions SSL certificates
- HTTPS is enabled by default
- Certificates auto-renew

---

## Monitoring & Analytics

### Vercel Analytics

Enable analytics in your project:

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. View real-time metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Build Logs

View build logs:
- Dashboard: Deployments → Select deployment → View logs
- CLI: `vercel logs`

### Runtime Logs

For serverless functions (if added later):
```bash
vercel logs --follow
```

---

## Performance Optimization

### Build Optimization

Already configured in `angular.json`:
- Tree shaking
- Minification
- Code splitting
- Lazy loading
- AOT compilation

### Vercel Edge Network

- Automatic CDN distribution
- Global edge caching
- Brotli compression
- HTTP/2 support

### Caching Strategy

Vercel automatically caches:
- Static assets (images, CSS, JS)
- Build outputs
- API responses (if configured)

---

## Troubleshooting

### Common Issues

**Issue: Build Fails**

```bash
# Check build locally
npm run build:prod

# View detailed logs
vercel logs --follow
```

**Solutions:**
- Verify all dependencies are in `package.json`
- Check for TypeScript errors
- Ensure environment variables are set
- Review build logs for specific errors

**Issue: Environment Variables Not Working**

**Solutions:**
- Verify variable names match exactly
- Check variable is set for correct environment
- Redeploy after adding variables
- Clear build cache: `vercel --force`

**Issue: Routing Not Working**

**Solutions:**
- Verify `vercel.json` routes configuration
- Check Angular routing configuration
- Ensure `index.html` is in output directory

**Issue: API Key Exposed**

**Solutions:**
- Never commit API keys to repository
- Use environment variables only
- Rotate compromised keys immediately
- Consider backend proxy for production

### Debug Mode

Enable debug logging:

```bash
# Local build with debug
ng build --configuration production --verbose

# Vercel deployment with debug
vercel --debug
```

---

## Security Best Practices

### API Key Security

1. **Never commit API keys**
   - Use environment variables
   - Add `.env*` to `.gitignore`
   - Use different keys for dev/prod

2. **Rotate keys regularly**
   - Change keys periodically
   - Update in Vercel dashboard
   - Redeploy application

3. **Monitor usage**
   - Check News API dashboard
   - Set up usage alerts
   - Track API calls

### Content Security

1. **HTTPS Only**
   - Vercel enforces HTTPS
   - Redirect HTTP to HTTPS

2. **Security Headers**
   Add to `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-XSS-Protection",
             "value": "1; mode=block"
           }
         ]
       }
     ]
   }
   ```

---

## Rollback & Recovery

### Rollback to Previous Deployment

**Via Dashboard:**
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Via CLI:**
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Instant Rollback

Vercel keeps all deployments:
- No data loss
- Instant rollback
- Zero downtime

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build:prod
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Cost Optimization

### Vercel Pricing

**Hobby Plan (Free):**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Perfect for this project

**Pro Plan ($20/month):**
- Increased bandwidth
- Team collaboration
- Advanced analytics
- Priority support

### Bandwidth Optimization

1. **Image Optimization**
   - Use WebP format
   - Compress images
   - Lazy load images

2. **Code Splitting**
   - Already configured in Angular
   - Lazy load routes
   - Tree shake unused code

3. **Caching**
   - Leverage Vercel CDN
   - Set appropriate cache headers
   - Use service workers

---

## Post-Deployment Checklist

### Verification

- [ ] Application loads successfully
- [ ] All routes work correctly
- [ ] Climate news loads (API working)
- [ ] Images display properly
- [ ] Forms submit correctly
- [ ] Authentication works
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled

### Testing

```bash
# Test production build locally
npm run build:prod
npx http-server dist/timeforgreenv1/browser

# Test on different devices
# - Desktop browsers
# - Mobile browsers
# - Tablets
```

### Monitoring

- Set up Vercel Analytics
- Monitor build times
- Track error rates
- Check performance metrics
- Review user feedback

---

## Support & Resources

### Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [News API Documentation](https://newsapi.org/docs)

### Community

- [Vercel Discord](https://vercel.com/discord)
- [Vercel GitHub](https://github.com/vercel/vercel)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vercel)

### Getting Help

1. Check Vercel documentation
2. Review deployment logs
3. Search community forums
4. Contact Vercel support (Pro plan)

---

## Conclusion

Your Time For Green application is now deployed on Vercel with:

- ✅ Automatic deployments from Git
- ✅ Environment variables configured
- ✅ Global CDN distribution
- ✅ HTTPS enabled
- ✅ Zero-downtime deployments
- ✅ Instant rollback capability

**Next Steps:**
1. Monitor application performance
2. Set up custom domain (optional)
3. Enable analytics
4. Share your deployment URL
5. Gather user feedback

---

**Deployment Status**: ✅ Production Ready  
**Last Updated**: November 20, 2025  
**Version**: 1.0.0
