import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Bell, LogOut, ChevronRight, Star, FileText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout';
import { useAppStore } from '@/store/useAppStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: User, label: 'Edit Profile', desc: 'Name, email, phone' },
    { icon: Shield, label: 'Verification Status', desc: user?.aadhaarVerified === 'verified' ? 'Aadhaar Verified' : 'Pending Verification' },
    { icon: Star, label: 'My Rewards', desc: 'View earned rewards', onClick: () => navigate('/rewards') },
    { icon: Bell, label: 'Notifications', desc: 'Manage preferences' },
    { icon: FileText, label: 'Terms & Privacy', desc: 'Legal information' },
  ];

  return (
    <AppLayout>
      <div className="page-container space-y-6">
        <div>
          <h1 className="page-title">Account</h1>
          <p className="page-subtitle">Manage your profile and preferences</p>
        </div>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-5 flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-display font-bold text-xl">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-lg leading-tight">{user?.name || 'User'}</p>
            <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="trust-badge">
                <ShieldCheck className="w-3 h-3" /> Aadhaar Verified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Points summary */}
        <div className="card-elevated p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Trust Score</p>
              <p className="text-[11px] text-muted-foreground">Trusted Reporter Level</p>
            </div>
          </div>
          <span className="text-xl font-display font-bold text-primary">{user?.points || 720}</span>
        </div>

        {/* Menu */}
        <div className="space-y-0.5">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-accent/60 active:bg-accent transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <item.icon className="w-[18px] h-[18px] text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </motion.button>
          ))}
        </div>

        <Button variant="outline" onClick={handleLogout} className="w-full h-11 text-destructive border-destructive/20 hover:bg-destructive/5">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>
    </AppLayout>
  );
}
