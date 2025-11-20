# Environment Configuration Guide

## Overview

This guide explains how to configure environment variables for the Time For Green application, particularly for external API integrations like the News API.

---

## Environment Files

The application uses Angular's environment configuration system with separate files for development and production:

```
src/environments/
├── environment.ts           # Development configuration
├── environment.prod.ts      # Production configuration
└── environment.template.ts  # Template file (for reference)
```

---

## Configuration Structure

### Development Environment (`environment.ts`)

```typescript
export const environment = {
  production: false,
  newsApi: {
    apiUrl: 'https://newsapi.org/v2/everything',
    apiKey: 'YOUR_API_KEY_HERE'
  }
};
```

### Production Environment (`environment.prod.ts`)

```typescript
export const environment = {
  production: true,
  newsApi: {
    apiUrl: 'https://newsapi.org/v2/everything',
    apiKey: 'YOUR_PRODUCTION_API_KEY_HERE'
  }
};
```

---

## News API Setup

### Step 1: Get Your API Key

1. Visit [News API](https://newsapi.org/)
2. Click "Get API Key" or "Register"
3. Sign up for a free account
4. Copy your API key from the dashboard

### Step 2: Configure Environment Files

**For Development:**

1. Open `src/environments/environment.ts`
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Save the file

**For Production:**

1. Open `src/environments/environment.prod.ts`
2. Replace `YOUR_PRODUCTION_API_KEY_HERE` with your production API key
3. Save the file

### Step 3: Verify Configuration

The climate news component will automatically use the configured API key:

```typescript
import { environment } from '../../../../environments/environment';

// API credentials are loaded from environment
private readonly API_URL = environment.newsApi.apiUrl;
private readonly API_KEY = environment.newsApi.apiKey;
```

---

## API Key Security

### ⚠️ Important Security Notes

1. **Never commit API keys to version control**
   - The `.gitignore` file excludes environment files
   - Use the template file for reference only

2. **Use different keys for development and production**
   - Free tier for development/testing
   - Paid tier for production (if needed)

3. **Rotate keys regularly**
   - Change API keys periodically
   - Revoke old keys after rotation

4. **Consider using a backend proxy** (Recommended for production)
   - Keep API keys server-side only
   - Add rate limiting
   - Implement caching
   - Better security control

---

## Environment Variables by Feature

### News API Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `newsApi.apiUrl` | News API endpoint | Yes | `https://newsapi.org/v2/everything` |
| `newsApi.apiKey` | Your News API key | Yes | None |

### Future Configurations

As the application grows, you can add more environment variables:

```typescript
export const environment = {
  production: false,
  
  // News API
  newsApi: {
    apiUrl: 'https://newsapi.org/v2/everything',
    apiKey: 'YOUR_API_KEY_HERE'
  },
  
  // Future: Backend API
  apiUrl: 'http://localhost:3000/api',
  
  // Future: Authentication
  auth: {
    jwtSecret: 'YOUR_JWT_SECRET',
    tokenExpiry: 3600
  },
  
  // Future: Database
  database: {
    host: 'localhost',
    port: 5432,
    name: 'timeforgreen'
  },
  
  // Future: Storage
  storage: {
    bucket: 'timeforgreen-assets',
    region: 'us-east-1'
  }
};
```

---

## Build Configuration

### Development Build

```bash
ng serve
# Uses environment.ts automatically
```

### Production Build

```bash
ng build --configuration production
# Uses environment.prod.ts automatically
```

### Custom Configuration

You can add custom configurations in `angular.json`:

```json
{
  "configurations": {
    "staging": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.staging.ts"
        }
      ]
    }
  }
}
```

---

## Testing Environment Configuration

### Verify API Key is Loaded

1. Open browser developer console
2. Navigate to Climate News page
3. Check network tab for API requests
4. Verify API key is included in request headers

### Test Different Environments

```bash
# Development
ng serve

# Production (local)
ng build --configuration production
ng serve --configuration production

# Check which environment is active
console.log(environment.production); // false or true
```

---

## Troubleshooting

### Issue: API Key Not Working

**Symptoms:**
- News articles not loading
- 401 Unauthorized errors
- "Invalid API key" messages

**Solutions:**
1. Verify API key is correct (no extra spaces)
2. Check API key is active on newsapi.org
3. Ensure you haven't exceeded rate limits
4. Verify environment file is saved
5. Restart development server

### Issue: Environment File Not Found

**Symptoms:**
- Build errors about missing environment file
- Import errors in components

**Solutions:**
1. Ensure `environment.ts` exists in `src/environments/`
2. Check file name spelling
3. Verify import path in components
4. Run `ng serve` to regenerate if needed

### Issue: Wrong Environment Used

**Symptoms:**
- Production API key used in development
- Development settings in production build

**Solutions:**
1. Check `angular.json` file replacements
2. Verify build command uses correct configuration
3. Clear Angular cache: `rm -rf .angular/cache`
4. Rebuild: `ng build --configuration production`

---

## Best Practices

### 1. Separate Keys for Each Environment

```typescript
// Development - Free tier, testing
newsApi: {
  apiKey: 'dev_key_with_lower_limits'
}

// Production - Paid tier, higher limits
newsApi: {
  apiKey: 'prod_key_with_higher_limits'
}
```

### 2. Use Environment-Specific Settings

```typescript
export const environment = {
  production: true,
  
  // Enable/disable features per environment
  features: {
    debugMode: false,
    analytics: true,
    errorReporting: true
  },
  
  // Different API endpoints
  newsApi: {
    apiUrl: environment.production 
      ? 'https://api.production.com'
      : 'https://api.staging.com',
    apiKey: 'YOUR_KEY'
  }
};
```

### 3. Document All Variables

Keep this documentation updated when adding new environment variables.

### 4. Validate Configuration on Startup

```typescript
// In app.component.ts or main.ts
if (!environment.newsApi.apiKey || environment.newsApi.apiKey === 'YOUR_API_KEY_HERE') {
  console.error('News API key not configured! Please check environment.ts');
}
```

---

## Migration to Backend Proxy (Recommended)

For production applications, consider moving API keys to a backend service:

### Backend Proxy Architecture

```
Frontend (Angular)
    ↓
Backend API (Node.js/Express)
    ↓
News API (with API key)
```

### Benefits

1. **Security**: API keys never exposed to client
2. **Rate Limiting**: Control request frequency
3. **Caching**: Reduce API calls and costs
4. **Monitoring**: Track usage and errors
5. **Flexibility**: Switch APIs without frontend changes

### Implementation Example

```typescript
// Frontend - No API key needed
fetchNews() {
  return this.http.get('/api/news/climate');
}

// Backend - API key stored securely
app.get('/api/news/climate', async (req, res) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=climate&apiKey=${process.env.NEWS_API_KEY}`
  );
  const data = await response.json();
  res.json(data);
});
```

---

## Environment Checklist

### Before Development

- [ ] Copy `environment.template.ts` to `environment.ts`
- [ ] Add your News API key
- [ ] Test API connection
- [ ] Verify .gitignore excludes environment files

### Before Production Deployment

- [ ] Create `environment.prod.ts` with production keys
- [ ] Use production-grade API keys
- [ ] Test production build locally
- [ ] Verify all API endpoints are correct
- [ ] Consider implementing backend proxy
- [ ] Set up monitoring and error tracking
- [ ] Document deployment process

### After Deployment

- [ ] Monitor API usage
- [ ] Check for errors in production
- [ ] Verify rate limits are sufficient
- [ ] Set up alerts for API failures
- [ ] Review security best practices

---

## Additional Resources

- [Angular Environments Guide](https://angular.io/guide/build#configuring-application-environments)
- [News API Documentation](https://newsapi.org/docs)
- [Environment Variables Best Practices](https://12factor.net/config)
- [API Security Guidelines](https://owasp.org/www-project-api-security/)

---

**Last Updated**: November 20, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
