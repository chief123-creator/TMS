# TMS - Frontend & Backend Connection Setup

## ✅ What's Ready

### Backend
- ✅ FastAPI setup with CORS configured
- ✅ Authentication endpoints (login, signup, send-otp, verify-otp)
- ✅ User profile endpoints (GET /users/me, PUT /users/me)
- ✅ Database models and schemas
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ SQLite database configured

### Frontend
- ✅ API client with axios
- ✅ Zustand store with real API calls
- ✅ Login page wired to backend
- ✅ Signup page wired to backend
- ✅ Auth token management (localStorage)
- ✅ Protected routes
- ✅ Auto user initialization from localStorage

## 🚀 How to Run

### Backend
```bash
# Navigate to backend directory
cd e:\TMS\backend

# Activate virtual environment (if not already)
.\.venv\Scripts\activate

# Install dependencies (already done)
pip install -r requirements.txt

# Run the server
python run.py
# Server runs on http://localhost:8000
# API docs available at http://localhost:8000/docs
```

### Frontend
```bash
# Navigate to frontend directory
cd e:\TMS\frontend1

# Install dependencies (if not already)
bun install
# or npm install

# Start dev server
bun run dev
# Frontend runs on http://localhost:5173
```

## 🔌 API Connection Details

- Backend URL: `http://localhost:8000`
- Frontend URL: `http://localhost:5173`
- CORS properly configured in both directions
- Authentication via Bearer tokens in Authorization header
- User data persisted in localStorage

## 📝 Testing Login & Signup

### Create a test account:
1. Go to http://localhost:5173/signup
2. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 98765 43210
   - Password: password123
3. Aadhaar verification (stub - any 12 digits work)
4. OTP (stub - any 6 digits work)
5. Account created and logged in automatically

### Login with created account:
1. Go to http://localhost:5173/login
2. Use email: test@example.com
3. Use password: password123
4. Redirects to dashboard

## 📦 Database

- SQLite database: `tms.db` (auto-created)
- Tables auto-created on first run
- User model includes: name, email, phone, password hash, aadhaar, points, wallet balance

## 🔐 Security Notes

- JWT tokens stored in localStorage
- Password hashed with bcrypt
- Token expires in 24 hours
- Change JWT_SECRET_KEY in production
- CORS restricted to frontend URL in production

## ❌ What's Stubbed (Not Real)

- OTP sending (doesn't send actual SMS/email)
- Aadhaar verification (auto-verifies any 12-digit number)
- Video upload (not yet implemented)
- Complaint submission (not yet implemented)
- Wallet/Rewards endpoints (structure ready, logic pending)

## 🔧 Next Steps

1. ✅ Test login/signup flow
2. Implement complaints API
3. Implement wallet/rewards
4. Implement video upload
5. Add real OTP integration
6. Add real Aadhaar verification
