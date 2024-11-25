import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story, StoryPrompt } from '../types/game';
import { toast } from 'sonner';

// Initial stories data
const initialStories: Story[] = [
  {
    id: 'tale-1',
    title: 'The First Green Pill',
    content: `<p>I remember the exact moment I took the green pill. It wasn't a physical pill, of course, but rather the moment I truly understood what regenerative systems could mean for our future.</p>
    <p>It happened at ETHDenver 2024, surrounded by builders and dreamers. Someone was presenting a project about tokenized carbon credits, but they weren't just talking about offsetting—they were describing an entire ecosystem where every transaction could help restore our planet.</p>
    <p>That's when it clicked. Web3 wasn't just about financial freedom; it could be the key to ecological regeneration.</p>`,
    authorId: '0x1234',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    likes: 42,
    featured: true,
    tags: ['green-pill', 'ethdenver', 'regeneration'],
    location: { x: 30, y: 40, name: 'ETHDenver' }
  },
  {
    id: 'tale-2',
    title: 'The Bamboo DAO Experiment',
    content: `<p>Our local regenerative farming collective decided to experiment with DAOs in an unexpected way. We tokenized bamboo growth cycles, creating a unique alignment between DeFi yields and actual bamboo yields.</p>
    <p>Each token represented a bamboo plot, and holders could earn rewards based on both financial stakes and their contribution to bamboo cultivation knowledge. The fascinating part? The rapid growth of bamboo perfectly matched our token emission schedule!</p>
    <p>Six months in, we've not only created a sustainable funding model but also built an engaged community of regenerative farmers and crypto enthusiasts.</p>`,
    authorId: '0x5678',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    likes: 28,
    featured: true,
    tags: ['dao', 'farming', 'bamboo', 'defi'],
    location: { x: 65, y: 35, name: 'Bamboo Valley' }
  },
  {
    id: 'tale-3',
    title: 'Solarpunk Dreams in Tulum',
    content: `<p>The Tulum Crypto Fest was unlike any other conference I'd attended. Instead of sterile conference rooms, we gathered in sustainable bamboo structures powered by solar panels.</p>
    <p>During a workshop on regenerative tokenomics, a sudden tropical rain began to fall. Rather than being an interruption, it became part of the experience—the sound of rain on the bamboo roof creating a natural symphony as we discussed how to tokenize rainfall collection systems.</p>
    <p>This was where I learned that the future of crypto doesn't have to be about energy-intensive mining, but can instead power the regenerative revolution.</p>`,
    authorId: '0x9abc',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    likes: 35,
    featured: true,
    tags: ['solarpunk', 'tulum', 'sustainability'],
    location: { x: 80, y: 70, name: 'Tulum' }
  }
];

// Initial prompts data
const initialPrompts: StoryPrompt[] = [
  {
    id: 'prompt-1',
    title: 'Your Green Pill Moment',
    description: 'Share the moment you realized the potential of regenerative systems. What sparked your journey?',
    theme: 'Origins',
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    points: 50
  },
  {
    id: 'prompt-2',
    title: 'Local Regeneration',
    description: 'Tell us about a regenerative project in your local community. How is it making a difference?',
    theme: 'Community',
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
    points: 75
  }
];

interface StoryState {
  stories: Story[];
  prompts: StoryPrompt[];
  userStories: Record<string, string[]>;
  featuredStories: string[];
  
  // Actions
  addStory: (story: Omit<Story, 'id' | 'createdAt' | 'likes' | 'featured'>) => void;
  likeStory: (storyId: string) => void;
  featureStory: (storyId: string) => void;
  addPrompt: (prompt: Omit<StoryPrompt, 'id'>) => void;
  getUserStories: (userId: string) => Story[];
  getFeaturedStories: () => Story[];
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      stories: initialStories,
      prompts: initialPrompts,
      userStories: {},
      featuredStories: initialStories.filter(s => s.featured).map(s => s.id),

      addStory: (storyData) => {
        const newStory: Story = {
          id: Math.random().toString(36).slice(2),
          createdAt: Date.now(),
          likes: 0,
          featured: false,
          ...storyData
        };

        set((state) => ({
          stories: [...state.stories, newStory],
          userStories: {
            ...state.userStories,
            [storyData.authorId]: [
              ...(state.userStories[storyData.authorId] || []),
              newStory.id
            ]
          }
        }));

        toast.success('Story shared successfully!', {
          description: 'Your tale has been added to the trail.'
        });
      },

      likeStory: (storyId) => {
        set((state) => ({
          stories: state.stories.map((story) =>
            story.id === storyId
              ? { ...story, likes: story.likes + 1 }
              : story
          )
        }));
      },

      featureStory: (storyId) => {
        set((state) => ({
          stories: state.stories.map((story) =>
            story.id === storyId
              ? { ...story, featured: true }
              : story
          ),
          featuredStories: [...state.featuredStories, storyId]
        }));

        toast.success('Story featured!', {
          description: 'This tale will be highlighted on the trail.'
        });
      },

      addPrompt: (promptData) => {
        const newPrompt: StoryPrompt = {
          id: Math.random().toString(36).slice(2),
          ...promptData
        };

        set((state) => ({
          prompts: [...state.prompts, newPrompt]
        }));
      },

      getUserStories: (userId) => {
        const state = get();
        const userStoryIds = state.userStories[userId] || [];
        return state.stories.filter((story) => userStoryIds.includes(story.id));
      },

      getFeaturedStories: () => {
        const state = get();
        return state.stories.filter((story) => story.featured);
      }
    }),
    {
      name: 'regen-trail-stories',
      version: 1,
    }
  )
);