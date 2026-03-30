import React, { useState } from 'react'
import type { WidgetSize } from '../../types/widget'
import { Settings, Maximize2, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface WidgetShellProps {
  size: WidgetSize
  children: React.ReactNode
}

export function WidgetShell({ size, children }: WidgetShellProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false)

  const handleClose = () => {
    window.widgetAPI.close()
  }

  const handleSettings = () => {
    // We will hook this up to the main process to spawn a settings window
    // window.widgetAPI.openExternal('app://settings')
  }

  return (
    <div 
      className={cn(
        "widget-glass w-full h-full relative overflow-hidden transition-all duration-200",
        size === '1x1' ? 'p-0' : 'p-3'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag Region handles window movement */}
      <div className="absolute top-0 left-0 w-full h-6 drag-region z-50 flex items-center justify-between px-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
      </div>

      {/* Control Buttons (Close, Settings) visible only on hover over the entire widget wrapper */}
      <div 
        className={cn(
          "absolute top-2 right-2 flex items-center space-x-1 z-50 transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          className="no-drag text-x-text-secondary hover:text-x-text hover:bg-x-border p-1 rounded-full bg-x-bg transition-colors"
          onClick={handleSettings}
        >
          <Settings size={14} />
        </button>
        <button 
          className="no-drag text-x-text-secondary hover:text-white hover:bg-x-danger p-1 rounded-full bg-x-bg transition-colors"
          onClick={handleClose}
        >
          <X size={14} />
        </button>
      </div>

      {/* Content wrapper */}
      <div className="w-full h-full relative z-10">
        {children}
      </div>
      
      {/* Resize Handle (Bottom-Right) */}
      <div 
        className={cn(
          "absolute bottom-0 right-0 w-4 h-4 z-50 cursor-se-resize drag-region transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Maximize2 size={12} className="text-x-text-secondary opacity-50 m-auto mt-1 ml-1" />
      </div>
    </div>
  )
}
