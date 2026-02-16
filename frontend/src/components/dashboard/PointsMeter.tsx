import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface PointsMeterProps {
  points: number;
  maxPoints?: number;
}

export default function PointsMeter({ points, maxPoints = 1000 }: PointsMeterProps) {
  const percentage = Math.min((points / maxPoints) * 100, 100);
  const getLevel = () => {
    if (percentage >= 80) return { label: 'Trusted Reporter', color: 'hsl(var(--success))' };
    if (percentage >= 50) return { label: 'Good Standing', color: 'hsl(var(--primary))' };
    if (percentage >= 25) return { label: 'Warning Level', color: 'hsl(var(--warning))' };
    return { label: 'At Risk', color: 'hsl(var(--destructive))' };
  };

  const level = getLevel();
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="card-elevated p-5 flex items-center gap-5">
      <div className="relative w-[100px] h-[100px] flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none"
            stroke={level.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-display font-bold leading-none">{points}</span>
          <span className="text-[9px] text-muted-foreground font-medium mt-0.5">points</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div>
          <p className="text-sm font-bold">Trust Score</p>
          <p className="text-xs text-muted-foreground mt-0.5">Your credibility rating</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
          style={{ backgroundColor: `${level.color}15`, color: level.color, border: `1px solid ${level.color}25` }}>
          <Shield className="w-3 h-3" />
          {level.label}
        </div>
        {/* Mini bar indicator */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: level.color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
