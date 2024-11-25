import React from 'react';
import { Award, Clock } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';
import { formatDistanceToNow } from 'date-fns';

export const StoryPrompts: React.FC = () => {
  const { prompts } = useStoryStore();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {prompts.map((prompt) => {
          const isExpired = prompt.expiresAt < Date.now();
          
          return (
            <div
              key={prompt.id}
              className={`bg-black/20 rounded-xl p-6 border border-emerald-500/20 space-y-4 ${
                isExpired ? 'opacity-50' : 'hover:border-emerald-500/40'
              } transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400">
                    {prompt.title}
                  </h3>
                  <div className="text-sm text-gray-400">
                    Theme: {prompt.theme}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Award size={18} />
                  <span>{prompt.points} points</span>
                </div>
              </div>

              <p className="text-gray-300">{prompt.description}</p>

              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-400" />
                <span className={isExpired ? 'text-red-400' : 'text-gray-400'}>
                  {isExpired
                    ? 'Expired'
                    : formatDistanceToNow(prompt.expiresAt, { addSuffix: true })}
                </span>
              </div>

              <button
                disabled={isExpired}
                className="action-button w-full py-2 text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExpired ? 'Prompt Ended' : 'Write Tale'}
              </button>
            </div>
          );
        })}
      </div>

      {prompts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No active prompts at the moment.</p>
          <p className="text-sm">Check back soon for new writing challenges!</p>
        </div>
      )}
    </div>
  );
};