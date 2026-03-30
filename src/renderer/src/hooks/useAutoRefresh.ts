import { useEffect } from 'react'
import { useWidgetStore } from '../store/widget-store'

export function useAutoRefresh() {
  const { refreshInterval } = useWidgetStore()

  useEffect(() => {
    // In here we would hit the X API to fetch new posts, etc.
    const timer = setInterval(() => {
      console.log('Auto-refreshing data...')
      // trigger refresh action
    }, refreshInterval * 1000)

    return () => clearInterval(timer)
  }, [refreshInterval])
}
