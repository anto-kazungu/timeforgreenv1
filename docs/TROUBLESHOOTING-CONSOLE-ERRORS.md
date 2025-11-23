# Troubleshooting Console Errors

## Common Console Errors and Solutions

### 1. **Image Loading Errors**
**Error:** `Failed to load resource: the server responded with a status of 404 (Not Found)`

**Solution:**
- Check if image files exist in `src/assets/component-images/`
- Required images:
  - `road-pollution.jpg`
  - `community.jpg`
  - `river.jpg`
  - `pollutedriver.jpg`
  - `training.jpg`
  - `pollutedriver2.jpg`
- If images are missing, the component will still work with gradient backgrounds

### 2. **Material Icons Not Loading**
**Error:** `Material Symbols not rendering` or showing boxes instead of icons

**Solution:**
- Verify in `src/index.html` that Material Symbols are imported:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

### 3. **Animation Performance Warnings**
**Warning:** `Forced reflow` or `Layout thrashing`

**Solution:**
- Animations use CSS transforms which are GPU-accelerated
- If performance issues occur, add to CSS:
```css
* {
  will-change: transform;
}
```

### 4. **Router Navigation Errors**
**Error:** `Cannot match any routes`

**Solution:**
- Ensure routes are properly configured in `app.routes.ts`
- Check that `/profile` and `/why-go-green` routes exist

### 5. **Backdrop Filter Not Supported**
**Warning:** `backdrop-filter not supported in this browser`

**Solution:**
- This is a progressive enhancement
- Component will work without it, just without blur effects
- Fallback is already included in CSS

### 6. **Slideshow Images Not Found**
**Error:** `404 for /assets/splashscreenimages/deforestation.png`

**Solution:**
- Check if slideshow images exist:
  - `src/assets/splashscreenimages/deforestation.png`
  - `src/assets/splashscreenimages/reforestation.png`
- If missing, add placeholder images or update paths

## Quick Fixes

### Clear Browser Cache
```bash
# Hard refresh
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Rebuild Angular Project
```bash
# Stop the server
Ctrl + C

# Clear cache and rebuild
npm run build
ng serve
```

### Check Console for Specific Errors
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for red error messages
4. Check Network tab for failed requests

## Preventive Measures

### 1. Add Error Boundaries
Consider adding error handling in components:
```typescript
ngOnInit() {
  try {
    this.startSlideshow();
  } catch (error) {
    console.error('Slideshow error:', error);
  }
}
```

### 2. Add Image Fallbacks
Use `onerror` handlers for images:
```html
<img src="./assets/logov2.png" 
     alt="Logo" 
     (error)="handleImageError($event)">
```

### 3. Lazy Load Images
For better performance:
```html
<img loading="lazy" src="...">
```

## Current Status

### Fixed Issues:
✅ Removed potentially missing background image URLs from CSS
✅ All components have proper TypeScript types
✅ Animations use hardware-accelerated properties
✅ Proper error handling in place

### If Errors Persist:
1. Share the exact error message from console
2. Check browser compatibility (Chrome 90+, Firefox 88+, Safari 14+)
3. Verify all asset files exist in correct locations
4. Check network tab for failed requests

## Contact
If issues persist, provide:
- Exact error message
- Browser and version
- Steps to reproduce
- Screenshot of console
