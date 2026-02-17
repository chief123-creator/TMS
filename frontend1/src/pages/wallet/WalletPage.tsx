import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownLeft, ArrowUpRight, CreditCard, CheckCircle, Clock as ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/AppLayout';
import { useAppStore } from '@/store/useAppStore';

const transactions = [
  { id: '1', type: 'reward' as const, amount: 100, status: 'completed' as const, description: 'Truck violation fine reward', createdAt: '2026-02-12T10:00:00Z' },
  { id: '2', type: 'withdrawal' as const, amount: 500, status: 'completed' as const, description: 'Bank withdrawal', createdAt: '2026-02-10T14:00:00Z' },
  { id: '3', type: 'reward' as const, amount: 50, status: 'completed' as const, description: 'Parking violation reward', createdAt: '2026-02-08T09:00:00Z' },
  { id: '4', type: 'withdrawal' as const, amount: 200, status: 'pending' as const, description: 'UPI withdrawal', createdAt: '2026-02-15T16:00:00Z' },
  { id: '5', type: 'reward' as const, amount: 75, status: 'completed' as const, description: 'Double parking reward', createdAt: '2026-01-28T11:00:00Z' },
];

export default function WalletPage() {
  const walletBalance = useAppStore((s) => s.walletBalance);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  return (
    <AppLayout>
      <div className="page-container space-y-7">
        <div>
          <h1 className="page-title">Wallet</h1>
          <p className="page-subtitle">Manage your earnings and withdrawals</p>
        </div>

        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-primary rounded-2xl p-6"
          style={{ boxShadow: 'var(--shadow-primary)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-primary-foreground/60" />
            <span className="text-primary-foreground/60 text-[11px] font-medium uppercase tracking-widest">Available Balance</span>
          </div>
          <p className="text-4xl font-display font-bold text-primary-foreground leading-none">₹{walletBalance.toLocaleString()}</p>
          <div className="flex gap-3 mt-5">
            <Button size="sm" className="bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border-0 flex-1 h-10">
              <ArrowDownLeft className="w-4 h-4 mr-1.5" /> Withdraw
            </Button>
            <Button size="sm" className="bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border-0 flex-1 h-10">
              <CreditCard className="w-4 h-4 mr-1.5" /> Add UPI
            </Button>
          </div>
        </motion.div>

        {/* Quick withdraw */}
        <div className="card-elevated p-4 space-y-3">
          <p className="text-sm font-semibold">Quick Withdraw</p>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="flex-1 h-11"
            />
            <Button disabled={!withdrawAmount || Number(withdrawAmount) <= 0} className="h-11">Withdraw</Button>
          </div>
          <div className="flex gap-2">
            {[100, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setWithdrawAmount(String(amt))}
                className="chip-inactive flex-1"
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div>
          <p className="section-label mb-3">Transaction History</p>
          <div className="space-y-2.5">
            {transactions.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -1, transition: { duration: 0.15 } }}
                className="card-elevated p-4 flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tx.type === 'reward' ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  {tx.type === 'reward' ? (
                    <ArrowDownLeft className="w-5 h-5 text-success" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{tx.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                    {tx.status === 'pending' ? (
                      <span className="status-pending text-[10px]"><ClockIcon className="w-2.5 h-2.5" />Pending</span>
                    ) : (
                      <span className="status-resolved text-[10px]"><CheckCircle className="w-2.5 h-2.5" />Done</span>
                    )}
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'reward' ? 'text-success' : 'text-destructive'}`}>
                  {tx.type === 'reward' ? '+' : '-'}₹{tx.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
