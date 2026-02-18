import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Shield, Fingerprint, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';
import { authAPI } from '@/lib/api';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAppStore();
  const [step, setStep] = useState<'details' | 'aadhaar'>('details');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [localError, setLocalError] = useState('');
  const [testOtp, setTestOtp] = useState('');
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (!form.name || !form.email || !form.phone || !form.password) {
      setLocalError('Please fill in all fields');
      return;
    }
    
    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    
    setStep('aadhaar');
  };

  const handleSendOtp = async () => {
    setLocalError('');
    
    if (aadhaar.length < 12) {
      setLocalError('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    
    setIsOtpLoading(true);
    try {
      const response = await authAPI.sendOtp({ aadhaar_number: aadhaar });
      const receivedOtp = response.otp;
      
      // Display OTP in console for testing
      console.log('🔐 TEST OTP:', receivedOtp);
      console.log('%c Copy OTP: ' + receivedOtp, 'background: #4CAF50; color: white; padding: 10px; font-size: 14px; font-weight: bold;');
      
      // Store OTP for display in UI
      setTestOtp(receivedOtp);
      setOtpSent(true);
    } catch (err: any) {
      setLocalError(err.response?.data?.detail || 'Failed to send OTP');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (otp.length < 6) {
      setLocalError('Please enter a valid 6-digit OTP');
      return;
    }
    
    try {
      await signup(form.name, form.email, form.phone, aadhaar, form.password);
      navigate('/dashboard');
    } catch (err: any) {
      setLocalError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="gradient-primary px-6 pt-16 pb-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mb-6 backdrop-blur-sm">
            {step === 'details' ? (
              <Shield className="w-7 h-7 text-primary-foreground" />
            ) : (
              <Fingerprint className="w-7 h-7 text-primary-foreground" />
            )}
          </div>
          <h1 className="text-3xl font-display font-bold text-primary-foreground leading-tight">
            {step === 'details' ? 'Create Account' : 'Verify Identity'}
          </h1>
          <p className="text-primary-foreground/60 mt-1.5 text-sm">
            {step === 'details' ? 'Join the movement for safer streets' : 'Aadhaar verification for trusted access'}
          </p>
          {/* Step indicator */}
          <div className="flex gap-2 mt-4">
            <div className={`h-1 rounded-full flex-1 transition-colors ${step === 'details' ? 'bg-primary-foreground/60' : 'bg-primary-foreground/20'}`} />
            <div className={`h-1 rounded-full flex-1 transition-colors ${step === 'aadhaar' ? 'bg-primary-foreground/60' : 'bg-primary-foreground/20'}`} />
          </div>
        </motion.div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 px-5 -mt-6"
      >
        {step === 'details' ? (
          <form onSubmit={handleDetailsSubmit} className="bg-card rounded-2xl p-6 space-y-4 border border-border/50" style={{ boxShadow: 'var(--shadow-xl)' }}>
            {(error || localError) && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error || localError}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Your full name" 
                  value={form.name} 
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setLocalError('');
                  }} 
                  className="pl-10 h-11" 
                  disabled={isLoading}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={form.email} 
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setLocalError('');
                  }} 
                  className="pl-10 h-11" 
                  disabled={isLoading}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  value={form.phone} 
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                    setLocalError('');
                  }} 
                  className="pl-10 h-11" 
                  disabled={isLoading}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={form.password}
                  maxLength={72}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setLocalError('');
                  }} 
                  className="pl-10 h-11" 
                  disabled={isLoading}
                  required 
                />
              </div>
              {form.password.length >= 72 && (
                <p className="text-xs text-warning font-medium">Password has reached maximum length (72 characters)</p>
              )}
              {form.password.length > 0 && form.password.length < 6 && (
                <p className="text-xs text-muted-foreground">Password must be at least 6 characters ({form.password.length}/6)</p>
              )}
            </div>
            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="bg-card rounded-2xl p-6 space-y-4 border border-border/50" style={{ boxShadow: 'var(--shadow-xl)' }}>
            {(error || localError) && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error || localError}
              </div>
            )}
            
            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: 'hsl(var(--accent) / 0.6)' }}>
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Why Aadhaar?</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Identity verification prevents fake reports and builds community trust.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Aadhaar Number</label>
              <Input
                placeholder="XXXX XXXX XXXX"
                value={aadhaar}
                onChange={(e) => {
                  setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12));
                  setLocalError('');
                }}
                maxLength={12}
                className="h-11"
                disabled={isLoading}
                required
              />
            </div>
            {!otpSent ? (
              <Button 
                type="button" 
                onClick={handleSendOtp} 
                className="w-full h-12" 
                disabled={aadhaar.length < 12 || isOtpLoading}
              >
                {isOtpLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending OTP...
                  </span>
                ) : 'Send OTP'}
              </Button>
            ) : (
              <>
                {testOtp && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-warning/10 border border-warning/30 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-warning">Test Mode - OTP for Testing</p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        In production, OTP would be sent via SMS. For testing, use this OTP:
                      </p>
                      <div className="mt-2 p-2 rounded bg-background/50 font-mono text-sm font-bold text-primary text-center">
                        {testOtp}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        (Also check browser console for the OTP)
                      </p>
                    </div>
                  </motion.div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter OTP</label>
                  <Input 
                    placeholder="6-digit OTP" 
                    value={otp} 
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setLocalError('');
                    }} 
                    maxLength={6} 
                    className="h-11 text-center text-lg font-mono tracking-widest" 
                    disabled={isLoading}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={otp.length < 6 || isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : 'Verify & Create Account'}
                </Button>
              </>
            )}
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6 pb-8">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')} 
            disabled={isLoading}
            className="text-primary font-semibold hover:underline disabled:opacity-50"
          >Sign In</button>
        </p>
      </motion.div>
    </div>
  );
}
