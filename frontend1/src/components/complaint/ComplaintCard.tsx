import { motion } from 'framer-motion';
import { Camera, Clock, CheckCircle, AlertTriangle, Phone } from 'lucide-react';
import type { Complaint } from '@/types';

const statusConfig = {
  pending: { label: 'Pending', className: 'status-pending', icon: Clock },
  timer_running: { label: 'Timer Active', className: 'status-active', icon: Clock },
  resolved: { label: 'Resolved', className: 'status-resolved', icon: CheckCircle },
  fine_applied: { label: 'Fine Applied', className: 'status-fined', icon: AlertTriangle },
};

const vehicleLabels = {
  two_wheeler: '2-Wheeler',
  four_wheeler: '4-Wheeler',
  truck: 'Truck',
};

export default function ComplaintCard({ complaint, index = 0 }: { complaint: Complaint; index?: number }) {
  const config = statusConfig[complaint.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -1, transition: { duration: 0.15 } }}
      className="card-elevated p-4 flex gap-3 cursor-pointer"
    >
      <div className="w-14 h-14 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
        {complaint.thumbnailUrl ? (
          <img src={complaint.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Camera className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-semibold truncate">
            {vehicleLabels[complaint.vehicleType]} Violation
          </span>
          <div className={config.className}>
            <StatusIcon className="w-3 h-3" />
            {config.label}
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground">
          {new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            {complaint.actionType === 'direct_call' ? <Phone className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
            {complaint.actionType === 'direct_call' ? 'Direct Call' : 'Official Issue'}
          </span>
          {complaint.rewardEarned && (
            <span className="text-[11px] font-bold text-success">+₹{complaint.rewardEarned}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
