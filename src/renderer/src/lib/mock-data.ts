import type { Post, Notification, TrendingTopic } from '../types/widget'

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: { name: 'X Developer', handle: '@xdeveloper', avatar: 'https://picum.photos/150', verified: true },
    text: 'Building desktop widgets with Electron is fun!',
    metrics: { replies: 12, reposts: 34, likes: 500, views: 12000 },
    createdAt: new Date().toISOString(),
    url: 'https://x.com'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    actor: { name: 'John Doe', handle: '@johndoe', avatar: 'https://picum.photos/150', verified: false },
    postPreview: 'Building desktop widgets...',
    createdAt: new Date().toISOString(),
    url: 'https://x.com/notifications'
  }
];

export const MOCK_TRENDING: TrendingTopic[] = [
  { id: 't1', rank: 1, category: 'Technology', name: 'Electron', tweetVolume: 10000, url: 'https://x.com' }
];
