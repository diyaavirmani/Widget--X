export interface Post {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
    verified: boolean
  }
  text: string
  media?: { type: 'image' | 'video'; url: string; thumbnail?: string }[]
  metrics: {
    replies: number
    reposts: number
    likes: number
    views: number
  }
  createdAt: string
  url: string
}

export interface Notification {
  id: string
  type: 'like' | 'repost' | 'reply' | 'mention' | 'follow'
  actor: { name: string; handle: string; avatar: string; verified: boolean }
  text?: string
  postPreview?: string
  createdAt: string
  url: string
}

export interface TrendingTopic {
  id: string
  rank: number
  category: string
  name: string
  tweetVolume: number | null
  url: string
}

export type WidgetType = 'timeline' | 'notifications' | 'compose' | 'trending'
export type WidgetSize = '1x1' | '2x1' | '2x2' | '4x1' | '4x2' | '4x4'
export type ThemeMode = 'light' | 'dark' | 'system'

export interface WidgetState {
  id: string
  type: WidgetType
  size: WidgetSize
  feedMode: 'foryou' | 'following'
}

export interface Settings {
  theme: ThemeMode
  refreshInterval: number
  cyclingEnabled: boolean
  cyclingInterval: number
  alwaysOnTop: boolean
  clickThrough: boolean
  glassmorphism: boolean
  startOnBoot: boolean
}
