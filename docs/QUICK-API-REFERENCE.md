# 🚀 Quick API Reference

## Backend Endpoint
```
http://localhost:5000/
```

---

## 📦 Import ApiService

```typescript
import { ApiService } from './services/api.service';

constructor(private apiService: ApiService) {}
```

---

## 🔥 Quick Examples

### GET Request
```typescript
this.apiService.get<any[]>('/users').subscribe({
  next: (data) => console.log(data),
  error: (error) => console.error(error)
});
```

### POST Request
```typescript
this.apiService.post('/tree-logs', { treeCount: 5 }).subscribe({
  next: (response) => console.log(response),
  error: (error) => console.error(error)
});
```

### PUT Request
```typescript
this.apiService.put('/users/1', { name: 'John' }).subscribe({
  next: (response) => console.log(response),
  error: (error) => console.error(error)
});
```

### DELETE Request
```typescript
this.apiService.delete('/posts/1').subscribe({
  next: () => console.log('Deleted'),
  error: (error) => console.error(error)
});
```

---

## 🔐 Authentication

### Login
```typescript
this.apiService.post('/auth/login', { email, password }).subscribe({
  next: (response: any) => {
    localStorage.setItem('authToken', response.token);
  }
});
```

### Logout
```typescript
localStorage.removeItem('authToken');
```

---

## 🧪 Test Connection

```typescript
this.apiService.testConnection().subscribe({
  next: (response) => console.log('✅ Connected:', response),
  error: (error) => console.error('❌ Failed:', error)
});
```

---

## 📊 Common Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login user |
| POST | `/auth/register` | Register user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| GET | `/communities` | Get communities |
| POST | `/tree-logs` | Log trees |
| GET | `/events` | Get events |
| GET | `/trainings` | Get trainings |
| GET | `/achievements/user/:id` | Get user achievements |

---

## 🚨 Troubleshooting

### Backend not running?
```bash
cd backend
npm start
```

### CORS error?
Add to backend:
```javascript
app.use(cors({ origin: 'http://localhost:4200' }));
```

### 401 Unauthorized?
Check token:
```typescript
console.log(localStorage.getItem('authToken'));
```

---

**For detailed documentation, see `docs/API-INTEGRATION.md`**
