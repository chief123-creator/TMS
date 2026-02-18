import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  aadhaar_number: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    aadhaar_status: 'unverified' | 'pending' | 'verified' | 'rejected';
    account_status: 'active' | 'warned' | 'suspended' | 'banned';
    trust_points: number;
    wallet_balance: number;
    role: string;
    created_at: string;
  };
}

export interface OTPRequest {
  aadhaar_number: string;
}

export interface OTPVerifyRequest {
  aadhaar_number: string;
  otp: string;
}

export const authAPI = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  signup: async (data: SignupRequest) => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  sendOtp: async (data: OTPRequest) => {
    const response = await apiClient.post('/auth/send-otp', data);
    return response.data;
  },

  verifyOtp: async (data: OTPVerifyRequest) => {
    const response = await apiClient.post('/auth/verify-otp', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
};

export const complaintsAPI = {
  submit: async (formData: FormData) => {
    const response = await apiClient.post('/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getComplaints: async (limit = 10, offset = 0, status?: string) => {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    if (status) params.append('status', status);

    const response = await apiClient.get(`/complaints?${params.toString()}`);
    return response.data;
  },

  getComplaint: async (id: string) => {
    const response = await apiClient.get(`/complaints/${id}`);
    return response.data;
  },
};

export const walletAPI = {
  getBalance: async () => {
    const response = await apiClient.get('/wallet/balance');
    return response.data;
  },

  getTransactions: async (limit = 20, offset = 0) => {
    const response = await apiClient.get(`/wallet/transactions?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  withdraw: async (data: { amount: number; method: string; upiId?: string }) => {
    const response = await apiClient.post('/wallet/withdraw', data);
    return response.data;
  },
};

export const rewardsAPI = {
  getRewards: async () => {
    const response = await apiClient.get('/rewards');
    return response.data;
  },
};

export const dashboardAPI = {
  getStats: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },
};

export default apiClient;
