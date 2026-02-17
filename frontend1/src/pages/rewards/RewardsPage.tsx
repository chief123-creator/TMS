import { motion } from 'framer-motion';
import { Trophy, Star, Gift, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import StatCard from '@/components/dashboard/StatCard';

const rewards = [
  { id: '1', title: 'Parking violation resolved', points: 50, amount: 50, date: '12 Feb 2026' },
  { id: '2', title: 'Truck blocking lane fined', points: 100, amount: 100, date: '8 Feb 2026' },
  { id: '3', title: 'Two-wheeler on footpath', points: 30, amount: 30, date: '1 Feb 2026' },
  { id: '4', title: 'Double parking resolved', points: 75, amount: 75, date: '28 Jan 2026' },
];

export default function RewardsPage() {
  return (
    <AppLayout>
      <div className="page-container space-y-7">
        <div>
          <h1 className="page-title">Rewards</h1>
          <p className="page-subtitle">Earn rewards for every valid report</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Trophy} label="Total Earned" value="₹2,450" variant="success" />
          <StatCard icon={Star} label="Reports Rewarded" value={18} />
        </div>

        {/* Reward multiplier */}
        <div className="card-elevated p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-warning" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Trusted Reporter Bonus</p>
            <p className="text-[11px] text-muted-foreground">1.5x reward multiplier active</p>
          </div>
          <span className="text-xs font-bold text-warning bg-warning/10 px-2.5 py-1 rounded-full">1.5x</span>
        </div>

        <div>
          <p className="section-label mb-3">Reward History</p>
          <div className="space-y-2.5">
            {rewards.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -1, transition: { duration: 0.15 } }}
                className="card-elevated p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-success/8 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{r.title}</p>
                  <p className="text-[11px] text-muted-foreground">{r.date} · +{r.points} pts</p>
                </div>
                <span className="text-sm font-bold text-success">+₹{r.amount}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
