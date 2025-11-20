// Production environment configuration
// API keys should be set as Vercel environment variables
export const environment = {
  production: true,
  newsApi: {
    apiUrl: 'https://newsapi.org/v2/everything',
    // Set NEWS_API_KEY in Vercel environment variables
    apiKey: ''
  }
};
