import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Camera, Clock, Wallet, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/camera', icon: Camera, label: 'Report' },
  { path: '/history', icon: Clock, label: 'History' },
  { path: '/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/settings', icon: User, label: 'Account' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60" style={{ background: 'hsl(var(--card) / 0.85)', backdropFilter: 'blur(16px) saturate(180%)' }}>
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-base tracking-tight">TrafficGuard</span>
          </div>
          <div className="trust-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            Verified
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60" style={{ background: 'hsl(var(--card) / 0.92)', backdropFilter: 'blur(16px) saturate(180%)' }}>
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <div className={`transition-all duration-200 ${isActive ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
                  <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className={`text-[10px] font-semibold transition-colors duration-200 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-px left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {/* Safe area padding for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
