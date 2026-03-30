import type { Post, Notification, TrendingTopic } from '../types/widget'

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: { name: 'Elon Musk', handle: '@elonmusk', avatar: 'https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_normal.jpg', verified: true },
    text: 'The future of desktop apps is here. Transparent, always-on-top widgets that blend seamlessly with your workspace. 🚀',
    metrics: { replies: 2451, reposts: 8923, likes: 45200, views: 1200000 },
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    url: 'https://x.com/elonmusk'
  },
  {
    id: '2',
    author: { name: 'X Developers', handle: '@XDevelopers', avatar: 'https://pbs.twimg.com/profile_images/880136122604507136/xHrnqf1T_normal.jpg', verified: true },
    text: 'Introducing the new X API v2 with enhanced tweet search, user lookup, and real-time streaming capabilities. Build the next generation of social apps!',
    metrics: { replies: 342, reposts: 1205, likes: 5600, views: 320000 },
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    url: 'https://x.com/XDevelopers'
  },
  {
    id: '3',
    author: { name: 'Satya Nadella', handle: '@sataborat', avatar: 'https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_normal.jpg', verified: true },
    text: 'AI is not replacing developers — it\'s empowering them to build 10x faster. The tools we ship today will define the next decade of software.',
    metrics: { replies: 1890, reposts: 6710, likes: 34500, views: 890000 },
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    url: 'https://x.com'
  },
  {
    id: '4',
    author: { name: 'TechCrunch', handle: '@TechCrunch', avatar: 'https://pbs.twimg.com/profile_images/1813240088498733056/f4R1CjXl_normal.jpg', verified: true },
    text: 'BREAKING: Desktop widgets are making a massive comeback in 2026. Developers report 300% increase in widget app downloads across all platforms.',
    metrics: { replies: 567, reposts: 2340, likes: 12400, views: 560000 },
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    url: 'https://x.com'
  },
  {
    id: '5',
    author: { name: 'GitHub', handle: '@github', avatar: 'https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_normal.png', verified: true },
    text: '🎉 Over 100 million developers now call GitHub home. Thank you for building the future with us. Here\'s to the next 100 million!',
    metrics: { replies: 4200, reposts: 15600, likes: 89000, views: 4500000 },
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    url: 'https://x.com'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    actor: { name: 'Tim Cook', handle: '@tim_cook', avatar: 'https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_normal.jpg', verified: true },
    postPreview: 'Building desktop widgets with Electron is amazing!',
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    url: 'https://x.com/notifications'
  },
  {
    id: 'n2',
    type: 'repost',
    actor: { name: 'VS Code', handle: '@code', avatar: 'https://pbs.twimg.com/profile_images/1410632439306641409/jnU7_cWz_normal.jpg', verified: true },
    postPreview: 'The future of desktop apps is transparent widgets',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    url: 'https://x.com/notifications'
  },
  {
    id: 'n3',
    type: 'follow',
    actor: { name: 'Linus Torvalds', handle: '@Linus__Torvalds', avatar: 'https://pbs.twimg.com/profile_images/1177430368403107841/x0p5Ss0j_normal.jpg', verified: true },
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    url: 'https://x.com/notifications'
  },
  {
    id: 'n4',
    type: 'like',
    actor: { name: 'React', handle: '@reactjs', avatar: 'https://pbs.twimg.com/profile_images/1785867863191932928/EpOqfO6d_normal.png', verified: true },
    postPreview: 'React 19 changes everything about how we think about UI',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    url: 'https://x.com/notifications'
  },
  {
    id: 'n5',
    type: 'mention',
    actor: { name: 'Electron', handle: '@electronjs', avatar: 'https://pbs.twimg.com/profile_images/1489317027958816768/JK7wZnXu_normal.png', verified: true },
    text: '@user Your Widget X app is incredible! Love the glassmorphic design 🔥',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    url: 'https://x.com/notifications'
  },
  {
    id: 'n6',
    type: 'like',
    actor: { name: 'Vercel', handle: '@vercel', avatar: 'https://pbs.twimg.com/profile_images/1767782028960837632/0-FQaGRl_normal.jpg', verified: true },
    postPreview: 'Desktop widgets are the new frontier of productivity software',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    url: 'https://x.com/notifications'
  }
];

export const MOCK_TRENDING: TrendingTopic[] = [
  { id: 't1', rank: 1, category: 'Technology', name: 'Electron', tweetVolume: 45200, url: 'https://x.com/search?q=Electron' },
  { id: 't2', rank: 2, category: 'Programming', name: 'React 19', tweetVolume: 38900, url: 'https://x.com/search?q=React19' },
  { id: 't3', rank: 3, category: 'Tech', name: '#DesktopWidgets', tweetVolume: 28100, url: 'https://x.com/search?q=%23DesktopWidgets' },
  { id: 't4', rank: 4, category: 'AI', name: 'Claude AI', tweetVolume: 124000, url: 'https://x.com/search?q=ClaudeAI' },
  { id: 't5', rank: 5, category: 'Business', name: 'NVIDIA', tweetVolume: 89700, url: 'https://x.com/search?q=NVIDIA' },
  { id: 't6', rank: 6, category: 'Science', name: 'SpaceX Starship', tweetVolume: 156000, url: 'https://x.com/search?q=SpaceX' },
  { id: 't7', rank: 7, category: 'Gaming', name: 'GTA VI', tweetVolume: 234000, url: 'https://x.com/search?q=GTAVI' },
  { id: 't8', rank: 8, category: 'Tech', name: 'TypeScript 6', tweetVolume: 18200, url: 'https://x.com/search?q=TypeScript6' }
];
