import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, FileText, Zap, Clock, ArrowRight, Shield, Sparkles } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';

export default function ActionSelectPage() {
  const navigate = useNavigate();

  const handleSelect = (type: 'direct_call' | 'official_issue') => {
    navigate('/complaint/status');
  };

  return (
    <AppLayout>
      <div className="page-container space-y-6">
        <div>
          <h1 className="page-title">Choose Action</h1>
          <p className="page-subtitle">How would you like to resolve this violation?</p>
        </div>

        <div className="space-y-4">
          {/* Direct Call — Recommended */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -2 }}
            onClick={() => handleSelect('direct_call')}
            className="w-full rounded-2xl p-6 text-left relative overflow-hidden border-2 border-success/25 bg-card group transition-shadow duration-200"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity" style={{ background: 'var(--gradient-success)' }} />
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-success flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="w-6 h-6 text-success-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-display font-bold text-lg">Direct Call</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-success/12 text-success text-[10px] font-bold uppercase flex items-center gap-1 tracking-wide">
                    <Zap className="w-3 h-3" /> Fast
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Contact the vehicle owner immediately for the fastest resolution.
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-success">
                  <Sparkles className="w-3.5 h-3.5" /> Recommended
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          </motion.button>

          {/* Official Issue */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -2 }}
            onClick={() => handleSelect('official_issue')}
            className="w-full rounded-2xl p-6 text-left relative overflow-hidden border border-border bg-card group transition-shadow duration-200"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity" style={{ background: 'var(--gradient-primary)' }} />
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-display font-bold text-lg">Raise Official Issue</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-warning/12 text-warning text-[10px] font-bold uppercase flex items-center gap-1 tracking-wide">
                    <Clock className="w-3 h-3" /> Process
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  File an official complaint. Owner gets a 24-hour countdown timer.
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 24hr timer
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Tip */}
        <div className="rounded-xl p-4 border border-primary/10" style={{ background: 'hsl(var(--accent) / 0.5)' }}>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">💡 Tip:</strong> Direct call resolves issues quickly. Official issues trigger a formal process with fines if unresolved.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
