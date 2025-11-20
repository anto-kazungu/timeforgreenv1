// Environment Configuration Template
// Create the files environment.ts and environment.prod.ts
// Copy the code below and replace the placeholder values with your actual API credentials

export const environment = {
  production: false, // Set to true for production
  newsApi: {
    apiUrl: 'https://newsapi.org/v2/everything',
    apiKey: 'YOUR_NEWS_API_KEY_HERE' // Get your API key from https://newsapi.org/
  }
};

/*
 * Instructions:
 * 1. Sign up for a free API key at https://newsapi.org/register
 * 2. Copy this file to environment.ts (for development)
 * 3. Copy this file to environment.prod.ts (for production)
 * 4. Replace 'YOUR_NEWS_API_KEY_HERE' with your actual API key
 */
