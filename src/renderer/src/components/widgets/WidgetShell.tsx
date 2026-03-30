import React, { useState } from 'react'
import type { WidgetSize } from '../../types/widget'
import { useWidgetStore } from '../../store/widget-store'
import { Settings, Maximize2, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface WidgetShellProps {
  size: WidgetSize
  children: React.ReactNode
}

export function WidgetShell({ size, children }: WidgetShellProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { setActiveType } = useWidgetStore()

  const handleClose = () => {
    window.widgetAPI.close()
  }

  const handleSettings = () => {
    setActiveType('settings')
  }

  return (
    <div 
      className={cn(
        "widget-glass drag-region w-full h-full relative overflow-hidden transition-all duration-200 group",
        size === '1x1' ? 'p-0' : 'p-0'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Control Buttons (Close, Settings) visible only on hover */}
      <div 
        className={cn(
          "absolute top-2 right-2 flex items-center space-x-1 z-50 transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          className="no-drag text-x-text-secondary hover:text-x-text hover:bg-x-border p-1.5 rounded-full bg-x-bg/80 backdrop-blur-sm transition-colors cursor-pointer"
          onClick={handleSettings}
          title="Settings"
        >
          <Settings size={14} />
        </button>
        <button 
          className="no-drag text-x-text-secondary hover:text-white hover:bg-x-danger p-1.5 rounded-full bg-x-bg/80 backdrop-blur-sm transition-colors cursor-pointer"
          onClick={handleClose}
          title="Close Widget"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content wrapper — no-drag so all buttons/scroll inside work */}
      <div className="w-full h-full relative z-10 no-drag">
        {children}
      </div>
      
      {/* Resize Handle (Bottom-Right) */}
      <div 
        className={cn(
          "absolute bottom-0 right-0 w-4 h-4 z-50 cursor-se-resize transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Maximize2 size={12} className="text-x-text-secondary opacity-50 m-auto mt-1 ml-1" />
      </div>
    </div>
  )
}
