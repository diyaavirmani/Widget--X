import React, { useMemo } from 'react'
import type { WidgetSize } from '../../types/widget'
import { useWidgetStore } from '../../store/widget-store'
import { MOCK_POSTS } from '../../lib/mock-data'
import { Heart, MessageCircle, Repeat2, BarChart2, CheckCircle2 } from 'lucide-react'
import { cn, formatNumber, timeAgo } from '../../lib/utils'

interface TimelineWidgetProps {
  size: WidgetSize
}

export function TimelineWidget({ size }: TimelineWidgetProps) {
  const { posts } = useWidgetStore()
  
  // Decide how many posts to show based on size
  const displayPosts = useMemo(() => {
    switch (size) {
      case '1x1': return []
      case '2x1': return MOCK_POSTS.slice(0, 1)
      case '2x2': return MOCK_POSTS.slice(0, 1) // Just 1 to fit layout comfortably
      case '4x1': return MOCK_POSTS.slice(0, 1) // scrolling ticker (wip)
      case '4x2': return MOCK_POSTS.slice(0, 2)
      case '4x4': return MOCK_POSTS.slice(0, 4)
      default: return MOCK_POSTS.slice(0, 4)
    }
  }, [size])

  // 1x1 mode just shows the X logo
  if (size === '1x1') {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-12 h-12 fill-current text-x-text">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.75H5.03z"></path>
          </g>
        </svg>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Tabs */}
      {size !== '2x1' && size !== '4x1' && (
        <div className="flex border-b border-x-border w-full no-drag relative z-20 shrink-0">
          <button className="flex-1 font-bold text-x-sm py-3 text-x-text hover:bg-x-bg-hover transition">
            <span className="relative">
              For you
              <div className="absolute -bottom-[13px] left-0 w-full h-[4px] bg-x-accent rounded-full"></div>
            </span>
          </button>
          <button className="flex-1 font-medium text-x-text-secondary text-x-sm py-3 hover:bg-x-bg-hover transition">
            Following
          </button>
        </div>
      )}

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto no-drag pt-1">
        {displayPosts.map(post => (
          <div key={post.id} className="p-3 border-b border-x-border cursor-pointer hover:bg-x-bg-hover transition" onClick={() => window.widgetAPI.openExternal(post.url)}>
            <div className="flex gap-2">
              {/* Avatar - hide on smallest vertical sizes if too tight */}
              <div className="shrink-0 pt-1">
                <img src={post.author.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${post.author.handle}`} alt={post.author.name} className="w-10 h-10 rounded-full" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-x-sm overflow-hidden whitespace-nowrap">
                  <span className="font-bold text-x-text truncate">{post.author.name}</span>
                  {post.author.verified && <CheckCircle2 size={14} className="text-x-accent shrink-0" fill="currentColor" stroke="white" />}
                  <span className="text-x-text-secondary truncate">{post.author.handle}</span>
                  <span className="text-x-text-secondary">·</span>
                  <span className="text-x-text-secondary">{timeAgo(post.createdAt)}</span>
                </div>

                <div className={cn(
                  "text-x-base text-x-text mt-1 leading-snug break-words",
                  (size === '2x1' || size === '4x1') ? "line-clamp-1" : 
                  (size === '2x2') ? "line-clamp-3" : ""
                )}>
                  {post.text}
                </div>

                {/* Media */}
                {post.media && size !== '2x1' && size !== '4x1' && (
                  <div className="mt-2 rounded-2xl overflow-hidden border border-x-border max-h-[140px]">
                    <img src={post.media[0].url} alt="Media" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Engagement Bar */}
                {size !== '2x1' && size !== '4x1' && (
                  <div className="flex justify-between items-center text-x-text-secondary mt-3 max-w-[420px]">
                    <div className="flex items-center gap-1.5 hover:text-x-accent transition group">
                      <div className="p-1.5 rounded-full group-hover:bg-[#1d9bf01a]">
                        <MessageCircle size={16} />
                      </div>
                      <span className="text-[13px]">{formatNumber(post.metrics.replies)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-x-repost transition group">
                      <div className="p-1.5 rounded-full group-hover:bg-[#00ba7c1a]">
                        <Repeat2 size={16} />
                      </div>
                      <span className="text-[13px]">{formatNumber(post.metrics.reposts)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-x-like transition group">
                      <div className="p-1.5 rounded-full group-hover:bg-[#f918801a]">
                        <Heart size={16} />
                      </div>
                      <span className="text-[13px]">{formatNumber(post.metrics.likes)}</span>
                    </div>
                    {size === '4x4' && (
                      <div className="flex items-center gap-1.5 hover:text-x-accent transition group">
                        <div className="p-1.5 rounded-full group-hover:bg-[#1d9bf01a]">
                          <BarChart2 size={16} />
                        </div>
                        <span className="text-[13px]">{formatNumber(post.metrics.views)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
