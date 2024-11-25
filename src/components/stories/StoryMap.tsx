import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';
import { Story } from '../../types/game';

export const StoryMap: React.FC = () => {
  const { stories } = useStoryStore();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlacing) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    console.log(`Placed at: ${x}%, ${y}%`);
    setIsPlacing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-emerald-400">Tale Map</h3>
        <button
          onClick={() => setIsPlacing(!isPlacing)}
          className={`glass-button flex items-center gap-2 ${
            isPlacing ? 'bg-emerald-500/20 border-emerald-500/30' : ''
          }`}
        >
          <Plus size={18} />
          <span>Place Tale</span>
        </button>
      </div>

      <div 
        className="relative aspect-[16/9] bg-black/20 rounded-xl border border-emerald-500/20 overflow-hidden cursor-pointer"
        onClick={handleMapClick}
      >
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-purple-900/40" />

        {/* Story Pins */}
        {stories
          .filter(story => story.location)
          .map((story) => (
            <button
              key={story.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${story.location?.x}%`,
                top: `${story.location?.y}%`
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStory(story);
              }}
            >
              <MapPin 
                size={24} 
                className="text-emerald-400 group-hover:text-emerald-300 transition-colors" 
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap bg-black/80 px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {story.title}
              </div>
            </button>
          ))}

        {/* Placement Guide */}
        {isPlacing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-emerald-400 animate-pulse">
              Click anywhere on the map to place your tale
            </div>
          </div>
        )}
      </div>

      {/* Selected Story Preview */}
      {selectedStory && (
        <div className="bg-black/20 rounded-xl p-6 border border-emerald-500/20">
          <h4 className="text-lg font-semibold text-emerald-400 mb-2">
            {selectedStory.title}
          </h4>
          <div 
            className="text-gray-300 prose prose-invert prose-emerald max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedStory.content }}
          />
          <button
            onClick={() => setSelectedStory(null)}
            className="mt-4 text-gray-400 hover:text-emerald-400 transition-colors"
          >
            Close Preview
          </button>
        </div>
      )}
    </div>
  );
};