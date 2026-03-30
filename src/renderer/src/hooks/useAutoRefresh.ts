import { useEffect } from 'react'
import { useWidgetStore } from '../store/widget-store'

export function useAutoRefresh() {
  const { refreshInterval, setPosts, setNotifications, setTrending } = useWidgetStore()

  useEffect(() => {
    // On each tick, try to fetch real data from the Main process via IPC.
    // If the IPC call fails (no token / no handler), we silently keep existing data.
    const fetchData = async () => {
      try {
        if (window.widgetAPI && typeof window.widgetAPI.getTimeline === 'function') {
          const posts = await window.widgetAPI.getTimeline()
          if (posts && posts.length > 0) {
            setPosts(posts)
          }
        }
      } catch (e) {
        // Silently continue with existing mock/cached data
        console.log('Auto-refresh: using cached data')
      }
    }

    // Initial fetch
    fetchData()

    // Periodic refresh
    const timer = setInterval(fetchData, refreshInterval * 1000)
    return () => clearInterval(timer)
  }, [refreshInterval, setPosts, setNotifications, setTrending])
}
