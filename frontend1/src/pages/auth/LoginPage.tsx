import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setLocalError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero header */}
      <div className="gradient-primary px-6 pt-16 pb-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/3" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mb-6 backdrop-blur-sm">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-primary-foreground leading-tight">Welcome back</h1>
          <p className="text-primary-foreground/60 mt-1.5 text-sm">Sign in to continue protecting your streets</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 px-5 -mt-6"
      >
        <form onSubmit={handleLogin} className="bg-card rounded-2xl p-6 space-y-5 border border-border/50" style={{ boxShadow: 'var(--shadow-xl)' }}>
          {(error || localError) && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error || localError}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLocalError('');
                  clearError();
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
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLocalError('');
                  clearError();
                }}
                className="pl-10 pr-10 h-11"
                disabled={isLoading}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6 pb-8">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/signup')} 
            disabled={isLoading}
            className="text-primary font-semibold hover:underline disabled:opacity-50"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
}
