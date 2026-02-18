# Frontend ↔ Backend Connection Status

## 🔗 API Endpoints Connected

### Authentication
- ✅ POST /auth/login → LoginPage.tsx
  - Sends: email, password
  - Returns: access_token, user object
  - Stores: token in localStorage
  - On success: Navigate to /dashboard

- ✅ POST /auth/signup → SignupPage.tsx (step 1)
  - Sends: name, email, phone, password, aadhaar_number
  - Returns: access_token, user object
  - Stores: token + user in localStorage
  - On success: Navigate to /dashboard

- ✅ POST /auth/send-otp → SignupPage.tsx (step 2)
  - Sends: aadhaar_number
  - Returns: message + OTP (for testing)
  
- ✅ POST /auth/verify-otp → SignupPage.tsx (step 2 continued)
  - Sends: aadhaar_number, otp
  - Returns: verified user object

## 📦 Data Flow

```
Frontend (React)
    ↓
useAppStore (Zustand)
    ↓
API Client (src/lib/api.ts)
    ↓
Axios with interceptors
    ↓
Backend (FastAPI)
    ↓
Router (auth.py)
    ↓
Database (SQLite)
```

## 🔐 Authentication Flow

1. User enters credentials in frontend
2. Frontend calls `authAPI.login()` or `authAPI.signup()`
3. API client sends request to backend
4. Backend authenticates and returns JWT token + user
5. Frontend stores token in localStorage
6. All subsequent requests include token in Authorization header
7. Backend validates token before serving requests

## 📍 File Structure

```
Frontend Components:
├── LoginPage.tsx → calls login() from store
├── SignupPage.tsx → calls signup() from store
├── useAppStore.ts → manages auth state + API calls
└── lib/api.ts → axios instance + API methods

Backend Endpoints:
├── app/api/auth.py → /auth/* routes
├── app/api/users.py → /users/* routes
├── app/core/security.py → JWT token management
├── app/models/user.py → User model
├── app/schemas/user.py → Request/Response models
└── app/database.py → Database connection
```

## ✨ Features Implemented

- [x] Login with email/password
- [x] Signup with validation
- [x] JWT token generation and validation
- [x] Password hashing (bcrypt)
- [x] Token storage in localStorage
- [x] Protected routes with auth check
- [x] CORS configuration
- [x] Error handling and display
- [x] Loading states
- [x] Auto-login from localStorage on app start

## 🧪 Test Scenario

```
1. Start backend: python run.py
2. Start frontend: bun run dev
3. Go to /signup
4. Fill form:
   - Name: John Doe
   - Email: john@test.com
   - Phone: +91 9876543210
   - Password: password123
   - Aadhaar: 123456789012
   - OTP: 123456
5. Click "Verify & Create Account"
6. Redirected to /dashboard (authenticated)
7. Logout and test /login
8. Login with john@test.com / password123
9. Redirected to /dashboard again
10. Refresh page - stays logged in (from localStorage)
```

## 🚫 Error Handling

- Email already registered → Error message displayed
- Phone already registered → Error message displayed
- Invalid password → Error message displayed
- Network error → Error message displayed
- Expired token → Redirect to /login + clear localStorage

## 🔄 API Response Format

All responses follow this format:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@test.com",
    "phone": "+91 9876543210",
    "aadhaar_status": "verified",
    "account_status": "active",
    "trust_points": 100,
    "wallet_balance": 0.0,
    "role": "user",
    "created_at": "2026-02-17T10:00:00"
  }
}
```

## 🎯 Next Steps

1. ✅ Login/Signup working
2. ⏳ Test with actual credentials
3. ⏳ Add complaints endpoints
4. ⏳ Add wallet endpoints
5. ⏳ Add rewards endpoints
6. ⏳ Add video upload endpoints
