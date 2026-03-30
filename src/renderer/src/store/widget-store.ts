import { create } from 'zustand'
import type { WidgetType, ThemeMode, Post, Notification, TrendingTopic } from '../types/widget'
import { MOCK_POSTS, MOCK_NOTIFICATIONS, MOCK_TRENDING } from '../lib/mock-data'

interface WidgetStore {
  theme: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: ThemeMode) => void
  setResolvedTheme: (theme: 'light' | 'dark') => void

  activeType: WidgetType
  setActiveType: (type: WidgetType) => void
  feedMode: 'foryou' | 'following'
  setFeedMode: (mode: 'foryou' | 'following') => void

  posts: Post[]
  notifications: Notification[]
  trending: TrendingTopic[]
  setPosts: (posts: Post[]) => void
  setNotifications: (notifs: Notification[]) => void
  setTrending: (topics: TrendingTopic[]) => void

  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isRefreshing: boolean
  setIsRefreshing: (refreshing: boolean) => void

  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void

  refreshInterval: number
  cyclingEnabled: boolean
  cyclingInterval: number
  setRefreshInterval: (interval: number) => void
  setCyclingEnabled: (enabled: boolean) => void
  setCyclingInterval: (interval: number) => void
}

export const useWidgetStore = create<WidgetStore>((set) => ({
  theme: 'dark',
  resolvedTheme: 'dark',
  setTheme: (theme) => set({ theme }),
  setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),

  activeType: 'timeline',
  setActiveType: (activeType) => set({ activeType }),
  feedMode: 'foryou',
  setFeedMode: (feedMode) => set({ feedMode }),

  posts: MOCK_POSTS,
  notifications: MOCK_NOTIFICATIONS,
  trending: MOCK_TRENDING,
  setPosts: (posts) => set({ posts }),
  setNotifications: (notifications) => set({ notifications }),
  setTrending: (trending) => set({ trending }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  isRefreshing: false,
  setIsRefreshing: (isRefreshing) => set({ isRefreshing }),

  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  refreshInterval: 90,
  cyclingEnabled: false,
  cyclingInterval: 180,
  setRefreshInterval: (refreshInterval) => set({ refreshInterval }),
  setCyclingEnabled: (cyclingEnabled) => set({ cyclingEnabled }),
  setCyclingInterval: (cyclingInterval) => set({ cyclingInterval })
}))
