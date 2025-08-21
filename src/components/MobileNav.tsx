import React from 'react';
import { Map, Calendar, Sprout, Store as StoreIcon, Cookie } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isFarcasterFrame?: boolean;
}

const primaryTabs = [
  { id: 'locations', label: '🗺️', icon: Map, name: 'Map' },
  { id: 'events', label: '📅', icon: Calendar, name: 'Events' },
  { id: 'garden', label: '🌱', icon: Sprout, name: 'Garden' },
  { id: 'store', label: '🏪', icon: StoreIcon, name: 'Store' },
  { id: 'cookiejar', label: '🍪', icon: Cookie, name: 'Cookie' }
];

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange, isFarcasterFrame }) => {
  if (isFarcasterFrame) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-emerald-500/20 z-30 safe-bottom md:hidden">
      <div className="flex justify-around items-center py-2">
        {primaryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 touch-manipulation ${
              activeTab === tab.id
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-gray-400 active:bg-emerald-500/10'
            }`}
            aria-label={tab.name}
          >
            <span className="text-xl mb-1">{tab.label}</span>
            <span className="text-[10px] font-medium">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};