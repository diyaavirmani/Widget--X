import React, { useState } from 'react'
import type { WidgetSize } from '../../types/widget'
import { Image, AlignLeft, ListTodo, MapPin, Feather, Sparkles, Smile, MessageCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ComposeWidgetProps {
  size: WidgetSize
}

export function ComposeWidget({ size }: ComposeWidgetProps): JSX.Element {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const maxLength = 280
  const currentLength = text.length
  
  // Minimal FAB 1x1 mode
  if (size === '1x1' || size === '2x1') {
    return (
      <div 
        className="flex w-full h-full items-center justify-center relative cursor-pointer group no-drag"
        onClick={() => {
          // Send IPC to main to expand or spawn a compose window
        }}
      >
        <div className="w-14 h-14 bg-x-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-x-accent-hover transition-colors">
          <Feather size={24} strokeWidth={2.5} />
        </div>
      </div>
    )
  }

  const handlePost = () => {
    if (text.trim().length > 0) {
      window.widgetAPI.openExternal(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`)
      setText('')
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-x-bg no-drag p-3 rounded-lg overflow-hidden">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="shrink-0 pt-1">
          <div className="w-10 h-10 rounded-full bg-x-bg-secondary border border-x-border flex items-center justify-center overflow-hidden">
             {/* Use generic avatar since we don't have user context loaded in mock yet */}
             <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 fill-current text-x-text-secondary">
               <g>
                 <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-13c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 4.5c-.827 0-1.5-.673-1.5-1.5S11.173 5.5 12 5.5s1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm6.059 8.018l-1.028-.853c-.347-.282-.647-.525-.788-.525-.139 0-.294.137-.481.282A5.95 5.95 0 0112 19c-1.638 0-3.13-.65-4.224-1.705l-.462-.486c-.158-.166-.277-.291-.397-.291-.122 0-.309.117-.5.274l-1.01.838c.614.77 1.569 1.488 2.659 1.933A7.906 7.906 0 0012 20c1.558 0 3.013-.44 4.25-1.21.996-.62 1.831-1.353 2.124-1.664a.2.2 0 00-.315-.108z"></path>
               </g>
             </svg>
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Privacy Dropdown Mock */}
          {(size === '4x2' || size === '4x4') && (
            <div className="mb-2">
              <button className="flex items-center gap-1 text-x-accent font-bold text-sm px-3 py-0.5 rounded-full border border-[rgba(29,155,240,0.3)] hover:bg-[rgba(29,155,240,0.1)] transition w-max">
                Everyone <span className="text-[10px]">▼</span>
              </button>
            </div>
          )}

          <textarea
            className="w-full bg-transparent border-none outline-none resize-none text-xl text-x-text placeholder-x-text-secondary font-medium pb-2 scrollbar-none"
            placeholder="What is happening?!"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={size === '4x4' ? 6 : size === '2x2' ? 3 : 2}
            maxLength={maxLength}
          />
        </div>
      </div>

      <div className="mt-auto border-t border-x-border pt-2 flex flex-col gap-2">
        {isFocused && (
          <div className="flex items-center gap-1.5 text-x-accent font-bold text-sm px-2 pb-1 hover:bg-[rgba(29,155,240,0.1)] transition w-max rounded-full cursor-pointer">
            <MessageCircle size={14} fill="currentColor" className="text-x-accent" /> Everyone can reply
          </div>
        )}

        <div className="flex justify-between items-center w-full">
          {/* Toolbar */}
          <div className="flex items-center space-x-0.5">
            <button className="text-x-accent p-2 rounded-full hover:bg-[rgba(29,155,240,0.1)] transition" disabled={size === '2x2'}>
              <Image size={18} />
            </button>
            <button className="text-x-accent p-2 rounded-full hover:bg-[rgba(29,155,240,0.1)] transition" disabled={size === '2x2'}>
              <ListTodo size={18} />
            </button>
            <button className="text-x-accent p-2 rounded-full hover:bg-[rgba(29,155,240,0.1)] transition" disabled={size === '2x2'}>
              <Smile size={18} />
            </button>
            <button className="text-x-accent p-2 rounded-full hover:bg-[rgba(29,155,240,0.1)] transition shrink-0">
              <Sparkles size={18} />
            </button>
            {(size === '4x4' || size === '4x2') && (
              <button className="text-x-accent p-2 rounded-full hover:bg-[rgba(29,155,240,0.1)] transition">
                <MapPin size={18} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Progress / Character count */}
            {currentLength > 0 && (
              <div className={cn(
                "text-sm font-medium pr-2 border-r border-x-border",
                currentLength >= maxLength ? "text-x-danger" : "text-x-text-secondary"
              )}>
                {maxLength - currentLength}
              </div>
            )}
            <button
              className={cn(
                "font-bold text-[15px] px-4 py-1.5 rounded-full transition-colors focus:outline-none",
                currentLength > 0
                  ? "bg-x-accent text-white hover:bg-x-accent-hover"
                  : "bg-x-accent opacity-50 cursor-not-allowed text-white"
              )}
              onClick={handlePost}
              disabled={currentLength === 0}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
