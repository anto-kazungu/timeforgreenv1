# Climate News Component - Technical Documentation

## Overview

The Climate News component is a feature that integrates with the News API to fetch and display the latest climate and environment-related news articles. This component provides users with up-to-date information about environmental issues, climate change, and sustainability topics.

---

## Component Details

### Location
```
src/app/components/shared/climatenews/
├── climatenews.component.ts
├── climatenews.component.html
└── climatenews.component.css
```

### Route
```
/climate-news (Protected route - requires authentication)
```

---

## Technical Implementation

### 1. API Integration

**Endpoint:**
```
https://newsapi.org/v2/everything
```

**API Key:**
```
e3d1e9556fd34da4aca2be25c22e5af9
```

**Query Parameters:**
- `q`: "climate environment" - Search query for climate and environment topics
- `apiKey`: API authentication key
- `pageSize`: "20" - Number of articles to fetch
- `sortBy`: "publishedAt" - Sort by publication date (newest first)
- `language`: "en" - English language articles only

### 2. Data Models

**NewsArticle Interface:**
```typescript
interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}
```

**NewsResponse Interface:**
```typescript
interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}
```

### 3. Component Features

#### Core Functionality
- **Fetch News**: Retrieves latest climate and environment news from News API
- **Display Articles**: Shows news in a responsive grid layout
- **Article Filtering**: Removes articles with missing or removed content
- **Time Formatting**: Displays relative time (e.g., "2h ago", "3d ago")
- **External Links**: Opens full articles in new browser tabs
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Visual feedback during data fetching

#### User Interactions
- Click on any article card to open the full article in a new tab
- Back button to return to dashboard
- Logout functionality
- Retry button on error state

### 4. Component Methods

**fetchClimateNews()**
- Fetches news articles from the API
- Filters out invalid or removed articles
- Handles loading and error states

**getTimeAgo(dateString: string)**
- Converts ISO date string to relative time format
- Returns human-readable time differences (minutes, hours, days)

**openArticle(url: string)**
- Opens article URL in new browser tab

**retry()**
- Re-attempts to fetch news after an error

**goBack()**
- Navigates back to user's role-specific dashboard

**logout()**
- Logs out the current user

---

## UI/UX Design

### Layout Structure

1. **Header Section**
   - Back button (left)
   - Logout button (right)
   - Semi-transparent background with blur effect

2. **Page Header**
   - Title with globe icon
   - Subtitle describing the page purpose

3. **Content Area**
   - Loading state with spinner
   - Error state with retry button
   - News grid with article cards
   - Empty state for no results

### Article Card Design

Each news card contains:
- **Image**: Article thumbnail or placeholder with gradient
- **Source Badge**: News source name overlay
- **Title**: Article headline (max 2 lines)
- **Description**: Article summary (max 3 lines)
- **Metadata**: Author name and publication time
- **Read More Button**: Call-to-action with arrow icon

### Visual Design

**Color Scheme:**
- Primary gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Card background: White
- Text colors: Dark gray (#2d3748, #4a5568, #718096)

**Responsive Design:**
- Desktop: Multi-column grid (auto-fill, min 350px)
- Tablet: 2-column grid
- Mobile: Single column layout

**Animations:**
- Card hover: Lift effect with shadow
- Button hover: Scale and color transitions
- Loading spinner: Continuous rotation

---

## State Management

### Component States

1. **Loading State** (`loading: boolean`)
   - Initial: `true`
   - During fetch: `true`
   - After success/error: `false`

2. **Error State** (`error: boolean`)
   - Initial: `false`
   - On API error: `true`
   - On retry: `false`

3. **Articles Array** (`articles: NewsArticle[]`)
   - Initial: Empty array
   - After fetch: Populated with filtered articles

4. **Error Message** (`errorMessage: string`)
   - Stores user-friendly error message

---

## Dependencies

### Angular Modules
```typescript
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
```

### Services
```typescript
import { AuthService } from '../../../services/auth.service';
```

### External APIs
- **News API**: https://newsapi.org/
- **API Documentation**: https://newsapi.org/docs

---

## Error Handling

### API Errors
- Network failures
- Invalid API key
- Rate limiting
- Server errors

### Error Display
```
Failed to load climate news. Please try again later.
```

### Recovery Options
- Retry button to re-fetch data
- Console logging for debugging

---

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Component can be lazy-loaded if needed
2. **Image Optimization**: Uses background-image for better control
3. **Filtering**: Removes invalid articles before rendering
4. **Limited Results**: Fetches only 20 articles per request

### Caching
- No caching implemented (always fetches fresh data)
- Consider implementing cache for production to reduce API calls

---

## Security Considerations

### API Key Management
⚠️ **Important**: The API key is currently hardcoded in the component. For production:

1. **Move to Environment Variables**
```typescript
// environment.ts
export const environment = {
  production: false,
  newsApiKey: 'YOUR_API_KEY_HERE'
};
```

2. **Use Backend Proxy**
- Create a backend endpoint to proxy News API requests
- Keep API key server-side only
- Add rate limiting and caching

3. **Environment-Specific Keys**
- Development key for testing
- Production key with higher rate limits

### Content Security
- External links open in new tabs (`_blank`)
- No user-generated content
- Sanitized API responses

---

## Testing

### Manual Testing Checklist

- [ ] Component loads successfully
- [ ] Loading spinner displays during fetch
- [ ] Articles display in grid layout
- [ ] Article images load correctly
- [ ] Placeholder images show when no image available
- [ ] Time formatting works correctly
- [ ] Click on article opens in new tab
- [ ] Back button navigates to dashboard
- [ ] Logout button works
- [ ] Error state displays on API failure
- [ ] Retry button re-fetches data
- [ ] Responsive design works on mobile
- [ ] Responsive design works on tablet
- [ ] Responsive design works on desktop

### Test Scenarios

1. **Successful Load**
   - Navigate to /climate-news
   - Verify articles display
   - Check all article data is present

2. **Error Handling**
   - Simulate network error
   - Verify error message displays
   - Click retry button
   - Verify data re-fetches

3. **Empty Results**
   - Modify query to return no results
   - Verify empty state displays

4. **Article Interaction**
   - Click on article card
   - Verify new tab opens with correct URL

---

## Future Enhancements

### Planned Features

1. **Search Functionality**
   - Allow users to search for specific topics
   - Filter by date range
   - Filter by news source

2. **Pagination**
   - Load more articles on scroll
   - Page navigation controls

3. **Bookmarking**
   - Save favorite articles
   - View saved articles later

4. **Categories**
   - Climate Change
   - Renewable Energy
   - Conservation
   - Sustainability
   - Wildlife

5. **Sharing**
   - Share articles on social media
   - Copy article link
   - Email article

6. **Offline Support**
   - Cache articles for offline reading
   - Service worker implementation

7. **Personalization**
   - User preferences for topics
   - Recommended articles based on interests

---

## API Rate Limits

### News API Free Tier
- **Requests**: 100 requests per day
- **Results**: Up to 100 results per request
- **Delay**: No delay between requests
- **Commercial Use**: Not allowed

### Production Recommendations
1. Upgrade to paid plan for production use
2. Implement caching to reduce API calls
3. Add rate limiting on frontend
4. Monitor API usage

---

## Troubleshooting

### Common Issues

**Issue: Articles not loading**
- Check API key validity
- Verify network connection
- Check browser console for errors
- Verify API rate limits not exceeded

**Issue: Images not displaying**
- Some articles may not have images
- Placeholder gradient will display instead
- Check image URLs in network tab

**Issue: CORS errors**
- News API supports CORS for client-side requests
- If issues persist, implement backend proxy

**Issue: Slow loading**
- Check network speed
- Consider reducing pageSize parameter
- Implement loading skeleton for better UX

---

## Deployment Checklist

### Pre-Deployment

- [ ] Move API key to environment variables
- [ ] Test on all supported browsers
- [ ] Test on all device sizes
- [ ] Verify error handling works
- [ ] Check accessibility compliance
- [ ] Optimize images and assets
- [ ] Review API usage limits

### Post-Deployment

- [ ] Monitor API usage
- [ ] Track error rates
- [ ] Gather user feedback
- [ ] Monitor performance metrics
- [ ] Set up alerts for API failures

---

## Code Examples

### Adding to Navigation

```typescript
// In any dashboard component
navigateToClimateNews() {
  this.router.navigate(['/climate-news']);
}
```

### HTML Button
```html
<button (click)="navigateToClimateNews()">
  <span class="material-symbols-outlined">public</span>
  Climate News
</button>
```

---

## Maintenance

### Regular Tasks

1. **Weekly**
   - Monitor API usage
   - Check for broken links
   - Review error logs

2. **Monthly**
   - Update dependencies
   - Review API key status
   - Analyze user engagement

3. **Quarterly**
   - Evaluate API plan
   - Consider feature additions
   - Performance optimization review

---

## Support & Resources

### Documentation Links
- [News API Documentation](https://newsapi.org/docs)
- [Angular HttpClient Guide](https://angular.io/guide/http)
- [Angular Routing](https://angular.io/guide/router)

### Contact
For issues or questions about this component:
- Check the project README
- Review this documentation
- Contact the development team

---

## Version History

### v1.0.0 (Current)
- Initial implementation
- News API integration
- Responsive grid layout
- Error handling
- Loading states
- Time formatting
- External link support

---

## License & Attribution

### News API
- Service provided by News API
- Subject to News API terms of service
- Attribution required for free tier

### Component
- Part of Time For Green application
- Follows project coding standards
- Uses Material Icons for UI elements

---

**Last Updated**: November 20, 2025  
**Component Status**: ✅ Production Ready  
**Documentation Version**: 1.0.0
