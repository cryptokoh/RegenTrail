import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Sprout, Map, Store as StoreIcon, Terminal, Wallet, Dumbbell, Heart, Calendar, Cookie, Menu, X, Book } from 'lucide-react';
import { LocationsTab } from './components/tabs/LocationsTab';
import { StoreTab } from './components/tabs/StoreTab';
import { GardenTab } from './components/tabs/GardenTab';
import { DojoTab } from './components/tabs/DojoTab';
import { WalletTab } from './components/tabs/WalletTab';
import { ProjectsTab } from './components/tabs/ProjectsTab';
import { EventsTab } from './components/tabs/EventsTab';
import { CookieJarTab } from './components/tabs/CookieJarTab';
import { TrailTalesTab } from './components/tabs/TrailTalesTab';
import { ConsoleLog } from './components/ConsoleLog';
import { PointsDisplay } from './components/PointsDisplay';
import { CookieJar } from './components/CookieJar';
import { ConnectWallet } from './components/ConnectWallet';
import { QuadraticStream } from './components/QuadraticStream';
import { GreenPillIntro } from './components/GreenPillIntro';
import { Leaderboard } from './components/Leaderboard';
import { UserSetup } from './components/UserSetup';
import { useGameStore } from './store/gameStore';
import { useUserStore } from './store/userStore';

const tabs = [
  { id: 'locations', label: '🗺️', fullLabel: 'Locations', icon: Map },
  { id: 'events', label: '📅', fullLabel: 'Events', icon: Calendar },
  { id: 'garden', label: '🌱', fullLabel: 'Garden', icon: Sprout },
  { id: 'store', label: '🏪', fullLabel: 'Store', icon: StoreIcon },
  { id: 'dojo', label: '🥋', fullLabel: 'Dojo', icon: Dumbbell },
  { id: 'projects', label: '💚', fullLabel: 'Projects', icon: Heart },
  { id: 'cookiejar', label: '🍪', fullLabel: 'CookieJar', icon: Cookie },
  { id: 'wallet', label: '👛', fullLabel: 'Wallet', icon: Wallet },
  { id: 'tales', label: '📖', fullLabel: 'Trail Tales', icon: Book }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('locations');
  const [showIntro, setShowIntro] = useState(true);
  const [showUserSetup, setShowUserSetup] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logs = useGameStore((state) => state.logs);
  const { addUser } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showMobileMenu || showProposalModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showMobileMenu, showProposalModal]);

  const handleTabChange = async (tabId: string) => {
    if (!document.startViewTransition) {
      setActiveTab(tabId);
      setShowMobileMenu(false);
      return;
    }

    await document.startViewTransition(() => {
      setActiveTab(tabId);
      setShowMobileMenu(false);
    }).finished;
  };

  const handleUserSetupComplete = (username: string | null) => {
    addUser(username);
    setShowUserSetup(false);
  };

  if (showIntro) {
    return <GreenPillIntro onStart={() => setShowIntro(false)} />;
  }

  if (showUserSetup) {
    return <UserSetup onComplete={handleUserSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-950 via-emerald-900 to-purple-900 text-white">
      <Toaster 
        position="top-right" 
        closeButton
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(74, 222, 128, 0.2)'
          }
        }}
      />
      <QuadraticStream />

      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm border-b border-emerald-500/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">Regen Trail</h1>
            <p className="text-xs text-gray-400 italic">A HAND Experience</p>
          </div>
          <div className="flex items-center gap-2">
            <ConnectWallet />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
            >
              {showMobileMenu ? (
                <X className="text-emerald-400" size={24} />
              ) : (
                <Menu className="text-emerald-400" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Emoji Tab Navigation */}
      <div className={`sticky top-[73px] z-10 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-emerald-500/20' 
          : 'bg-transparent'
      }`}>
        <div className="flex justify-center gap-2 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`p-2 rounded-lg transition-all duration-300 relative group ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 scale-110'
                  : 'hover:bg-emerald-500/10'
              }`}
              title={tab.fullLabel}
            >
              <span className="text-2xl">{tab.label}</span>
              <span className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-emerald-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                isScrolled ? 'hidden' : ''
              }`}>
                {tab.fullLabel}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid md:grid-cols-[1fr,300px] gap-8">
            <div className="space-y-8" style={{ viewTransitionName: 'tab-content' }}>
              {activeTab === 'locations' && <LocationsTab />}
              {activeTab === 'events' && <EventsTab />}
              {activeTab === 'garden' && <GardenTab />}
              {activeTab === 'store' && <StoreTab />}
              {activeTab === 'dojo' && <DojoTab />}
              {activeTab === 'projects' && <ProjectsTab />}
              {activeTab === 'cookiejar' && <CookieJarTab />}
              {activeTab === 'wallet' && <WalletTab />}
              {activeTab === 'tales' && <TrailTalesTab />}
            </div>

            <div className="space-y-8 fade-background">
              <PointsDisplay />
              <CookieJar />
              <ConsoleLog logs={logs} onProposalClick={() => setShowProposalModal(true)} />
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-gray-500 italic">
        Disclaimer: This is meant to be educational and fun. Have you taken the green pill? 🌱
      </div>

      {/* Modals */}
      {(showMobileMenu || showProposalModal) && (
        <div 
          className="modal-backdrop"
          onClick={() => {
            setShowMobileMenu(false);
            setShowProposalModal(false);
          }}
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'hover:bg-emerald-500/10 text-gray-300'
                }`}
              >
                <Icon size={20} />
                <span>{tab.fullLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="modal-content">
          <div 
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full" 
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">Active Proposal</h3>
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-emerald-300 mb-2">Clean Streets & Grow Food</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Proposal to clean up local streets and establish community gardens for organic food production.
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Support: 89%</span>
                  <span>Quorum: Yes</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  className="glass-button flex-1 hover:bg-emerald-500/20"
                  onClick={() => setShowProposalModal(false)}
                >
                  Vote For
                </button>
                <button 
                  className="glass-button flex-1 hover:bg-red-500/20"
                  onClick={() => setShowProposalModal(false)}
                >
                  Vote Against
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button 
                className="text-gray-400 text-sm hover:text-gray-300"
                onClick={() => setShowProposalModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;