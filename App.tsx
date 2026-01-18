import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store';
import LoginView from './components/LoginView';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Watchlist from './components/Watchlist';
import Orders from './components/Orders';
import License from './components/License';
import SettingsPanel from './components/SettingsPanel';
import SetupGuide from './components/SetupGuide';
import SetupWizard from './components/SetupWizard';
import TradeDialog from './components/TradeDialog';
import { useTradingStore } from './store';
import './index.css';

type ViewType = 'dashboard' | 'portfolio' | 'watchlist' | 'orders' | 'license' | 'settings' | 'guide';

function App() {
  console.log('App component rendering');
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [showTradeDialog, setShowTradeDialog] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [mounted, setMounted] = useState(false);
  const selectedStock = useTradingStore((state) => state.selectedStock);

  console.log('isAuthenticated:', isAuthenticated, 'mounted:', mounted);

  // Restore session on mount
  useEffect(() => {
    console.log('useEffect running - restoring session');
    const savedSession = localStorage.getItem('txm_user');
    if (savedSession) {
      try {
        const userData = JSON.parse(savedSession);
        console.log('Restoring user:', userData);
        login(userData);
      } catch (e) {
        console.error('Failed to restore session:', e);
      }
    }
    setMounted(true);
  }, [login]);

  if (!mounted) {
    return <div style={{ background: '#07090b', minHeight: '100vh', color: 'white' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, showing login');
    return <LoginView />;
  }

  // Show setup wizard on first login
  const isFirstSetup = !localStorage.getItem('txm_setup_complete');

  if (showSetupWizard || isFirstSetup) {
    return (
      <SetupWizard
        onComplete={() => {
          localStorage.setItem('txm_setup_complete', 'true');
          setShowSetupWizard(false);
        }}
        onSkip={() => {
          setShowSetupWizard(false);
        }}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'portfolio':
        return <Portfolio />;
      case 'watchlist':
        return <Watchlist />;
      case 'orders':
        return <Orders />;
      case 'license':
        return <License />;
      case 'settings':
        return <SettingsPanel />;
      case 'guide':
        return <SetupGuide />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090b]">
      <Navigation activeView={currentView} onNavigate={setCurrentView} />
      {renderView()}
      <TradeDialog
        isOpen={showTradeDialog}
        onClose={() => setShowTradeDialog(false)}
        stock={selectedStock}
      />
    </div>
  );
}

export default App;
