import { useEffect, useState } from 'react'
import { useWidgetStore } from './store/widget-store'
import type { WidgetType, WidgetSize } from './types/widget'
import { WidgetShell } from './components/widgets/WidgetShell'
import { TimelineWidget } from './components/widgets/TimelineWidget'
import { NotificationsWidget } from './components/widgets/NotificationsWidget'
import { ComposeWidget } from './components/widgets/ComposeWidget'
import { TrendingWidget } from './components/widgets/TrendingWidget'
import { SettingsPanel } from './components/settings/SettingsPanel'
import { LoginScreen } from './components/auth/LoginScreen'
import { useAutoRefresh } from './hooks/useAutoRefresh'
import { useCycling } from './hooks/useCycling'

export default function App() {
  const [size, setSize] = useState<WidgetSize>('4x4')
  const { theme, setResolvedTheme, activeType, setActiveType, isAuthenticated, setIsAuthenticated } = useWidgetStore()

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
    const cleanupTheme = window.widgetAPI.onThemeChanged(applyTheme)
    
    // Auth logic
    window.widgetAPI.getAuthStatus().then((status: { authenticated: boolean }) => setIsAuthenticated(status.authenticated))
    const cleanupAuth = window.widgetAPI.onAuthSuccess(() => setIsAuthenticated(true))

    return () => {
      cleanupTheme()
      cleanupAuth()
    }
  }, [theme, setActiveType, setResolvedTheme, setIsAuthenticated])

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

  if (!isAuthenticated) {
    return (
      <WidgetShell size={size}>
        <LoginScreen />
      </WidgetShell>
    )
  }

  // Navigation bar at the bottom for switching widgets manually
  const navItems: { type: WidgetType; label: string }[] = [
    { type: 'timeline', label: '🏠' },
    { type: 'notifications', label: '🔔' },
    { type: 'trending', label: '🔍' },
    { type: 'compose', label: '✍️' },
  ]

  return (
    <WidgetShell size={size}>
      <div className="flex flex-col h-full w-full">
        {/* Active Widget Content */}
        <div className="flex-1 overflow-hidden">
          {activeType === 'timeline' && <TimelineWidget size={size} />}
          {activeType === 'notifications' && <NotificationsWidget size={size} />}
          {activeType === 'compose' && <ComposeWidget size={size} />}
          {activeType === 'trending' && <TrendingWidget size={size} />}
          {activeType === 'settings' && <SettingsPanel />}
        </div>

        {/* Bottom Navigation Bar — clickable tabs to switch between widgets */}
        {size !== '1x1' && size !== '2x1' && size !== '4x1' && activeType !== 'settings' && (
          <div className="flex items-center justify-around border-t border-x-border bg-x-bg/60 backdrop-blur-lg py-1.5 shrink-0">
            {navItems.map(item => (
              <button
                key={item.type}
                onClick={() => setActiveType(item.type)}
                className={`flex-1 text-center py-1.5 text-lg transition-all rounded-lg mx-0.5 cursor-pointer
                  ${activeType === item.type 
                    ? 'bg-x-accent/15 scale-110' 
                    : 'hover:bg-x-bg-hover opacity-60 hover:opacity-100'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </WidgetShell>
  )
}
