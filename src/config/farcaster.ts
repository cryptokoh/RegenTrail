// Farcaster Mini-App Configuration
export const FARCASTER_CONFIG = {
  // Standard Farcaster frame dimensions
  dimensions: {
    width: 390,  // iPhone standard width
    height: 844, // iPhone standard height
    minHeight: 600,
    maxHeight: 900
  },
  
  // Frame metadata
  metadata: {
    version: 'vNext',
    buttons: [
      { label: '🌱 Play', action: 'post' },
      { label: '🏆 Leaderboard', action: 'post' },
      { label: '🖐️ Share', action: 'link' }
    ]
  },
  
  // Performance optimizations
  performance: {
    enableAnimations: false, // Disable heavy animations in frame
    reducedMotion: true,
    lazyLoadImages: true,
    cacheTimeout: 300000 // 5 minutes
  },
  
  // Feature flags for frame context
  features: {
    wallet: false, // Use Farcaster's wallet
    notifications: false, // Use Farcaster notifications
    externalLinks: false, // Prevent external navigation
    socialSharing: true // Enable Farcaster sharing
  }
};

// Detect if running in Farcaster context
export const isFarcasterFrame = (): boolean => {
  // Check URL params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('frame') === 'true') return true;
  
  // Check if in iframe
  if (window.self !== window.top) return true;
  
  // Check for Farcaster-specific headers or properties
  if (window.location.hostname.includes('farcaster')) return true;
  if (window.location.hostname.includes('warpcast')) return true;
  
  // Check user agent for Warpcast app
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('warpcast')) return true;
  
  return false;
};

// Apply frame constraints
export const applyFrameConstraints = () => {
  if (!isFarcasterFrame()) return;
  
  // Set viewport constraints
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 
      `width=${FARCASTER_CONFIG.dimensions.width}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`
    );
  }
  
  // Apply performance optimizations
  if (FARCASTER_CONFIG.performance.reducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
  }
  
  // Disable external links
  if (!FARCASTER_CONFIG.features.externalLinks) {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('http')) {
        e.preventDefault();
      }
    });
  }
};