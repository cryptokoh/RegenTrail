import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Award, Share2 } from 'lucide-react';
import { Story } from '../../types/game';
import { useStoryStore } from '../../store/storyStore';
import { toast } from 'sonner';

interface StoryListProps {
  stories: Story[];
}

export const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  const { likeStory } = useStoryStore();

  const handleShare = async (story: Story) => {
    try {
      await navigator.share({
        title: story.title,
        text: story.content.slice(0, 100) + '...',
        url: window.location.href,
      });
    } catch {
      toast.info('Share URL copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <div
          key={story.id}
          className="bg-black/20 rounded-xl p-6 border border-emerald-500/20 space-y-4 hover:border-emerald-500/40 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-1">
                {story.title}
              </h3>
              <div className="text-sm text-gray-400">
                {formatDistanceToNow(story.createdAt, { addSuffix: true })}
              </div>
            </div>
            {story.featured && (
              <Award className="text-yellow-400" size={20} />
            )}
          </div>

          <div 
            className="text-gray-300 prose prose-invert prose-emerald max-w-none"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-emerald-500/10">
            <button
              onClick={() => likeStory(story.id)}
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Heart size={18} />
              <span>{story.likes}</span>
            </button>

            <button
              onClick={() => handleShare(story)}
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}

      {stories.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No tales to show yet.</p>
          <p className="text-sm">Be the first to share your regenerative story!</p>
        </div>
      )}
    </div>
  );
};