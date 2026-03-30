import { useEffect, useState } from 'react'
import { useWidgetStore } from './store/widget-store'
import type { WidgetType, WidgetSize } from './types/widget'
import { WidgetShell } from './components/widgets/WidgetShell'
import { TimelineWidget } from './components/widgets/TimelineWidget'
import { NotificationsWidget } from './components/widgets/NotificationsWidget'
import { ComposeWidget } from './components/widgets/ComposeWidget'
import { TrendingWidget } from './components/widgets/TrendingWidget'
import { SettingsPanel } from './components/settings/SettingsPanel'
import { useAutoRefresh } from './hooks/useAutoRefresh'
import { useCycling } from './hooks/useCycling'

export default function App() {
  const [size, setSize] = useState<WidgetSize>('4x4')
  const { theme, setResolvedTheme, activeType, setActiveType } = useWidgetStore()

  // Initialize background hooks
  useAutoRefresh()
  useCycling()

  useEffect(() => {
    // Determine widget type and configuration from URL query params
    const searchParams = new URLSearchParams(window.location.search)
    const type = searchParams.get('widgetType') as WidgetType
    if (type) {
      setActiveType(type)
    }

    // Monitor theme changes
    const applyTheme = (sysTheme: string) => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' && sysTheme === 'dark')
      
      setResolvedTheme(isDark ? 'dark' : 'light')
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    window.widgetAPI.getTheme().then(applyTheme)
    const cleanup = window.widgetAPI.onThemeChanged(applyTheme)
    return cleanup
  }, [theme, setActiveType, setResolvedTheme])

  // Responsive size listener
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      if (w <= 160 && h <= 160) setSize('1x1')
      else if (w <= 300 && h <= 160) setSize('2x1')
      else if (w <= 300 && h <= 300) setSize('2x2')
      else if (w > 300 && h <= 160) setSize('4x1')
      else if (w > 300 && h <= 300) setSize('4x2')
      else setSize('4x4')
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <WidgetShell size={size}>
      {activeType === 'timeline' && <TimelineWidget size={size} />}
      {activeType === 'notifications' && <NotificationsWidget size={size} />}
      {activeType === 'compose' && <ComposeWidget size={size} />}
      {activeType === 'trending' && <TrendingWidget size={size} />}
      {activeType === 'settings' && <SettingsPanel />}
    </WidgetShell>
  )
}
