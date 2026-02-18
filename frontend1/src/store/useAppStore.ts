import { create } from 'zustand';
import { authAPI } from '@/lib/api';
import type { User, Complaint, VideoMetadata, WalletTransaction } from '@/types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, aadhaar: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  updateUser: (partial: Partial<User>) => void;
  clearError: () => void;

  // Video
  currentVideo: VideoMetadata | null;
  setCurrentVideo: (video: VideoMetadata | null) => void;

  // Complaints
  complaints: Complaint[];
  setComplaints: (complaints: Complaint[]) => void;
  addComplaint: (complaint: Complaint) => void;

  // Wallet
  walletBalance: number;
  transactions: WalletTransaction[];
  setWalletBalance: (balance: number) => void;
  setTransactions: (transactions: WalletTransaction[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      set({
        user: response.user as User,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Login failed';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  signup: async (name: string, email: string, phone: string, aadhaar: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.signup({ name, email, phone, aadhaar_number: aadhaar, password });
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));

      set({
        user: response.user as User,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Signup failed';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  logout: () => {
    authAPI.logout();
    set({
      user: null,
      isAuthenticated: false,
      complaints: [],
      walletBalance: 0,
      transactions: [],
      error: null,
    });
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  updateUser: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),

  clearError: () => set({ error: null }),

  // Video
  currentVideo: null,
  setCurrentVideo: (video) => set({ currentVideo: video }),

  // Complaints
  complaints: [],
  setComplaints: (complaints) => set({ complaints }),
  addComplaint: (complaint) => set((state) => ({ complaints: [complaint, ...state.complaints] })),

  // Wallet
  walletBalance: 0,
  transactions: [],
  setWalletBalance: (balance) => set({ walletBalance: balance }),
  setTransactions: (transactions) => set({ transactions }),
}));
