export type UserRole = 'reporter' | 'vehicle_owner' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type VehicleType = 'two_wheeler' | 'four_wheeler' | 'truck';

export type ComplaintStatus = 'pending' | 'timer_running' | 'resolved' | 'fine_applied';

export type AccountStatus = 'active' | 'warned' | 'suspended' | 'banned';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  aadhaar_status?: VerificationStatus;
  aadhaarVerified?: VerificationStatus;
  account_status?: AccountStatus;
  accountStatus?: AccountStatus;
  trust_points?: number;
  points?: number;
  wallet_balance?: number;
  role?: string;
  created_at?: string;
  createdAt?: string;
  avatar?: string;
}

export interface VideoMetadata {
  latitude: number;
  longitude: number;
  timestamp: string;
  duration: number;
  vehicleType: VehicleType;
  videoBlob?: Blob;
  thumbnailUrl?: string;
}

export interface Complaint {
  id: string;
  reporterId: string;
  videoUrl: string;
  thumbnailUrl: string;
  vehicleType: VehicleType;
  location: { lat: number; lng: number };
  status: ComplaintStatus;
  actionType: 'direct_call' | 'official_issue';
  timerEndAt?: string;
  fineAmount?: number;
  rewardEarned?: number;
  createdAt: string;
  resolvedAt?: string;
}

export interface WalletTransaction {
  id: string;
  type: 'reward' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  createdAt: string;
}

export interface GuidelineItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  checked: boolean;
}
