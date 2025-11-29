# API Integration Guide

## 🔌 Backend Connection Setup

The TimeForGreen Angular app is now connected to your backend API at `http://localhost:5000/`.

---

## 📁 Configuration Files

### Environment Files
**Development:** `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  apiEndpoint: 'http://localhost:5000/api'
};
```

**Production:** `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com',
  apiEndpoint: 'https://your-production-api.com/api'
};
```

### Config JSON
**File:** `src/assets/config.json`
```json
{
  "apiUrl": "http://localhost:5000",
  "apiEndpoint": "http://localhost:5000/api",
  "newsApiUrl": "",
  "newsApiKey": ""
}
```

---

## 🛠️ API Service

### Core Service: `ApiService`
**Location:** `src/app/services/api.service.ts`

The `ApiService` provides a centralized way to communicate with your backend.

### Features
✅ **Automatic Authentication** - Adds JWT token from localStorage  
✅ **Error Handling** - Catches and formats errors  
✅ **Type Safety** - Full TypeScript support  
✅ **HTTP Methods** - GET, POST, PUT, PATCH, DELETE  

---

## 📖 Usage Examples

### 1. Basic GET Request
```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit {
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Get all users
    this.apiService.get<any[]>('/users').subscribe({
      next: (users) => {
        console.log('Users:', users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
```

### 2. POST Request (Create Data)
```typescript
// Log a tree
logTree() {
  const treeData = {
    userId: 1,
    treeCount: 5,
    location: 'Central Park',
    species: 'Oak'
  };

  this.apiService.post('/tree-logs', treeData).subscribe({
    next: (response) => {
      console.log('Tree logged successfully:', response);
    },
    error: (error) => {
      console.error('Error logging tree:', error);
    }
  });
}
```

### 3. PUT Request (Update Data)
```typescript
// Update user profile
updateProfile() {
  const profileData = {
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Environmental enthusiast'
  };

  this.apiService.put('/users/1', profileData).subscribe({
    next: (response) => {
      console.log('Profile updated:', response);
    },
    error: (error) => {
      console.error('Error updating profile:', error);
    }
  });
}
```

### 4. DELETE Request
```typescript
// Delete a community post
deletePost(postId: number) {
  this.apiService.delete(`/posts/${postId}`).subscribe({
    next: () => {
      console.log('Post deleted successfully');
    },
    error: (error) => {
      console.error('Error deleting post:', error);
    }
  });
}
```

### 5. Test Backend Connection
```typescript
// Test if backend is running
testConnection() {
  this.apiService.testConnection().subscribe({
    next: (response) => {
      console.log('Backend connected:', response);
    },
    error: (error) => {
      console.error('Backend connection failed:', error);
    }
  });
}
```

---

## 🔐 Authentication

### Storing JWT Token
```typescript
// After successful login
login(email: string, password: string) {
  this.apiService.post('/auth/login', { email, password }).subscribe({
    next: (response: any) => {
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      console.log('Login successful');
    },
    error: (error) => {
      console.error('Login failed:', error);
    }
  });
}
```

### Logout
```typescript
logout() {
  // Remove token from localStorage
  localStorage.removeItem('authToken');
  console.log('Logged out');
}
```

### Check Authentication
```typescript
isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken');
}
```

---

## 🔄 Updating Existing Services

### Example: Update AuthService
```typescript
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apiService: ApiService) {}

  login(email: string, password: string): Observable<any> {
    return this.apiService.post('/auth/login', { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.apiService.post('/auth/register', userData);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
```

---

## 📊 Common API Endpoints

Based on your database schema, here are typical endpoints:

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /users/:id/stats` - Get user statistics

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user

### Communities
- `GET /communities` - Get all communities
- `GET /communities/:id` - Get community by ID
- `POST /communities` - Create community
- `PUT /communities/:id` - Update community
- `POST /communities/:id/join` - Join community
- `POST /communities/:id/leave` - Leave community

### Tree Logs
- `GET /tree-logs` - Get all tree logs
- `GET /tree-logs/:id` - Get tree log by ID
- `POST /tree-logs` - Log new trees
- `GET /tree-logs/user/:userId` - Get user's tree logs
- `GET /tree-logs/verify/:code` - Verify tree code

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /events` - Create event
- `PUT /events/:id` - Update event
- `POST /events/:id/register` - Register for event

### Trainings
- `GET /trainings` - Get all trainings
- `GET /trainings/:id` - Get training by ID
- `POST /trainings/:id/enroll` - Enroll in training
- `PUT /trainings/:trainingId/progress` - Update progress

### Achievements
- `GET /achievements` - Get all achievements
- `GET /achievements/user/:userId` - Get user achievements

---

## 🧪 Testing the Connection

### 1. Test Backend is Running
```bash
# In your terminal
curl http://localhost:5000/
```

### 2. Test from Angular Component
```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  template: '<h1>Testing Backend Connection...</h1>'
})
export class AppComponent implements OnInit {
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.testConnection().subscribe({
      next: (response) => {
        console.log('✅ Backend connected successfully:', response);
      },
      error: (error) => {
        console.error('❌ Backend connection failed:', error);
      }
    });
  }
}
```

---

## 🚨 CORS Configuration

If you encounter CORS errors, add this to your backend:

### Express.js Example
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

### Node.js with Custom Headers
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
```

---

## 🔧 Troubleshooting

### Issue: "Connection Refused"
**Solution:** Make sure your backend is running on port 5000
```bash
# Check if backend is running
curl http://localhost:5000/
```

### Issue: "CORS Error"
**Solution:** Add CORS middleware to your backend (see above)

### Issue: "401 Unauthorized"
**Solution:** Check if JWT token is being sent correctly
```typescript
// Check token in console
console.log('Token:', localStorage.getItem('authToken'));
```

### Issue: "404 Not Found"
**Solution:** Verify the endpoint URL matches your backend routes
```typescript
// Check the full URL being called
console.log('API URL:', environment.apiEndpoint + '/your-endpoint');
```

---

## 📝 Next Steps

1. **Start your backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start Angular dev server:**
   ```bash
   ng serve
   ```

3. **Update existing services** to use `ApiService`

4. **Implement authentication** flow

5. **Test all API endpoints** with real data

---

## ✅ Quick Checklist

- [x] Environment files created
- [x] ApiService implemented
- [x] HttpClient configured in app.config
- [x] Config.json updated with API URL
- [x] Angular.json configured for environment replacement
- [ ] Backend server running on port 5000
- [ ] CORS configured on backend
- [ ] Test connection successful
- [ ] Update existing services to use ApiService
- [ ] Implement authentication flow

---

**Your Angular app is now ready to communicate with your backend at `http://localhost:5000/`!** 🚀
