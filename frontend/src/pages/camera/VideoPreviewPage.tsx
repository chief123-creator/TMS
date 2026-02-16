import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, MapPin, Clock, Car, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/store/useAppStore';
import AppLayout from '@/layouts/AppLayout';
import type { VehicleType } from '@/types';

export default function VideoPreviewPage() {
  const navigate = useNavigate();
  const currentVideo = useAppStore((s) => s.currentVideo);
  const setCurrentVideo = useAppStore((s) => s.setCurrentVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [vehicleType, setVehicleType] = useState<VehicleType>(currentVideo?.vehicleType || 'four_wheeler');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (currentVideo?.videoBlob) {
      const url = URL.createObjectURL(currentVideo.videoBlob);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [currentVideo]);

  const handleSubmit = () => {
    if (currentVideo) {
      setCurrentVideo({ ...currentVideo, vehicleType });
    }
    navigate('/action-select');
  };

  if (!currentVideo) {
    return (
      <AppLayout>
        <div className="page-container">
          <div className="empty-state">
            <div className="empty-state-icon">
              <Film className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="empty-state-title">No video recorded</p>
            <p className="empty-state-desc">Record a violation video first to preview and submit it.</p>
            <Button onClick={() => navigate('/camera')} className="mt-5 h-10">Record Video</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="page-container space-y-6">
        <div>
          <h1 className="page-title">Review Video</h1>
          <p className="page-subtitle">Verify details and submit your recording</p>
        </div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl overflow-hidden bg-black aspect-video relative"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          {videoUrl ? (
            <video ref={videoRef} src={videoUrl} controls className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-10 h-10 text-white/30" />
            </div>
          )}
        </motion.div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-elevated p-3.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Location</p>
              <p className="text-xs font-semibold">{currentVideo.latitude.toFixed(4)}, {currentVideo.longitude.toFixed(4)}</p>
            </div>
          </div>
          <div className="card-elevated p-3.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Duration</p>
              <p className="text-xs font-semibold">{currentVideo.duration}s recorded</p>
            </div>
          </div>
        </div>

        {/* Vehicle type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Car className="w-4 h-4 text-primary" /> Vehicle Type
          </label>
          <Select value={vehicleType} onValueChange={(v) => setVehicleType(v as VehicleType)}>
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="two_wheeler">Two Wheeler</SelectItem>
              <SelectItem value="four_wheeler">Four Wheeler</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSubmit} className="w-full h-12 text-base font-semibold">
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </AppLayout>
  );
}
