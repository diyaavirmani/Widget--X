import React, { useState, useRef, useCallback, useEffect } from 'react'
import type { WidgetSize } from '../../types/widget'
import { useWidgetStore } from '../../store/widget-store'
import { Settings, GripHorizontal, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface WidgetShellProps {
  size: WidgetSize
  children: React.ReactNode
}

export function WidgetShell({ size, children }: WidgetShellProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { setActiveType } = useWidgetStore()

  // ── Manual drag logic (works on frameless transparent windows) ──
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })

  const onDragStart = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    dragStart.current = { x: e.screenX, y: e.screenY }
    document.addEventListener('mousemove', onDragMove as any)
    document.addEventListener('mouseup', onDragEnd as any)
  }, [])

  const onDragMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return
    const dx = e.screenX - dragStart.current.x
    const dy = e.screenY - dragStart.current.y
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      dragStart.current = { x: e.screenX, y: e.screenY }
      // Move the window by the delta
      window.widgetAPI.moveWindow(dx, dy)
    }
  }, [])

  const onDragEnd = useCallback(() => {
    isDragging.current = false
    document.removeEventListener('mousemove', onDragMove as any)
    document.removeEventListener('mouseup', onDragEnd as any)
  }, [])

  // ── Manual resize logic ──
  const isResizing = useRef(false)
  const resizeStart = useRef({ x: 0, y: 0 })

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    isResizing.current = true
    resizeStart.current = { x: e.screenX, y: e.screenY }
    document.addEventListener('mousemove', onResizeMove as any)
    document.addEventListener('mouseup', onResizeEnd as any)
  }, [])

  const onResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return
    const dx = e.screenX - resizeStart.current.x
    const dy = e.screenY - resizeStart.current.y
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      resizeStart.current = { x: e.screenX, y: e.screenY }
      window.widgetAPI.resizeWindow(dx, dy)
    }
  }, [])

  const onResizeEnd = useCallback(() => {
    isResizing.current = false
    document.removeEventListener('mousemove', onResizeMove as any)
    document.removeEventListener('mouseup', onResizeEnd as any)
  }, [])

  const handleClose = () => {
    window.widgetAPI.close()
  }

  const handleSettings = () => {
    setActiveType('settings')
  }

  return (
    <div
      className="widget-glass w-full h-full relative overflow-hidden transition-all duration-200 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Drag Handle Bar (top) ── */}
      <div
        className={cn(
          "w-full flex items-center justify-between px-2 shrink-0 select-none transition-all duration-200 cursor-grab active:cursor-grabbing",
          isHovered ? "h-7 opacity-100" : "h-3 opacity-0"
        )}
        onMouseDown={onDragStart}
      >
        <GripHorizontal size={14} className="text-x-text-secondary mx-auto" />

        {/* Control Buttons */}
        <div className="flex items-center space-x-1 absolute top-1 right-2 z-50">
          <button
            className="text-x-text-secondary hover:text-x-text hover:bg-x-border p-1 rounded-full bg-x-bg/80 backdrop-blur-sm transition-colors cursor-pointer"
            onClick={handleSettings}
            onMouseDown={e => e.stopPropagation()}
            title="Settings"
          >
            <Settings size={13} />
          </button>
          <button
            className="text-x-text-secondary hover:text-white hover:bg-x-danger p-1 rounded-full bg-x-bg/80 backdrop-blur-sm transition-colors cursor-pointer"
            onClick={handleClose}
            onMouseDown={e => e.stopPropagation()}
            title="Close Widget"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-hidden min-h-0">
        {children}
      </div>

      {/* ── Resize Handle (Bottom-Right Corner) ── */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-5 h-5 z-50 cursor-se-resize transition-opacity duration-200 flex items-end justify-end pr-0.5 pb-0.5",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onMouseDown={onResizeStart}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" className="text-x-text-secondary opacity-60">
          <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" />
          <line x1="9" y1="5" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}
