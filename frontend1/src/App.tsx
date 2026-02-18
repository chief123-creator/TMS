import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CameraGuidelinesPage from "./pages/camera/CameraGuidelinesPage";
import CameraRecordPage from "./pages/camera/CameraRecordPage";
import VideoPreviewPage from "./pages/camera/VideoPreviewPage";
import ActionSelectPage from "./pages/complaint/ActionSelectPage";
import ComplaintStatusPage from "./pages/complaint/ComplaintStatusPage";
import HistoryPage from "./pages/history/HistoryPage";
import RewardsPage from "./pages/rewards/RewardsPage";
import WalletPage from "./pages/wallet/WalletPage";
import SettingsPage from "./pages/settings/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppInitializer() {
  const setUser = useAppStore((s) => s.setUser);

  useEffect(() => {
    // Initialize user from localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('user');
      }
    }
  }, [setUser]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInitializer />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/camera" element={<ProtectedRoute><CameraGuidelinesPage /></ProtectedRoute>} />
          <Route path="/camera/record" element={<ProtectedRoute><CameraRecordPage /></ProtectedRoute>} />
          <Route path="/camera/preview" element={<ProtectedRoute><VideoPreviewPage /></ProtectedRoute>} />
          <Route path="/action-select" element={<ProtectedRoute><ActionSelectPage /></ProtectedRoute>} />
          <Route path="/complaint/status" element={<ProtectedRoute><ComplaintStatusPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
