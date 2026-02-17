import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertTriangle, MessageSquare, Bell, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout';

export default function ComplaintStatusPage() {
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 45 * 60 + 30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  const progress = ((24 * 3600 - timeLeft) / (24 * 3600)) * 100;

  const steps = [
    { label: 'Report Submitted', desc: 'Video evidence uploaded successfully', done: true, icon: FileText },
    { label: 'Owner Notified', desc: 'SMS & push notification sent', done: true, icon: Bell },
    { label: 'Awaiting Resolution', desc: 'Owner has 24 hours to respond', done: false, icon: Clock, active: true },
    { label: 'Final Decision', desc: 'Fine applied or case resolved', done: false, icon: AlertTriangle },
  ];

  return (
    <AppLayout>
      <div className="page-container space-y-7">
        <div>
          <h1 className="page-title">Complaint Status</h1>
          <p className="page-subtitle">Tracking your official issue in real-time</p>
        </div>

        {/* Timer Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-primary rounded-2xl p-6 text-center"
          style={{ boxShadow: 'var(--shadow-primary)' }}
        >
          <div className="w-11 h-11 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-5 h-5 text-primary-foreground" />
          </div>
          <p className="text-primary-foreground/60 text-[11px] font-medium uppercase tracking-widest mb-3">Time remaining</p>
          <div className="flex items-center justify-center gap-3">
            {[
              { val: pad(hours), label: 'HRS' },
              { val: pad(minutes), label: 'MIN' },
              { val: pad(seconds), label: 'SEC' },
            ].map((unit, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <span className="text-primary-foreground/25 text-2xl font-light">:</span>}
                <div className="text-center">
                  <div className="bg-primary-foreground/15 rounded-xl px-4 py-2.5 min-w-[60px]">
                    <span className="text-3xl font-display font-bold text-primary-foreground font-mono tracking-tight">{unit.val}</span>
                  </div>
                  <p className="text-[9px] text-primary-foreground/40 font-bold mt-1.5 tracking-widest">{unit.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-5 h-1.5 bg-primary-foreground/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-foreground/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Timeline Steps */}
        <div>
          <p className="section-label mb-4">Progress Timeline</p>
          <div className="space-y-0 pl-1">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3.5"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step.done
                      ? 'bg-success/10 border-success/30'
                      : step.active
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-muted border-border'
                  }`}>
                    <step.icon className={`w-4 h-4 ${
                      step.done ? 'text-success' : step.active ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 h-10 rounded-full transition-colors ${
                      step.done ? 'bg-success/25' : 'bg-border'
                    }`} />
                  )}
                </div>
                <div className="pb-8 pt-1">
                  <p className={`text-sm font-semibold ${step.active ? 'text-primary' : ''}`}>{step.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{step.desc}</p>
                  {step.done && (
                    <span className="status-resolved text-[10px] mt-1.5 inline-flex">
                      <CheckCircle className="w-2.5 h-2.5" /> Complete
                    </span>
                  )}
                  {step.active && (
                    <span className="status-active text-[10px] mt-1.5 inline-flex">
                      <Clock className="w-2.5 h-2.5" /> In Progress
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full h-11">
          <MessageSquare className="w-4 h-4 mr-2" /> Contact Support
        </Button>
      </div>
    </AppLayout>
  );
}
