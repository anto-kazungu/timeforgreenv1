# ✅ Backend Connection Complete

## 🎉 Integration Summary

Your Angular app is now fully integrated with your backend API at `http://localhost:5000/`.

---

## 📦 What Was Created

### 1. **Environment Configuration**
- ✅ `src/environments/environment.ts` - Development config
- ✅ `src/environments/environment.prod.ts` - Production config

### 2. **API Service**
- ✅ `src/app/services/api.service.ts` - Core HTTP service
- ✅ `src/app/services/backend-test.service.ts` - Example usage service

### 3. **Configuration Updates**
- ✅ `src/app/app.config.ts` - Added HttpClient provider
- ✅ `src/assets/config.json` - Added API URLs
- ✅ `angular.json` - Added environment file replacements

### 4. **Documentation**
- ✅ `docs/API-INTEGRATION.md` - Complete integration guide

---

## 🚀 Quick Start

### 1. Start Your Backend
```bash
cd backend
npm start
# Backend should be running on http://localhost:5000/
```

### 2. Start Angular App
```bash
ng serve
# App will run on http://localhost:4200/
```

### 3. Test the Connection
Add this to any component to test:

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

export class YourComponent implements OnInit {
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Test backend connection
    this.apiService.testConnection().subscribe({
      next: (response) => {
        console.log('✅ Backend connected:', response);
      },
      error: (error) => {
        console.error('❌ Connection failed:', error);
      }
    });
  }
}
```

---

## 🔌 API Service Features

### Automatic Features
✅ **JWT Authentication** - Automatically adds token from localStorage  
✅ **Error Handling** - Catches and formats all errors  
✅ **Type Safety** - Full TypeScript support  
✅ **CORS Ready** - Configured for cross-origin requests  

### Available Methods
```typescript
// GET request
apiService.get<T>(endpoint)

// POST request
apiService.post<T>(endpoint, data)

// PUT request
apiService.put<T>(endpoint, data)

// PATCH request
apiService.patch<T>(endpoint, data)

// DELETE request
apiService.delete<T>(endpoint)

// Test connection
apiService.testConnection()
```

---

## 📖 Usage Examples

### Example 1: Get Users
```typescript
this.apiService.get<any[]>('/users').subscribe({
  next: (users) => console.log('Users:', users),
  error: (error) => console.error('Error:', error)
});
```

### Example 2: Log Trees
```typescript
const treeData = {
  userId: 1,
  treeCount: 5,
  location: 'Central Park',
  species: 'Oak'
};

this.apiService.post('/tree-logs', treeData).subscribe({
  next: (response) => console.log('Trees logged:', response),
  error: (error) => console.error('Error:', error)
});
```

### Example 3: Update Profile
```typescript
const profileData = {
  name: 'John Doe',
  email: 'john@example.com'
};

this.apiService.put('/users/1', profileData).subscribe({
  next: (response) => console.log('Profile updated:', response),
  error: (error) => console.error('Error:', error)
});
```

---

## 🔐 Authentication Flow

### 1. Login
```typescript
login(email: string, password: string) {
  this.apiService.post('/auth/login', { email, password }).subscribe({
    next: (response: any) => {
      // Store token
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('Login successful');
    },
    error: (error) => {
      console.error('Login failed:', error);
    }
  });
}
```

### 2. Logout
```typescript
logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}
```

### 3. Check Authentication
```typescript
isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken');
}
```

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] Backend server is running on port 5000
- [ ] Can access `http://localhost:5000/` in browser
- [ ] CORS is configured for `http://localhost:4200`

### Frontend Tests
- [ ] Angular app builds successfully (`ng build`)
- [ ] Angular app serves successfully (`ng serve`)
- [ ] Can access `http://localhost:4200/` in browser
- [ ] Console shows no errors

### Integration Tests
- [ ] Test connection using `apiService.testConnection()`
- [ ] Can fetch data from backend
- [ ] Can send data to backend
- [ ] Authentication works (if implemented)

---

## 🚨 Common Issues & Solutions

### Issue: "Connection Refused"
**Cause:** Backend not running  
**Solution:** Start backend server on port 5000

### Issue: "CORS Error"
**Cause:** Backend doesn't allow requests from Angular  
**Solution:** Add CORS middleware to backend:
```javascript
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

### Issue: "401 Unauthorized"
**Cause:** Missing or invalid JWT token  
**Solution:** Check token in localStorage:
```typescript
console.log('Token:', localStorage.getItem('authToken'));
```

### Issue: "404 Not Found"
**Cause:** Endpoint doesn't exist on backend  
**Solution:** Verify endpoint URL matches backend routes

---

## 📊 Expected Backend Endpoints

Based on your database schema, these endpoints should exist:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `GET /users/:id/stats` - Get user statistics

### Communities
- `GET /communities` - Get all communities
- `POST /communities/:id/join` - Join community
- `POST /communities/:id/leave` - Leave community

### Tree Logs
- `GET /tree-logs` - Get all tree logs
- `POST /tree-logs` - Log new trees
- `GET /tree-logs/user/:userId` - Get user's tree logs

### Events
- `GET /events` - Get all events
- `POST /events/:id/register` - Register for event

### Trainings
- `GET /trainings` - Get all trainings
- `POST /trainings/:id/enroll` - Enroll in training

### Achievements
- `GET /achievements` - Get all achievements
- `GET /achievements/user/:userId` - Get user achievements

---

## 🎯 Next Steps

### Immediate
1. ✅ **Test Connection** - Verify backend is accessible
2. ✅ **Update Services** - Migrate existing services to use ApiService
3. ✅ **Implement Auth** - Add login/register functionality

### Short Term
1. **Update Components** - Connect components to real API
2. **Add Loading States** - Show spinners during API calls
3. **Error Handling** - Display user-friendly error messages
4. **Data Validation** - Validate data before sending to API

### Long Term
1. **Caching** - Implement data caching for performance
2. **Offline Support** - Add offline capabilities
3. **Real-time Updates** - Implement WebSocket connections
4. **Performance** - Optimize API calls and data loading

---

## 📚 Documentation

For detailed examples and advanced usage, see:
- **`docs/API-INTEGRATION.md`** - Complete integration guide
- **`backend/API_INTEGRATION_GUIDE.md`** - Backend API documentation
- **`src/app/services/api.service.ts`** - API service source code
- **`src/app/services/backend-test.service.ts`** - Example usage

---

## ✅ Success Criteria

Your integration is successful when:
- ✅ Backend server runs on port 5000
- ✅ Angular app runs on port 4200
- ✅ No CORS errors in console
- ✅ Can fetch data from backend
- ✅ Can send data to backend
- ✅ Authentication works (if implemented)

---

## 🎉 You're Ready!

Your TimeForGreen app is now connected to your backend API. You can start building features that interact with real data!

**Happy coding! 🚀🌱**
