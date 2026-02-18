# 📚 Complete Frontend-Backend Integration Guide

## ✅ Done - Login & Signup Wired Up

Your frontend and backend are now fully connected for authentication!

---

## 📋 What Was Done

### Backend Setup
1. ✅ **FastAPI Server** - Configured with CORS
2. ✅ **Database** - SQLite with SQLAlchemy ORM
3. ✅ **User Model** - With password hashing & JWT fields
4. ✅ **Auth Endpoints**:
   - `POST /auth/login` - Email + password → JWT token
   - `POST /auth/signup` - Create new user account
   - `POST /auth/send-otp` - Send OTP to Aadhaar
   - `POST /auth/verify-otp` - Verify Aadhaar with OTP
5. ✅ **User Endpoints**:
   - `GET /users/me` - Get authenticated user profile
   - `PUT /users/me` - Update user profile
6. ✅ **Security**:
   - JWT token authentication
   - Bcrypt password hashing
   - Token expiry (24 hours)
   - Protected routes with dependency injection

### Frontend Setup
1. ✅ **API Client** - Axios with interceptors (`lib/api.ts`)
2. ✅ **State Management** - Zustand store with API integration
3. ✅ **Login Page** - Connected to backend login endpoint
4. ✅ **Signup Page** - Connected to backend signup + OTP
5. ✅ **Auth Middleware** - Protected routes that require login
6. ✅ **Token Management** - localStorage persistence
7. ✅ **Error Handling** - User-friendly error messages
8. ✅ **Auto-login** - Restores user from localStorage on app load

---

## 🔌 Connection Architecture

```
User in Browser
      ↓
   LoginPage.tsx / SignupPage.tsx
      ↓ (calls)
   useAppStore.ts (auth logic)
      ↓ (calls)
   lib/api.ts (axios)
      ↓ (HTTP request)
   http://localhost:8000
      ↓
   Backend FastAPI
      ↓
   app/api/auth.py (routes)
      ↓
   app/core/security.py (JWT, password)
      ↓
   SQLAlchemy ORM
      ↓
   SQLite Database (tms.db)
```

---

## 🚀 How to Run

### Prerequisites
- Python 3.11+ installed
- Node.js/Bun installed
- Virtual environment activated (`.venv`)

### Start Backend
```powershell
# PowerShell
cd E:\TMS\backend
python run.py

# Output should show:
# INFO:     Uvicorn running on http://0.0.0.0:8000
```

Visit http://localhost:8000/docs to see interactive API docs.

### Start Frontend
```powershell
# PowerShell
cd E:\TMS\frontend1
bun run dev

# Output should show:
# VITE v... ready in ... ms
# ➜  Local:   http://localhost:5173/
```

Visit http://localhost:5173 to access the app.

---

## 🧪 Test Workflow

### Create New Account
1. Visit http://localhost:5173
2. Click **"Sign Up"**
3. Fill form:
   ```
   Name: Test User
   Email: test@example.com
   Phone: +91 9876543210
   Password: password123
   ```
4. Click **Continue**
5. Fill Aadhaar info:
   ```
   Aadhaar: 123456789012
   ```
6. Click **Send OTP**
7. Enter any 6 digits (e.g., `123456`)
8. Click **Verify & Create Account**
9. ✅ Redirected to /dashboard

### Login with Existing Account
1. Visit http://localhost:5173/login
2. Fill form:
   ```
   Email: test@example.com
   Password: password123
   ```
3. Click **Sign In**
4. ✅ Redirected to /dashboard

### Logout
1. Click **Settings** (bottom nav)
2. Click **Sign Out** button
3. ✅ Redirected to /login
4. All local data cleared

### Verify Persistence (Stay Logged In)
1. Login with credentials
2. Go to /dashboard
3. Press **F5** to refresh page
4. ✅ Still logged in (data from localStorage)

---

## 📊 Data Flow - Login Request

```json
FRONTEND REQUEST:
{
  "method": "POST",
  "url": "http://localhost:8000/auth/login",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "email": "test@example.com",
    "password": "password123"
  }
}

↓ BACKEND PROCESSES ↓

BACKEND RESPONSE:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "aadhaar_status": "unverified",
    "account_status": "active",
    "trust_points": 100,
    "wallet_balance": 0.0,
    "role": "user",
    "created_at": "2026-02-17T10:30:00"
  }
}

↓ FRONTEND STORES ↓

localStorage:
- access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
- user: { id, name, email, phone, ... }

Zustand Store:
- isAuthenticated: true
- user: { ... }
```

---

## 🔐 Authentication Flow

### Login Process
```
1. User enters email + password in LoginPage
2. Form submitted → handleLogin()
3. login() called from useAppStore
4. API request sent to POST /auth/login
5. Backend validates credentials with bcrypt
6. If valid → Generate JWT token + return user
7. If invalid → Return 401 Unauthorized
8. Frontend stores token in localStorage
9. Update state: isAuthenticated = true
10. Redirect to /dashboard
11. ProtectedRoute checks isAuthenticated ✅
```

### Protected Route Access
```
1. User tries to access /dashboard
2. ProtectedRoute component checks isAuthenticated
3. If true → Render page component
4. If false → Redirect to /login
```

### Automatic Token Inclusion
```
1. All requests go through axios interceptor
2. Interceptor reads token from localStorage
3. Adds to header: Authorization: Bearer <token>
4. Backend validates token before processing
5. If expired → Return 401 → Clear localStorage → Redirect to login
```

---

## 📁 File Overview

### Frontend Files

**`src/lib/api.ts`** - All API communication
```typescript
- authAPI.login()      // POST /auth/login
- authAPI.signup()     // POST /auth/signup
- authAPI.sendOtp()    // POST /auth/send-otp
- authAPI.verifyOtp()  // POST /auth/verify-otp
- authAPI.getCurrentUser() // GET /users/me
- authAPI.logout()     // Clear localStorage
```

**`src/store/useAppStore.ts`** - State management
```typescript
- login(email, password)       // Call API + store token
- signup(details)              // Call API + store token
- logout()                     // Clear all data
- setUser()                    // Update user info
- isAuthenticated              // Boolean flag
- isLoading                    // Loading state
- error                        // Error messages
```

**`src/pages/auth/LoginPage.tsx`** - Login form
```typescript
- Form inputs: email, password
- Calls: store.login()
- Shows: error messages, loading state
- Redirects: /dashboard on success
```

**`src/pages/auth/SignupPage.tsx`** - Signup form
```typescript
- Step 1: Personal details
- Step 2: Aadhaar + OTP
- Calls: store.signup()
- Shows: error messages, loading state
- Redirects: /dashboard on success
```

**`src/App.tsx`** - App setup
```typescript
- ProtectedRoute: checks isAuthenticated
- AppInitializer: loads user from localStorage
- Routes: all page routes
- Query client & providers
```

### Backend Files

**`app/api/auth.py`** - Auth endpoints
```python
POST /auth/signup   → Create user account
POST /auth/login    → Login & get token
POST /auth/send-otp → Send OTP to Aadhaar
POST /auth/verify-otp → Verify OTP
```

**`app/api/users.py`** - User endpoints
```python
GET /users/me   → Get current user
PUT /users/me   → Update user profile
```

**`app/core/security.py`** - Security utilities
```python
- verify_password()      → Check password hash
- get_password_hash()    → Hash password
- create_access_token()  → Generate JWT
- decode_token()         → Validate JWT
```

**`app/models/user.py`** - User database model
```python
- User table with all fields
- AadhaarStatus enum
- AccountStatus enum
```

**`app/schemas/user.py`** - Request/response models
```python
- UserCreate   → Signup request structure
- UserLogin    → Login request structure
- UserOut      → User response structure
- Token        → Auth response structure
- OTPRequest   → OTP request
- OTPVerify    → OTP verification
```

**`app/config.py`** - Configuration
```python
- DATABASE_URL    → SQLite path
- JWT_SECRET_KEY  → Secret for tokens
- FRONTEND_URL    → For CORS
- Token expiry    → 24 hours
```

**`app/database.py`** - Database setup
```python
- create_engine()  → SQLite connection
- SessionLocal()   → DB sessions
- get_db()         → Dependency for routes
```

---

## 🔧 Configuration

### Backend Config (`app/config.py`)
```python
DATABASE_URL = "sqlite:///./tms.db"
JWT_SECRET_KEY = "your-secret-key-change-in-production-min-32-chars-long!"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours
FRONTEND_URL = "http://localhost:5173"
```

### CORS Setup (`app/main.py`)
```python
allow_origins=[
    "http://localhost:5173",
    "http://localhost:3000",
]
allow_credentials=True
allow_methods=["*"]
allow_headers=["*"]
```

---

## ⚠️ Important Notes

### ✋ What's NOT Real (Stubbed)
- OTP sending (doesn't send actual SMS/email)
- Aadhaar verification (accepts any 12 digits)
- OTP verification (accepts any 6 digits)
- Video upload (not yet implemented)
- Complaint submission (not yet implemented)

### ✅ What IS Real
- User registration validation
- Email/phone uniqueness checks
- Password hashing (bcrypt)
- JWT token generation & validation
- Database storage (SQLite)
- Authentication & authorization
- CORS & security headers

### 🔒 Security Measures
- Passwords hashed with bcrypt (never stored plain)
- JWT tokens with 24-hour expiry
- Token stored in HTTP-only recommended (currently localStorage for simplicity)
- CORS restricted to frontend domain
- Password validation on signup
- Unique email/phone enforcement

---

## 🐛 Troubleshooting

### Error: "Backend not responding"
```
Solution:
1. Check backend is running: python run.py
2. Check URL is correct: http://localhost:8000
3. Check CORS is enabled: look at app/main.py
4. Try http://localhost:8000/docs in browser
```

### Error: "Invalid email or password"
```
Solution:
1. Make sure account exists (check signup)
2. Double-check password (case-sensitive)
3. Try creating new account instead
```

### Error: "Email already registered"
```
Solution:
1. This account already exists
2. Try logging in instead
3. Use different email for new account
```

### Logging in but immediately redirect to login
```
Solution:
1. Token may be invalid
2. Clear localStorage: DevTools → Storage → Clear
3. Try logging in again
4. Check backend is running
```

### CORS error in console
```
Solution:
1. Backend CORS not configured
2. Check app/main.py includes frontend URL
3. Check FRONTEND_URL in config.py
4. Restart backend after changing config
```

---

## 🎯 Next Steps

The login/signup is working! Next to implement:

1. **Complaints API**
   - Video upload with Complaint
   - GET /complaints (list user's complaints)
   - GET /complaints/{id} (single complaint)

2. **Dashboard Stats**
   - GET /dashboard/stats
   - Real data from database

3. **Wallet**
   - GET /wallet/balance
   - POST /wallet/withdraw
   - GET /wallet/transactions

4. **Rewards**
   - GET /rewards
   - Real reward calculation logic

5. **Advanced Features**
   - Real OTP SMS integration
   - Real Aadhaar verification
   - Video processing
   - Admin dashboard
   - Analytics

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start backend | `cd E:\TMS\backend && python run.py` |
| Start frontend | `cd E:\TMS\frontend1 && bun run dev` |
| View API docs | http://localhost:8000/docs |
| Access app | http://localhost:5173 |
| Clear database | Delete `E:\TMS\backend\tms.db` |
| Check env vars | `E:\TMS\backend\.env` |
| Install deps | `pip install -r requirements.txt` |

---

## 📝 Summary

✅ **Backend**: FastAPI server listening on `:8000` with auth endpoints
✅ **Frontend**: React app on `:5173` with login/signup forms
✅ **Connection**: API calls working with error handling
✅ **Database**: SQLite auto-created with user table
✅ **Security**: JWT tokens, password hashing, CORS configured
✅ **Ready**: Test login/signup functionality

🎉 **You're all set! Test it out:**
1. Start backend
2. Start frontend
3. Go to http://localhost:5173
4. Create account → See dashboard
