import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: '',
  primary: 'gradient-primary text-primary-foreground',
  success: 'gradient-success text-success-foreground',
  warning: 'gradient-warning text-warning-foreground',
  danger: 'gradient-danger text-destructive-foreground',
};

export default function StatCard({ icon: Icon, label, value, trend, variant = 'default' }: StatCardProps) {
  const isColored = variant !== 'default';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`rounded-xl p-4 border transition-shadow duration-200 ${
        isColored ? 'border-transparent' : 'border-border bg-card'
      } ${variantStyles[variant]}`}
      style={{ boxShadow: isColored ? 'var(--shadow-md)' : 'var(--shadow-sm)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          isColored ? 'bg-white/20' : 'bg-accent'
        }`}>
          <Icon className={`w-[18px] h-[18px] ${isColored ? '' : 'text-primary'}`} />
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isColored ? 'bg-white/20' : 'bg-success/10 text-success'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className={`text-[22px] font-display font-bold leading-none ${isColored ? '' : 'text-foreground'}`}>{value}</p>
      <p className={`text-[11px] mt-1 font-medium ${isColored ? 'opacity-80' : 'text-muted-foreground'}`}>{label}</p>
    </motion.div>
  );
}
