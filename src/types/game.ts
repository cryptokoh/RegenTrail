// Add Story type
export interface Story {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: number;
  likes: number;
  featured: boolean;
  theme?: string;
  location?: {
    x: number;
    y: number;
    name: string;
  };
  collaborators?: string[];
  tags: string[];
}

export interface StoryPrompt {
  id: string;
  title: string;
  description: string;
  theme: string;
  expiresAt: number;
  points: number;
}

// ... rest of your existing types