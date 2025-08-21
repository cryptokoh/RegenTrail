import React from 'react';
import { useGameStore } from '../store/gameStore';
import { HandHeart } from 'lucide-react';
import { toast } from 'sonner';

export const CookieJar: React.FC = () => {
  const { handBalance, donateHand, addHand } = useGameStore();
  const isMobile = window.innerWidth <= 768;

  const handleDonate = () => {
    const amount = Math.min(50, handBalance.balance);
    if (amount > 0) {
      donateHand(amount);
      toast.success(`Lent ${amount} 🖐️!`, {
        description: `Thank you for supporting the regenerative economy! You earned ${Math.floor(amount / 10)} impact points.`,
      });
    } else {
      toast.error('Not enough HAND tokens!');
    }
  };

  const handleClick = () => {
    addHand(1);
    toast.success('+1 🖐️', {
      description: 'Keep contributing to earn more HAND tokens!'
    });
  };

  // Mobile compact view
  if (isMobile) {
    return (
      <div className="flex items-center gap-3 bg-black/20 rounded-xl p-2 border border-emerald-500/20 backdrop-blur-sm">
        <HandHeart
          size={32}
          className="text-emerald-400 cursor-pointer hover:text-emerald-500 transition-transform hover:scale-110 animate-pulse touch-manipulation"
          onClick={handleClick}
        />
        <div className="flex-1 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-emerald-400">{handBalance.balance} 🖐️</div>
            <div className="text-xs text-gray-400">Lent: {handBalance.donated}</div>
          </div>
          <button
            onClick={handleDonate}
            className="px-3 py-1 text-xs bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 font-medium touch-manipulation active:bg-emerald-500/30"
          >
            Lend 🖐️
          </button>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="text-center">
      <HandHeart
        size={48}
        className="mx-auto text-emerald-400 cursor-pointer hover:text-emerald-500 transition-transform hover:scale-110 animate-pulse"
        onClick={handleClick}
      />
      <div className="mt-2">
        <div className="text-2xl font-bold text-emerald-400">{handBalance.balance} 🖐️</div>
        <div className="text-sm text-gray-400">
          Lent: {handBalance.donated} 🖐️
        </div>
        <button
          onClick={handleDonate}
          className="action-button mt-2 px-6 py-2 text-emerald-400 font-medium group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Lend a Hand
            <span className="text-xl group-hover:animate-bounce">🖐️</span>
          </span>
        </button>
      </div>
    </div>
  );
};