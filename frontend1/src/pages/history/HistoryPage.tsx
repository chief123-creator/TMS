import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import ComplaintCard from '@/components/complaint/ComplaintCard';
import type { Complaint } from '@/types';

const mockHistory: Complaint[] = [
  { id: '1', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'four_wheeler', location: { lat: 28.6, lng: 77.2 }, status: 'timer_running', actionType: 'official_issue', timerEndAt: new Date(Date.now() + 3600000).toISOString(), createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'two_wheeler', location: { lat: 28.6, lng: 77.2 }, status: 'resolved', actionType: 'direct_call', rewardEarned: 50, createdAt: new Date(Date.now() - 172800000).toISOString(), resolvedAt: new Date(Date.now() - 100000000).toISOString() },
  { id: '3', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'truck', location: { lat: 28.6, lng: 77.2 }, status: 'fine_applied', actionType: 'official_issue', fineAmount: 500, rewardEarned: 100, createdAt: new Date(Date.now() - 500000000).toISOString() },
  { id: '4', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'four_wheeler', location: { lat: 28.6, lng: 77.2 }, status: 'resolved', actionType: 'official_issue', rewardEarned: 75, createdAt: new Date(Date.now() - 700000000).toISOString() },
  { id: '5', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'two_wheeler', location: { lat: 28.6, lng: 77.2 }, status: 'pending', actionType: 'direct_call', createdAt: new Date(Date.now() - 1000000000).toISOString() },
];

const filters = ['All', 'Active', 'Resolved', 'Fined'] as const;

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <AppLayout>
      <div className="page-container space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="page-title">Report History</h1>
            <p className="page-subtitle">All your submitted reports</p>
          </div>
          <span className="text-[11px] font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
            {mockHistory.length} total
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {filters.map((filter, i) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(i)}
              className={i === activeFilter ? 'chip-active' : 'chip-inactive'}
            >
              {filter}
            </button>
          ))}
        </div>

        {mockHistory.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FileText className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="empty-state-title">No reports yet</p>
            <p className="empty-state-desc">Record your first violation report to start earning rewards.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockHistory.map((c, i) => (
              <ComplaintCard key={c.id} complaint={c} index={i} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
