import React, { useState } from 'react';
import { Book, PenTool, Award, MapPin } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';
import { useGameStore } from '../../store/gameStore';
import { StoryEditor } from '../stories/StoryEditor';
import { StoryList } from '../stories/StoryList';
import { StoryMap } from '../stories/StoryMap';
import { StoryPrompts } from '../stories/StoryPrompts';

export const TrailTalesTab: React.FC = () => {
  const [view, setView] = useState<'read' | 'write' | 'map' | 'prompts'>('read');
  const { walletConnected } = useGameStore();
  const { getFeaturedStories } = useStoryStore();
  const featuredStories = getFeaturedStories();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-emerald-400 mb-2">Trail Tales</h2>
        <p className="text-gray-300">Share and discover stories from the regenerative trail</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        <button
          onClick={() => setView('read')}
          className={`glass-button flex items-center gap-2 ${
            view === 'read' ? 'bg-emerald-500/20 border-emerald-500/30' : ''
          }`}
        >
          <Book size={18} />
          <span>Read Tales</span>
        </button>
        
        <button
          onClick={() => setView('write')}
          disabled={!walletConnected}
          className={`glass-button flex items-center gap-2 ${
            view === 'write' ? 'bg-emerald-500/20 border-emerald-500/30' : ''
          } ${!walletConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <PenTool size={18} />
          <span>Share Tale</span>
        </button>

        <button
          onClick={() => setView('map')}
          className={`glass-button flex items-center gap-2 ${
            view === 'map' ? 'bg-emerald-500/20 border-emerald-500/30' : ''
          }`}
        >
          <MapPin size={18} />
          <span>Tale Map</span>
        </button>

        <button
          onClick={() => setView('prompts')}
          className={`glass-button flex items-center gap-2 ${
            view === 'prompts' ? 'bg-emerald-500/20 border-emerald-500/30' : ''
          }`}
        >
          <Award size={18} />
          <span>Prompts</span>
        </button>
      </div>

      {view === 'read' && <StoryList stories={featuredStories} />}
      {view === 'write' && <StoryEditor />}
      {view === 'map' && <StoryMap />}
      {view === 'prompts' && <StoryPrompts />}
    </div>
  );
};