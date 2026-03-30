import React, { useMemo } from 'react'
import type { WidgetSize } from '../../types/widget'
import { useWidgetStore } from '../../store/widget-store'
import { MOCK_TRENDING } from '../../lib/mock-data'
import { Search, MoreHorizontal, Settings2 } from 'lucide-react'
import { formatNumber } from '../../lib/utils'

interface TrendingWidgetProps {
  size: WidgetSize
}

export function TrendingWidget({ size }: TrendingWidgetProps) {
  const { trending } = useWidgetStore()
  
  const displayTrends = useMemo(() => {
    switch (size) {
      case '1x1': return []
      case '2x1': return MOCK_TRENDING.slice(0, 1)
      case '2x2': return MOCK_TRENDING.slice(0, 3)
      case '4x1': return MOCK_TRENDING.slice(0, 1) // Layout shifts to horizontal ticker later
      case '4x2': return MOCK_TRENDING.slice(0, 4)
      case '4x4': return MOCK_TRENDING.slice(0, 8)
      default: return MOCK_TRENDING.slice(0, 4)
    }
  }, [size])

  if (size === '1x1') {
    return (
      <div className="flex w-full h-full items-center justify-center relative bg-x-bg">
        <Search size={42} className="text-x-text" strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-3 pb-2 w-full no-drag flex justify-between items-center z-10">
        <h3 className="font-bold text-xl text-x-text">Explore</h3>
        <button className="text-x-text-secondary hover:text-x-text hover:bg-x-bg-hover transition rounded-full p-1.5 -mr-1.5">
          <Settings2 size={18} />
        </button>
      </div>

      <div className="px-3 pb-2 mt-1">
        <div className="relative group no-drag cursor-text" onClick={() => window.widgetAPI.openExternal('https://x.com/explore')}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-x-text-secondary group-focus-within:text-x-accent" />
          </div>
          <div className="block w-full pl-10 pr-3 py-2 bg-x-bg-secondary border border-transparent rounded-full text-sm placeholder-x-text-secondary group-focus-within:bg-x-bg group-focus-within:border-x-accent focus-within:ring-1 focus-within:ring-x-accent transition outline-none text-x-text">
            Search
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-drag">
        <div className="font-bold text-xl text-x-text px-3 py-3 border-t border-x-border mt-1">
          Trends for you
        </div>
        
        {displayTrends.map(trend => (
          <div key={trend.id} className="py-2.5 px-3 cursor-pointer hover:bg-x-bg-hover transition flex justify-between" onClick={() => window.widgetAPI.openExternal(trend.url)}>
            <div className="flex flex-col">
              <span className="text-[13px] text-x-text-secondary leading-tight flex items-center gap-1">
                {trend.rank} · {trend.category}
              </span>
              <span className="font-bold text-x-base text-x-text mt-0.5 leading-snug">
                {trend.name}
              </span>
              {trend.tweetVolume && (
                <span className="text-[13px] text-x-text-secondary mt-0.5 leading-tight">
                  {formatNumber(trend.tweetVolume)} posts
                </span>
              )}
            </div>
            <button className="text-x-text-secondary hover:text-x-accent hover:bg-[rgba(29,155,240,0.1)] rounded-full p-1.5 h-fit mt-[-4px] mr-[-4px] transition">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
