import { create } from 'zustand';
import type { User, Complaint, VideoMetadata, WalletTransaction } from '@/types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;

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
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false, complaints: [], walletBalance: 0, transactions: [] }),
  updateUser: (partial) => set((state) => ({ user: state.user ? { ...state.user, ...partial } : null })),

  // Video
  currentVideo: null,
  setCurrentVideo: (video) => set({ currentVideo: video }),

  // Complaints
  complaints: [],
  setComplaints: (complaints) => set({ complaints }),
  addComplaint: (complaint) => set((state) => ({ complaints: [complaint, ...state.complaints] })),

  // Wallet
  walletBalance: 2450,
  transactions: [],
  setWalletBalance: (balance) => set({ walletBalance: balance }),
  setTransactions: (transactions) => set({ transactions }),
}));
