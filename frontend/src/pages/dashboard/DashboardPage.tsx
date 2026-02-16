import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, FileText, Trophy, AlertCircle, TrendingUp, Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import AppLayout from '@/layouts/AppLayout';
import StatCard from '@/components/dashboard/StatCard';
import PointsMeter from '@/components/dashboard/PointsMeter';
import ComplaintCard from '@/components/complaint/ComplaintCard';
import type { Complaint } from '@/types';

const mockComplaints: Complaint[] = [
  { id: '1', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'four_wheeler', location: { lat: 28.6, lng: 77.2 }, status: 'timer_running', actionType: 'official_issue', timerEndAt: new Date(Date.now() + 3600000).toISOString(), createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'two_wheeler', location: { lat: 28.6, lng: 77.2 }, status: 'resolved', actionType: 'direct_call', rewardEarned: 50, createdAt: new Date(Date.now() - 172800000).toISOString(), resolvedAt: new Date(Date.now() - 100000000).toISOString() },
  { id: '3', reporterId: '1', videoUrl: '', thumbnailUrl: '', vehicleType: 'truck', location: { lat: 28.6, lng: 77.2 }, status: 'fine_applied', actionType: 'official_issue', fineAmount: 500, rewardEarned: 100, createdAt: new Date(Date.now() - 500000000).toISOString() },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <AppLayout>
      <div className="page-container space-y-7">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-muted-foreground text-sm">{greeting},</p>
          <h1 className="page-title mt-0.5">{user?.name || 'Citizen'} 👋</h1>
        </motion.div>

        {/* Quick Report CTA */}
        <motion.button
          onClick={() => navigate('/camera')}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          className="w-full gradient-primary rounded-2xl p-5 flex items-center gap-4 text-left group"
          style={{ boxShadow: 'var(--shadow-primary)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center group-hover:bg-primary-foreground/25 transition-colors">
            <Camera className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-primary-foreground font-display font-bold text-lg leading-tight">Report Violation</p>
            <p className="text-primary-foreground/60 text-sm mt-0.5">Record & submit in 30 seconds</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary-foreground" />
          </div>
        </motion.button>

        {/* Stats Grid */}
        <div>
          <p className="section-label mb-3">Overview</p>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={FileText} label="Total Reports" value={23} trend="+3" />
            <StatCard icon={AlertCircle} label="Active Issues" value={2} variant="warning" />
            <StatCard icon={Trophy} label="Rewards Earned" value="₹2,450" variant="success" />
            <StatCard icon={TrendingUp} label="Success Rate" value="91%" />
          </div>
        </div>

        {/* Trust Score */}
        <div>
          <p className="section-label mb-3">Trust Score</p>
          <PointsMeter points={user?.points || 720} />
        </div>

        {/* Recent Reports */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="section-label">Recent Reports</p>
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')} className="text-xs text-primary font-semibold h-8 px-3">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {mockComplaints.map((c, i) => (
              <ComplaintCard key={c.id} complaint={c} index={i} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
