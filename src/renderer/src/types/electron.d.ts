import type { WidgetAPI } from '../../preload/index'

declare global {
  interface Window {
    widgetAPI: WidgetAPI
  }
}
