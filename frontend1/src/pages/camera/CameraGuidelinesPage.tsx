import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Camera, Eye, Sun, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout';

const guidelines = [
  { id: 'plate', label: 'Number plate clearly visible', description: 'Ensure the registration number can be read', icon: Eye },
  { id: 'vehicle', label: 'Full vehicle visible', description: 'Capture the entire vehicle in frame', icon: Camera },
  { id: 'light', label: 'Proper lighting conditions', description: 'Record in well-lit environment', icon: Sun },
  { id: 'duration', label: 'Minimum 10 second recording', description: 'Hold steady for at least 10 seconds', icon: Clock },
];

export default function CameraGuidelinesPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allChecked = checked.size === guidelines.length;

  return (
    <AppLayout>
      <div className="page-container space-y-6">
        <div>
          <h1 className="page-title">Recording Guidelines</h1>
          <p className="page-subtitle">Review all items before recording</p>
        </div>

        {/* Important notice */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 border border-primary/15"
          style={{ background: 'hsl(var(--accent) / 0.6)' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Authenticity Required</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Videos must be recorded directly in this app. Gallery uploads are not accepted.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Checklist */}
        <div className="space-y-2.5">
          {guidelines.map((g, i) => {
            const isChecked = checked.has(g.id);
            return (
              <motion.button
                key={g.id}
                onClick={() => toggle(g.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full card-elevated p-4 flex items-center gap-3 text-left transition-all duration-200 ${
                  isChecked ? 'border-primary/25 bg-accent/40' : ''
                }`}
              >
                <AnimatePresence mode="wait">
                  {isChecked ? (
                    <motion.div key="checked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div key="unchecked">
                      <Circle className="w-5 h-5 text-muted-foreground/40" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex-1">
                  <p className={`text-sm font-semibold transition-colors ${isChecked ? 'text-foreground' : 'text-foreground/80'}`}>{g.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{g.description}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isChecked ? 'bg-primary/10' : 'bg-muted'}`}>
                  <g.icon className={`w-4 h-4 transition-colors ${isChecked ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Progress + CTA */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{checked.size} of {guidelines.length} checked</span>
            <span className="font-semibold">{Math.round((checked.size / guidelines.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${(checked.size / guidelines.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <Button
            onClick={() => navigate('/camera/record')}
            disabled={!allChecked}
            className="w-full h-12 text-base font-semibold"
          >
            Start Recording <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
