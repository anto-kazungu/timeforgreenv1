# Bootstrap 5 Quick Start Guide

## ✅ Bootstrap 5 is Now Available!

Bootstrap 5.3.2 has been added to the Just Go Green application via CDN. You can now use all Bootstrap classes and components.

## Quick Examples

### 1. Responsive Grid
```html
<div class="container">
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">Card 1</div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">Card 2</div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">Card 3</div>
      </div>
    </div>
  </div>
</div>
```

### 2. Button with Icon
```html
<button class="btn btn-success d-flex align-items-center gap-2">
  <span class="material-symbols-outlined">add</span>
  Create Community
</button>
```

### 3. Card Component
```html
<div class="card shadow-sm">
  <div class="card-header bg-success text-white">
    <h5 class="mb-0">Community Name</h5>
  </div>
  <div class="card-body">
    <p class="card-text">Community description goes here.</p>
    <div class="d-flex gap-2">
      <span class="badge bg-success">Active</span>
      <span class="badge bg-secondary">50 members</span>
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-sm btn-outline-success">View Details</button>
  </div>
</div>
```

### 4. Form
```html
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" required>
    <div class="invalid-feedback">Please provide a name.</div>
  </div>
  
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" required>
  </div>
  
  <button type="submit" class="btn btn-success">Submit</button>
</form>
```

### 5. Alert
```html
<div class="alert alert-success d-flex align-items-center" role="alert">
  <span class="material-symbols-outlined me-2">check_circle</span>
  <div>Community created successfully!</div>
</div>
```

### 6. Stats Cards
```html
<div class="row g-3">
  <div class="col-6 col-md-3">
    <div class="card text-center">
      <div class="card-body">
        <span class="material-symbols-outlined fs-1 text-success">groups</span>
        <h3 class="mt-2 mb-0">5</h3>
        <p class="text-muted small mb-0">Communities</p>
      </div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="card text-center">
      <div class="card-body">
        <span class="material-symbols-outlined fs-1 text-success">event</span>
        <h3 class="mt-2 mb-0">12</h3>
        <p class="text-muted small mb-0">Events</p>
      </div>
    </div>
  </div>
</div>
```

### 7. Modal Dialog
```html
<!-- Button -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal">
  Delete Community
</button>

<!-- Modal -->
<div class="modal fade" id="confirmModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Action</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete this community?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
```

## Most Useful Utility Classes

### Spacing
- `m-3` - Margin all sides
- `mt-3` - Margin top
- `mb-3` - Margin bottom
- `p-3` - Padding all sides
- `gap-3` - Gap between flex/grid items

### Display & Flex
- `d-flex` - Flexbox container
- `d-grid` - Grid container
- `justify-content-between` - Space between items
- `align-items-center` - Center items vertically
- `flex-column` - Stack items vertically

### Text
- `text-center` - Center text
- `text-muted` - Gray text
- `fw-bold` - Bold text
- `fs-4` - Font size 4

### Colors
- `text-success` - Green text
- `bg-success` - Green background
- `btn-success` - Green button

### Responsive
- `d-none d-md-block` - Hidden on mobile, visible on tablet+
- `col-12 col-md-6` - Full width on mobile, half on tablet

## Custom Green Theme

Use these classes for the green theme:
```html
<!-- Buttons -->
<button class="btn btn-success">Primary Action</button>
<button class="btn btn-outline-success">Secondary Action</button>

<!-- Badges -->
<span class="badge bg-success">Active</span>

<!-- Alerts -->
<div class="alert alert-success">Success message</div>

<!-- Text -->
<p class="text-success">Green text</p>
```

## Tips

1. **Combine with Material Icons:**
```html
<button class="btn btn-success d-flex align-items-center gap-2">
  <span class="material-symbols-outlined">add</span>
  Add Item
</button>
```

2. **Use Shadow Utilities:**
```html
<div class="card shadow-sm">...</div>
<div class="card shadow">...</div>
<div class="card shadow-lg">...</div>
```

3. **Responsive Spacing:**
```html
<div class="p-2 p-md-3 p-lg-4">
  <!-- Padding increases on larger screens -->
</div>
```

4. **Quick Centering:**
```html
<div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
  <div>Centered content</div>
</div>
```

## Next Steps

1. Start using Bootstrap grid for layouts
2. Replace custom cards with Bootstrap cards
3. Use Bootstrap forms for consistency
4. Implement Bootstrap modals for dialogs
5. Use utility classes instead of custom CSS

## Resources

- Full Documentation: `BOOTSTRAP-INTEGRATION.md`
- Official Docs: https://getbootstrap.com/docs/5.3/
- Examples: https://getbootstrap.com/docs/5.3/examples/

---

**Status:** ✅ Bootstrap 5 is ready to use in all components!
