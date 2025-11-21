# Configuration Setup Guide

## Overview

Time For Green uses a `config.json` file in the `src/assets/` directory for environment configuration. This approach is simpler and works seamlessly with Vercel and other deployment platforms.

---

## Configuration File

### Location
```
src/assets/config.json
```

### Structure
```json
{
  "newsApiUrl": "https://newsapi.org/v2/everything",
  "newsApiKey": "YOUR_API_KEY_HERE"
}
```

---

## Setup Instructions

### For Local Development

1. **Open the config file**
   ```bash
   # Edit the file
   src/assets/config.json
   ```

2. **Add your API key**
   ```json
   {
     "newsApiUrl": "",
     "newsApiKey": ""
   }
   ```

3. **Save and run**
   ```bash
   ng serve
   ```

### For Production Deployment

**Update after deployment**
1. Deploy application
2. Access your Vercel project files
3. Update `config.json` in the deployed assets folder

---

## Security Considerations

2. **Environment Variables** (Alternative)
   - Use Vercel environment variables
   - Build-time replacement
   - Requires build process modification

3. **API Key Restrictions - To be implemented**
   - Restrict API key to your domain
   - Set up rate limiting
   - Monitor usage regularly

---

## How It Works

### Component Loading

The climate news component loads configuration at runtime:

```typescript
loadConfig() {
  this.http.get<AppConfig>('/assets/config.json').subscribe({
    next: (config) => {
      this.API_URL = config.newsApiUrl;
      this.API_KEY = config.newsApiKey;
      this.fetchClimateNews();
    },
    error: (err) => {
      console.error('Error loading config:', err);
      this.error = true;
      this.errorMessage = 'Failed to load configuration.';
      this.loading = false;
    }
  });
}
```

### Benefits

✅ Simple setup - just edit one JSON file  
✅ No build configuration needed  
✅ Works with any deployment platform  
✅ Easy to update without rebuilding  
✅ Can be updated post-deployment  

### Drawbacks

⚠️ API key is publicly visible  
⚠️ Requires HTTP request to load config  
⚠️ Not suitable for sensitive credentials  

---

## Vercel Deployment

### Step 1: Prepare Config

Before deploying, ensure `src/assets/config.json` has your API key:

```json
{
  "newsApiUrl": "https://newsapi.org/v2/everything",
  "newsApiKey": "your_production_api_key"
}
```

### Step 2: Deploy

```bash
# Deploy to Vercel
vercel --prod
```

### Step 3: Verify

1. Visit your deployed site
2. Navigate to Climate News
3. Check if news articles load
4. Verify in browser console (no errors)

---

## Troubleshooting

### Issue: News not loading

**Check:**
1. Open browser DevTools → Network tab
2. Look for request to `/assets/config.json`
3. Verify it returns 200 status
4. Check the response contains your API key

**Solutions:**
- Ensure `config.json` exists in `src/assets/`
- Verify JSON syntax is correct
- Check API key is valid
- Test API key at newsapi.org

### Issue: 401 Unauthorized

**Cause:** Invalid or expired API key

**Solutions:**
1. Get new API key from newsapi.org
2. Update `config.json`
3. Redeploy or restart dev server

### Issue: CORS errors

**Cause:** News API doesn't allow requests from your domain

**Solutions:**
- News API supports CORS for client-side requests
- If issues persist, implement backend proxy
- Check browser console for specific error

---

## Alternative: Backend Proxy Setup

For production applications, use a backend proxy:

### Architecture

```
Frontend → Your Backend API → News API
```

### Benefits

✅ API key stays server-side  
✅ Better security  
✅ Rate limiting control  
✅ Caching capabilities  
✅ Request monitoring  

### Implementation Example

**Backend (Node.js/Express):**
```javascript
app.get('/api/news', async (req, res) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=climate&apiKey=${process.env.NEWS_API_KEY}`
  );
  const data = await response.json();
  res.json(data);
});
```

**Frontend:**
```typescript
// Update config.json
{
  "newsApiUrl": "/api/news",
  "newsApiKey": "" // Not needed with backend proxy
}

// Update component
fetchClimateNews() {
  // No API key needed in params
  this.http.get<NewsResponse>(this.API_URL).subscribe({
    next: (response) => {
      this.articles = response.articles;
      this.loading = false;
    }
  });
}
```

---

## Best Practices

### Development

1. **Use free tier API key** for development
2. **Don't commit sensitive keys** to public repositories
3. **Test locally** before deploying
4. **Monitor API usage** regularly

### Production

1. **Use separate API key** for production
2. **Set up domain restrictions** on API key
3. **Implement rate limiting** if possible
4. **Monitor for abuse** and unusual activity
5. **Consider backend proxy** for sensitive applications

### Maintenance

1. **Rotate API keys** periodically
2. **Update documentation** when changing config
3. **Test after updates** to ensure functionality
4. **Keep backup** of working configuration

---

## Migration to Environment Variables

If you want to migrate to environment variables later:

1. Create environment files
2. Update angular.json with fileReplacements
3. Update components to use environment
4. Remove config.json approach
5. Update deployment process

See [Environment Setup Guide](./ENVIRONMENT-SETUP.md) for details.

---

## Summary

The `config.json` approach provides:
- ✅ Simple configuration management
- ✅ Easy deployment process
- ✅ No build configuration needed
- ✅ Works with all platforms


**Last Updated**: November 20, 2025  
**Configuration Method**: config.json  
**Status**: ✅ Production Ready
