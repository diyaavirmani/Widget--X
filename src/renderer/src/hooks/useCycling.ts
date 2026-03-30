import { useEffect } from 'react'
import { useWidgetStore } from '../store/widget-store'
import type { WidgetType } from '../types/widget'

const CYCLING_ORDER: WidgetType[] = ['timeline', 'notifications', 'trending'] // skip compose

export function useCycling() {
  const { cyclingEnabled, cyclingInterval, activeType, setActiveType } = useWidgetStore()

  useEffect(() => {
    if (!cyclingEnabled) return

    const timer = setInterval(() => {
      const currentIndex = CYCLING_ORDER.indexOf(activeType)
      const nextIndex = (currentIndex + 1) % CYCLING_ORDER.length
      setActiveType(CYCLING_ORDER[nextIndex])
    }, cyclingInterval * 1000)

    return () => clearInterval(timer)
  }, [cyclingEnabled, cyclingInterval, activeType, setActiveType])
}
