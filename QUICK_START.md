# 🚀 Quick Start - Frontend & Backend Integration

## ⚡ In 5 Minutes

### Terminal 1: Start Backend
```powershell
cd E:\TMS\backend
python run.py
# Wait for: INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Terminal 2: Start Frontend  
```powershell
cd E:\TMS\frontend1
bun run dev
# Wait for: VITE v... ready in ... ms
# Click: http://localhost:5173
```

### Browser: Test Login/Signup
1. Go to http://localhost:5173
2. Click "Sign Up"
3. Fill form with any data:
   ```
   Name: Test User
   Email: test@example.com
   Phone: +91 9876543210
   Password: password123
   Aadhaar: 123456789012
   OTP: 123456
   ```
4. Click "Verify & Create Account"
5. ✅ You're on Dashboard!

## 🔄 What's Wired

| Component | File | Status |
|-----------|------|--------|
| Frontend Login | `LoginPage.tsx` | ✅ Connected |
| Frontend Signup | `SignupPage.tsx` | ✅ Connected |
| Auth Store | `useAppStore.ts` | ✅ Connected |
| API Client | `lib/api.ts` | ✅ Connected |
| Backend Auth | `app/api/auth.py` | ✅ Ready |
| Database | `tms.db` | ✅ Auto-created |
| CORS | `app/main.py` | ✅ Configured |

## 🧪 Test Cases

### Case 1: Create Account
```
Signup → New email → Aadhaar → OTP → Dashboard ✅
```

### Case 2: Login
```
Login → Correct credentials → Dashboard ✅
```

### Case 3: Wrong Password
```
Login → Wrong password → Error message ✅
```

### Case 4: Duplicate Email
```
Signup → Existing email → Error message ✅
```

### Case 5: Refresh Dashboard
```
Dashboard → F5 → Still logged in (localStorage) ✅
```

### Case 6: Logout & Login
```
Settings → Logout → Redirect /login → Login again ✅
```

## 📊 Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React)                 │
│  - LoginPage.tsx                        │
│  - SignupPage.tsx                       │
│  - useAppStore.ts (Zustand)            │
│  - lib/api.ts (Axios)                  │
└────────────┬────────────────────────────┘
             │ HTTP/JSON
             ↓
┌─────────────────────────────────────────┐
│       Backend (FastAPI)                  │
│  - auth.py (POST /auth/login,signup)    │
│  - users.py (GET /users/me)             │
│  - security.py (JWT)                    │
│  - database.py (SQLAlchemy)             │
└────────────┬────────────────────────────┘
             │ ORM
             ↓
┌─────────────────────────────────────────┐
│    Database (SQLite)                     │
│  - users table                          │
│  - otps table                           │
│  - complaints table                     │
│  - transactions table                   │
└─────────────────────────────────────────┘
```

## 🔐 Data Flow Example: Login

```
1. User enters: email=test@example.com, password=password123
   ↓
2. LoginPage calls: login('email', 'password')
   ↓
3. useAppStore calls: authAPI.login({email, password})
   ↓
4. API client (axios) sends: POST /auth/login
   ↓
5. Backend receives request in auth.py
   ↓
6. Validates email + password with bcrypt
   ↓
7. Generates JWT token
   ↓
8. Returns: {access_token, token_type, user}
   ↓
9. Frontend stores: localStorage.setItem('access_token', token)
   ↓
10. Store updates state: isAuthenticated=true, user=data
    ↓
11. App redirects to /dashboard
    ↓
12. ProtectedRoute checks isAuthenticated ✅ Allows access
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Zustand, Axios, TailwindCSS
- **Backend**: FastAPI, SQLAlchemy, SQLite, JWT, Bcrypt
- **Communication**: REST API, JSON, CORS
- **Storage**: localStorage (frontend), SQLite (backend)

## 📁 Key Files

### Frontend
```
src/
├── pages/auth/
│   ├── LoginPage.tsx      ← User login form
│   └── SignupPage.tsx     ← User registration
├── lib/
│   └── api.ts             ← All API calls
├── store/
│   └── useAppStore.ts     ← State management + auth logic
└── App.tsx                ← Routes + middlewares
```

### Backend
```
app/
├── api/
│   ├── auth.py            ← Login, signup, OTP endpoints
│   ├── users.py           ← User profile endpoints
│   ├── deps.py            ← Dependency injection
│   └── complaints.py      ← Complaint endpoints
├── core/
│   └── security.py        ← JWT, password hashing
├── models/
│   └── user.py            ← User model
├── schemas/
│   └── user.py            ← Request/response models
├── config.py              ← Settings
├── database.py            ← DB connection
└── main.py                ← App setup
```

## ✨ Features Ready to Go

- ✅ User registration with email validation
- ✅ User login with password verification
- ✅ JWT token generation (24hr expiry)
- ✅ Automatic token refresh in requests
- ✅ Protected routes (require authentication)
- ✅ Error handling and display
- ✅ Loading states
- ✅ Persistent login (localStorage)
- ✅ Logout functionality
- ✅ CORS configuration

## 🐛 Debugging

### Backend not starting?
```bash
cd E:\TMS\backend
python -c "from app.main import app; print('Import OK')"
```

### Frontend can't connect to backend?
```
Check: http://localhost:8000/docs
If works: Backend is running
If 404: Backend not running
```

### CORS error in browser console?
```
Usually means backend CORS not configured
Check: app/main.py has correct FRONTEND_URL
```

### Token not working?
```
1. Check localStorage: DevTools → Application → Local Storage
2. Check token format: Should start with eyJ...
3. Check expiry: Token valid for 24 hours
```

## 🎯 Next Phase Tasks

1. ⏳ Implement complaints submission with video
2. ⏳ Implement wallet endpoints
3. ⏳ Implement rewards system
4. ⏳ Real Aadhaar verification
5. ⏳ Real OTP SMS integration
6. ⏳ Dashboard stats from database
7. ⏳ History page with real data
