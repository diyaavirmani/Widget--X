import type { WidgetAPI } from '../../preload/index'

declare global {
  interface Window {
    widgetAPI: WidgetAPI
  }
}

interface WidgetAPI {
  getAuthStatus: () => Promise<{ authenticated: boolean }>
  login: () => Promise<boolean>
  logout: () => Promise<void>
  onAuthSuccess: (callback: () => void) => () => void
}
