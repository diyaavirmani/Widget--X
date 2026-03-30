import React, { useMemo, useState } from 'react'
import type { WidgetSize } from '../../types/widget'
import { useWidgetStore } from '../../store/widget-store'
import { MOCK_POSTS } from '../../lib/mock-data'
import { cn, formatNumber, timeAgo } from '../../lib/utils'
import { ReplyIcon, RepostIcon, HeartIcon, ViewsIcon, BookmarkIcon, ShareIcon, VerifiedIcon, XLogoIcon } from '../icons/XIcons'

interface TimelineWidgetProps {
  size: WidgetSize
}

export function TimelineWidget({ size }: TimelineWidgetProps) {
  const { posts } = useWidgetStore()
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou')

  const displayPosts = useMemo(() => {
    switch (size) {
      case '1x1': return []
      case '2x1': return MOCK_POSTS.slice(0, 1)
      case '2x2': return MOCK_POSTS.slice(0, 2)
      case '4x1': return MOCK_POSTS.slice(0, 1)
      case '4x2': return MOCK_POSTS.slice(0, 3)
      case '4x4': return MOCK_POSTS.slice(0, 5)
      default: return MOCK_POSTS.slice(0, 5)
    }
  }, [size])

  if (size === '1x1') {
    return (
      <div className="flex w-full h-full items-center justify-center bg-x-bg">
        <XLogoIcon size={32} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full bg-x-bg text-x-text">
      {/* ── Tab Header ── */}
      {size !== '2x1' && size !== '4x1' && (
        <div className="flex border-b border-x-border w-full relative shrink-0 sticky top-0 bg-x-bg/95 backdrop-blur-md z-20">
          <button
            className={cn(
              "flex-1 py-3 text-[15px] font-bold hover:bg-x-bg-hover transition cursor-pointer",
              activeTab === 'forYou' ? "text-x-text" : "text-x-text-secondary"
            )}
            onClick={() => setActiveTab('forYou')}
          >
            <span className="relative pb-3">
              For you
              {activeTab === 'forYou' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[4px] bg-x-accent rounded-full"></div>
              )}
            </span>
          </button>
          <button
            className={cn(
              "flex-1 py-3 text-[15px] font-bold hover:bg-x-bg-hover transition cursor-pointer",
              activeTab === 'following' ? "text-x-text" : "text-x-text-secondary"
            )}
            onClick={() => setActiveTab('following')}
          >
            <span className="relative pb-3">
              Following
              {activeTab === 'following' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[72px] h-[4px] bg-x-accent rounded-full"></div>
              )}
            </span>
          </button>
        </div>
      )}

      {/* ── Posts ── */}
      <div className="flex-1 overflow-y-auto">
        {displayPosts.map(post => (
          <article
            key={post.id}
            className="px-4 py-3 border-b border-x-border cursor-pointer hover:bg-x-bg-hover/50 transition"
            onClick={() => window.widgetAPI.openExternal(post.url)}
          >
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="shrink-0">
                <img
                  src={post.author.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${post.author.handle}`}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Author line */}
                <div className="flex items-center gap-1 text-[15px] leading-5">
                  <span className="font-bold text-x-text truncate hover:underline">{post.author.name}</span>
                  {post.author.verified && <VerifiedIcon size={16} />}
                  <span className="text-x-text-secondary truncate">@{post.author.handle.replace('@', '')}</span>
                  <span className="text-x-text-secondary">·</span>
                  <span className="text-x-text-secondary hover:underline">{timeAgo(post.createdAt)}</span>
                </div>

                {/* Tweet text */}
                <div className={cn(
                  "text-[15px] text-x-text mt-0.5 leading-5 break-words",
                  (size === '2x1' || size === '4x1') ? "line-clamp-1" :
                  size === '2x2' ? "line-clamp-2" : ""
                )}>
                  {post.text}
                </div>

                {/* Media */}
                {post.media && size !== '2x1' && size !== '4x1' && (
                  <div className="mt-3 rounded-2xl overflow-hidden border border-x-border max-h-[180px]">
                    <img src={post.media[0].url} alt="Media" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* ── Engagement Bar (matches X exactly) ── */}
                {size !== '2x1' && size !== '4x1' && (
                  <div className="flex justify-between items-center text-x-text-secondary mt-3 max-w-[425px] -ml-2">
                    {/* Reply */}
                    <div className="flex items-center gap-0.5 group cursor-pointer">
                      <div className="p-2 rounded-full group-hover:bg-x-accent/10 group-hover:text-x-accent transition">
                        <ReplyIcon size={17} />
                      </div>
                      <span className="text-[13px] group-hover:text-x-accent">{formatNumber(post.metrics.replies)}</span>
                    </div>
                    {/* Repost */}
                    <div className="flex items-center gap-0.5 group cursor-pointer">
                      <div className="p-2 rounded-full group-hover:bg-x-repost/10 group-hover:text-x-repost transition">
                        <RepostIcon size={17} />
                      </div>
                      <span className="text-[13px] group-hover:text-x-repost">{formatNumber(post.metrics.reposts)}</span>
                    </div>
                    {/* Like */}
                    <div className="flex items-center gap-0.5 group cursor-pointer">
                      <div className="p-2 rounded-full group-hover:bg-x-like/10 group-hover:text-x-like transition">
                        <HeartIcon size={17} />
                      </div>
                      <span className="text-[13px] group-hover:text-x-like">{formatNumber(post.metrics.likes)}</span>
                    </div>
                    {/* Views */}
                    <div className="flex items-center gap-0.5 group cursor-pointer">
                      <div className="p-2 rounded-full group-hover:bg-x-accent/10 group-hover:text-x-accent transition">
                        <ViewsIcon size={17} />
                      </div>
                      <span className="text-[13px] group-hover:text-x-accent">{formatNumber(post.metrics.views)}</span>
                    </div>
                    {/* Bookmark + Share */}
                    <div className="flex items-center gap-0">
                      <div className="p-2 rounded-full hover:bg-x-accent/10 hover:text-x-accent transition cursor-pointer">
                        <BookmarkIcon size={17} />
                      </div>
                      <div className="p-2 rounded-full hover:bg-x-accent/10 hover:text-x-accent transition cursor-pointer">
                        <ShareIcon size={17} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
