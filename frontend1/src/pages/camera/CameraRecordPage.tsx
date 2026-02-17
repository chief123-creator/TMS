import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Square, RotateCcw, Clock, Scan } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function CameraRecordPage() {
  const navigate = useNavigate();
  const setCurrentVideo = useAppStore((s) => s.setCurrentVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState('');

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 }, aspectRatio: { ideal: 16 / 9 } },
        audio: false,
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch {
      setError('Camera access denied. Please enable camera permissions.');
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      let lat = 0, lng = 0;
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } catch {}
      setCurrentVideo({
        latitude: lat,
        longitude: lng,
        timestamp: new Date().toISOString(),
        duration: elapsed,
        vehicleType: 'four_wheeler',
        videoBlob: blob,
      });
      stream.getTracks().forEach((t) => t.stop());
      navigate('/camera/preview');
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
    setElapsed(0);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto">
            <Scan className="w-7 h-7 text-white/60" />
          </div>
          <p className="text-white text-lg font-semibold">Camera Error</p>
          <p className="text-white/50 text-sm max-w-[260px]">{error}</p>
          <button onClick={() => navigate('/camera')} className="text-primary text-sm font-semibold mt-2 inline-block">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      {/* Viewfinder */}
      <div className="flex-1 relative">
        <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)'
        }} />

        {/* Scan-like corner guides */}
        <div className="absolute inset-8 pointer-events-none">
          {/* Top-left */}
          <div className="absolute top-0 left-0 w-10 h-10 border-l-[2.5px] border-t-[2.5px] border-white/70 rounded-tl-xl" />
          {/* Top-right */}
          <div className="absolute top-0 right-0 w-10 h-10 border-r-[2.5px] border-t-[2.5px] border-white/70 rounded-tr-xl" />
          {/* Bottom-left */}
          <div className="absolute bottom-0 left-0 w-10 h-10 border-l-[2.5px] border-b-[2.5px] border-white/70 rounded-bl-xl" />
          {/* Bottom-right */}
          <div className="absolute bottom-0 right-0 w-10 h-10 border-r-[2.5px] border-b-[2.5px] border-white/70 rounded-br-xl" />
        </div>

        {/* Top status bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-400'}`} />
            <span className="text-white/80 text-[11px] font-semibold">{isRecording ? 'RECORDING' : 'READY'}</span>
          </div>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/90 backdrop-blur-sm"
            >
              <Clock className="w-3 h-3 text-white" />
              <span className="text-white font-mono font-bold text-sm">{formatTime(elapsed)}</span>
            </motion.div>
          )}
        </div>

        {/* AI label overlay */}
        {!isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm flex items-center gap-2"
          >
            <Scan className="w-3.5 h-3.5 text-primary" />
            <span className="text-white/70 text-[11px] font-medium">AI-powered vehicle detection</span>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 pt-8" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 60%, transparent)' }}>
        <div className="flex items-center justify-center gap-10">
          <button onClick={() => navigate('/camera')} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20 transition-colors">
            <RotateCcw className="w-5 h-5 text-white/70" />
          </button>

          {!isRecording ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startRecording}
              className="relative w-[72px] h-[72px] rounded-full border-[3px] border-white/40 flex items-center justify-center"
            >
              <div className="w-[56px] h-[56px] rounded-full bg-red-500 transition-transform hover:scale-105" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={stopRecording}
              className="relative w-[72px] h-[72px] rounded-full border-[3px] border-red-400/50 flex items-center justify-center"
            >
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-red-500/40 animate-pulse-ring" />
              <Square className="w-7 h-7 text-red-500 fill-red-500 rounded-sm" />
            </motion.button>
          )}

          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white/60 text-[10px] font-bold">16:9</span>
          </div>
        </div>
        {!isRecording && (
          <p className="text-center text-white/40 text-xs mt-3 font-medium">Tap to start recording</p>
        )}
      </div>
    </div>
  );
}
