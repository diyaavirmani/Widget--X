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
import { HomeIcon, SearchIcon, BellIcon, ComposeIcon, XLogoIcon } from './components/icons/XIcons'

export default function App() {
  const [size, setSize] = useState<WidgetSize>('4x4')
  const { theme, setResolvedTheme, activeType, setActiveType, isAuthenticated, setIsAuthenticated } = useWidgetStore()

  useAutoRefresh()
  useCycling()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const type = searchParams.get('widgetType') as WidgetType
    if (type) setActiveType(type)

    const applyTheme = (sysTheme: string) => {
      const isDark = theme === 'dark' || (theme === 'system' && sysTheme === 'dark')
      setResolvedTheme(isDark ? 'dark' : 'light')
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    window.widgetAPI.getTheme().then(applyTheme)
    const cleanupTheme = window.widgetAPI.onThemeChanged(applyTheme)
    window.widgetAPI.getAuthStatus().then((status: { authenticated: boolean }) => setIsAuthenticated(status.authenticated))
    const cleanupAuth = window.widgetAPI.onAuthSuccess(() => setIsAuthenticated(true))

    return () => { cleanupTheme(); cleanupAuth() }
  }, [theme, setActiveType, setResolvedTheme, setIsAuthenticated])

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

  const navItems: { type: WidgetType; label: string; Icon: React.FC<any> }[] = [
    { type: 'timeline', label: 'Home', Icon: HomeIcon },
    { type: 'trending', label: 'Explore', Icon: SearchIcon },
    { type: 'notifications', label: 'Notifications', Icon: BellIcon },
    { type: 'compose', label: 'Post', Icon: ComposeIcon },
  ]

  const isCompact = size === '1x1' || size === '2x1' || size === '4x1'

  return (
    <WidgetShell size={size}>
      <div className="flex h-full w-full bg-x-bg">
        {/* ── Left Sidebar (visible on larger sizes) ── */}
        {!isCompact && size !== '2x2' && (
          <div className="w-[52px] shrink-0 flex flex-col items-center py-2 border-r border-x-border gap-1">
            {/* X Logo */}
            <div className="p-2 mb-1">
              <XLogoIcon size={22} />
            </div>

            {/* Navigation Icons */}
            {navItems.map(item => (
              <button
                key={item.type}
                onClick={() => setActiveType(item.type)}
                className={`p-2.5 rounded-full transition-colors cursor-pointer
                  ${activeType === item.type
                    ? 'bg-x-bg-hover text-x-text'
                    : 'text-x-text-secondary hover:bg-x-bg-hover hover:text-x-text'
                  }`}
                title={item.label}
              >
                <item.Icon size={22} active={activeType === item.type} />
              </button>
            ))}
          </div>
        )}

        {/* ── Main Content ── */}
        <div className="flex-1 overflow-hidden min-w-0 flex flex-col">
          <div className="flex-1 overflow-hidden">
            {activeType === 'timeline' && <TimelineWidget size={size} />}
            {activeType === 'notifications' && <NotificationsWidget size={size} />}
            {activeType === 'compose' && <ComposeWidget size={size} />}
            {activeType === 'trending' && <TrendingWidget size={size} />}
            {activeType === 'settings' && <SettingsPanel />}
          </div>

          {/* ── Bottom Nav for compact sizes that hide the sidebar ── */}
          {(isCompact || size === '2x2') && activeType !== 'settings' && !isCompact && (
            <div className="flex items-center justify-around border-t border-x-border bg-x-bg py-1 shrink-0">
              {navItems.map(item => (
                <button
                  key={item.type}
                  onClick={() => setActiveType(item.type)}
                  className={`p-2 rounded-full transition-colors cursor-pointer
                    ${activeType === item.type
                      ? 'text-x-text'
                      : 'text-x-text-secondary hover:text-x-text hover:bg-x-bg-hover'
                    }`}
                >
                  <item.Icon size={20} active={activeType === item.type} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </WidgetShell>
  )
}
