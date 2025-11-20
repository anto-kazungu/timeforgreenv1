# Bootstrap 5 Integration Guide

## Overview
Bootstrap 5 has been integrated into the Just Go Green application via CDN for consistent UI components and utility classes.

## Installation
Bootstrap 5.3.2 is loaded via CDN in `index.html`:
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JS Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

## Integration with Existing Design System

### Color System
Bootstrap's color utilities can be customized to match our green theme:

```css
/* Override Bootstrap colors in styles.css */
:root {
  --bs-primary: var(--green-600);
  --bs-primary-rgb: 58, 164, 121;
  --bs-success: var(--green-600);
  --bs-success-rgb: 58, 164, 121;
}
```

### Spacing
Bootstrap spacing utilities align with our design tokens:
- `p-1` = 0.25rem (4px) ≈ `var(--spacing-xs)`
- `p-2` = 0.5rem (8px) = `var(--spacing-sm)`
- `p-3` = 1rem (16px) = `var(--spacing-md)`
- `p-4` = 1.5rem (24px) = `var(--spacing-lg)`
- `p-5` = 3rem (48px) = `var(--spacing-2xl)`

### Typography
Bootstrap typography works with Poppins font:
```html
<h1 class="display-4 fw-bold">Heading</h1>
<p class="lead">Lead paragraph</p>
<small class="text-muted">Small text</small>
```

## Common Bootstrap Components

### 1. Cards
```html
<div class="card shadow-sm">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content</p>
    <a href="#" class="btn btn-primary">Action</a>
  </div>
</div>
```

### 2. Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary</button>

<!-- Outline Button -->
<button class="btn btn-outline-primary">Outline</button>

<!-- Icon Button -->
<button class="btn btn-primary">
  <span class="material-symbols-outlined">add</span>
  Add Item
</button>
```

### 3. Grid System
```html
<div class="container">
  <div class="row g-3">
    <div class="col-md-6 col-lg-4">Column 1</div>
    <div class="col-md-6 col-lg-4">Column 2</div>
    <div class="col-md-6 col-lg-4">Column 3</div>
  </div>
</div>
```

### 4. Forms
```html
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### 5. Badges
```html
<span class="badge bg-success">Active</span>
<span class="badge bg-primary">New</span>
<span class="badge rounded-pill bg-success">Level 3</span>
```

### 6. Alerts
```html
<div class="alert alert-success" role="alert">
  <span class="material-symbols-outlined">check_circle</span>
  Success message!
</div>
```

### 7. Modal
```html
<!-- Button trigger -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Open Modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Modal content
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
```

### 8. Navbar
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Just Go Green</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Communities</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## Utility Classes

### Spacing
```html
<!-- Margin -->
<div class="m-3">Margin all sides</div>
<div class="mt-3">Margin top</div>
<div class="mb-3">Margin bottom</div>
<div class="mx-auto">Margin horizontal auto (center)</div>

<!-- Padding -->
<div class="p-3">Padding all sides</div>
<div class="pt-3">Padding top</div>
<div class="pb-3">Padding bottom</div>
```

### Display
```html
<div class="d-flex">Flexbox</div>
<div class="d-grid">Grid</div>
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>
```

### Flexbox
```html
<div class="d-flex justify-content-between align-items-center">
  <span>Left</span>
  <span>Right</span>
</div>

<div class="d-flex flex-column gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Text
```html
<p class="text-center">Centered text</p>
<p class="text-end">Right-aligned text</p>
<p class="text-muted">Muted text</p>
<p class="fw-bold">Bold text</p>
<p class="fs-4">Font size 4</p>
```

### Colors
```html
<div class="text-primary">Primary text</div>
<div class="bg-success text-white">Success background</div>
<div class="border border-primary">Primary border</div>
```

### Shadows
```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Regular shadow</div>
<div class="shadow-lg">Large shadow</div>
```

### Rounded Corners
```html
<div class="rounded">Rounded corners</div>
<div class="rounded-circle">Circle</div>
<div class="rounded-pill">Pill shape</div>
```

## Responsive Breakpoints

Bootstrap 5 breakpoints:
- `xs` < 576px (default, no prefix)
- `sm` ≥ 576px
- `md` ≥ 768px
- `lg` ≥ 1024px
- `xl` ≥ 1200px
- `xxl` ≥ 1400px

Example:
```html
<div class="col-12 col-md-6 col-lg-4">
  <!-- Full width on mobile, half on tablet, third on desktop -->
</div>
```

## Customization

### Override Bootstrap Variables
Add to `styles.css`:
```css
:root {
  /* Primary color */
  --bs-primary: #3aa479;
  --bs-primary-rgb: 58, 164, 121;
  
  /* Success color */
  --bs-success: #3aa479;
  --bs-success-rgb: 58, 164, 121;
  
  /* Border radius */
  --bs-border-radius: 0.75rem;
  --bs-border-radius-lg: 1rem;
  
  /* Font family */
  --bs-body-font-family: 'Poppins', sans-serif;
}
```

### Custom Button Styles
```css
.btn-green {
  background: linear-gradient(135deg, var(--green-600) 0%, var(--green-700) 100%);
  color: white;
  border: none;
}

.btn-green:hover {
  background: linear-gradient(135deg, var(--green-700) 0%, var(--green-800) 100%);
  color: white;
}
```

## Migration Strategy

### Phase 1: New Components
Use Bootstrap for all new components:
- Forms
- Modals
- Alerts
- Cards

### Phase 2: Existing Components
Gradually update existing components:
1. Replace custom grid with Bootstrap grid
2. Use Bootstrap spacing utilities
3. Adopt Bootstrap form controls
4. Implement Bootstrap cards

### Phase 3: Cleanup
Remove redundant custom CSS that Bootstrap provides

## Best Practices

### 1. Combine with Custom Styles
```html
<div class="card shadow-sm custom-card">
  <!-- Bootstrap classes + custom class -->
</div>
```

### 2. Use Utility Classes
Prefer Bootstrap utilities over custom CSS:
```html
<!-- Good -->
<div class="d-flex justify-content-between align-items-center p-3">

<!-- Avoid -->
<div class="custom-flex-container">
```

### 3. Responsive Design
Use Bootstrap's responsive utilities:
```html
<div class="d-none d-md-block">Desktop only</div>
<div class="d-block d-md-none">Mobile only</div>
```

### 4. Maintain Design System
Keep using CSS variables for colors:
```html
<button class="btn" style="background: var(--green-600)">
  Custom Green Button
</button>
```

## Examples in Just Go Green

### Dashboard Card
```html
<div class="card shadow-sm mb-3">
  <div class="card-body">
    <div class="d-flex align-items-center gap-3">
      <span class="material-symbols-outlined fs-1 text-success">eco</span>
      <div>
        <h5 class="card-title mb-1">Level 3 - Warrior</h5>
        <p class="card-text text-muted mb-0">1,500 XP</p>
      </div>
    </div>
  </div>
</div>
```

### Action Button
```html
<button class="btn btn-success d-flex align-items-center gap-2">
  <span class="material-symbols-outlined">add_circle</span>
  <span>Create Community</span>
</button>
```

### Stats Grid
```html
<div class="row g-3">
  <div class="col-md-6 col-lg-3">
    <div class="card text-center">
      <div class="card-body">
        <span class="material-symbols-outlined fs-1 text-success">groups</span>
        <h3 class="mt-2">5</h3>
        <p class="text-muted mb-0">Communities</p>
      </div>
    </div>
  </div>
  <!-- More stats... -->
</div>
```

## Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)

## Status
✅ Bootstrap 5.3.2 integrated via CDN
✅ Compatible with existing design system
✅ Ready to use in components
