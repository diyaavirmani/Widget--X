import React, { useMemo } from 'react'
import type { WidgetSize } from '../../types/widget'
import { useWidgetStore } from '../../store/widget-store'
import { MOCK_NOTIFICATIONS } from '../../lib/mock-data'
import { cn, timeAgo } from '../../lib/utils'
import { HeartIcon, RepostIcon, ReplyIcon, BellIcon, VerifiedIcon } from '../icons/XIcons'
import { UserPlus } from 'lucide-react'

interface NotificationsWidgetProps {
  size: WidgetSize
}

export function NotificationsWidget({ size }: NotificationsWidgetProps) {
  const { notifications } = useWidgetStore()

  const displayNotifs = useMemo(() => {
    switch (size) {
      case '1x1': return []
      case '2x1': return MOCK_NOTIFICATIONS.slice(0, 1)
      case '2x2': return MOCK_NOTIFICATIONS.slice(0, 3)
      case '4x1': return MOCK_NOTIFICATIONS.slice(0, 1)
      case '4x2': return MOCK_NOTIFICATIONS.slice(0, 4)
      case '4x4': return MOCK_NOTIFICATIONS.slice(0, 8)
      default: return MOCK_NOTIFICATIONS.slice(0, 4)
    }
  }, [size])

  if (size === '1x1') {
    return (
      <div className="flex w-full h-full items-center justify-center relative bg-x-bg text-x-text">
        <BellIcon size={32} />
        {notifications.length > 0 && (
          <div className="absolute top-3 right-3 bg-x-accent text-white text-[11px] font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1">
            {notifications.length}
          </div>
        )}
      </div>
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <HeartIcon size={20} filled />
      case 'repost': return <div className="text-x-repost"><RepostIcon size={20} /></div>
      case 'reply': return <div className="text-x-accent"><ReplyIcon size={20} /></div>
      case 'mention': return <span className="text-x-accent font-bold text-lg">@</span>
      case 'follow': return <div className="text-x-accent"><UserPlus size={20} /></div>
      default: return null
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-x-bg text-x-text">
      {/* Header */}
      <div className="px-4 py-3 border-b border-x-border w-full sticky top-0 bg-x-bg/95 backdrop-blur-md z-10 flex justify-between items-center">
        <h3 className="text-xl font-bold">Notifications</h3>
        {notifications.length > 0 && (
          <span className="bg-x-accent text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
            {notifications.length}
          </span>
        )}
      </div>

      {/* Tabs */}
      {size !== '2x1' && size !== '4x1' && (
        <div className="flex border-b border-x-border shrink-0">
          <button className="flex-1 py-3 text-[15px] font-bold text-x-text cursor-pointer hover:bg-x-bg-hover transition">
            <span className="relative pb-3">
              All
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[4px] bg-x-accent rounded-full"></div>
            </span>
          </button>
          <button className="flex-1 py-3 text-[15px] font-bold text-x-text-secondary cursor-pointer hover:bg-x-bg-hover transition">
            Verified
          </button>
          <button className="flex-1 py-3 text-[15px] font-bold text-x-text-secondary cursor-pointer hover:bg-x-bg-hover transition">
            Mentions
          </button>
        </div>
      )}

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto">
        {displayNotifs.map(notif => (
          <div
            key={notif.id}
            className="px-4 py-3 border-b border-x-border cursor-pointer hover:bg-x-bg-hover/50 transition flex gap-3"
            onClick={() => window.widgetAPI.openExternal(notif.url)}
          >
            <div className="flex flex-col items-center pt-0.5 w-8 shrink-0">
              {getIcon(notif.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <img src={notif.actor.avatar} alt={notif.actor.name} className="w-8 h-8 rounded-full" />
              </div>

              {(notif.type === 'reply' || notif.type === 'mention') && notif.text ? (
                <div>
                  <div className="flex items-center gap-1 text-[15px] mb-0.5">
                    <span className="font-bold text-x-text">{notif.actor.name}</span>
                    {notif.actor.verified && <VerifiedIcon size={16} />}
                    <span className="text-x-text-secondary">@{notif.actor.handle.replace('@', '')}</span>
                    <span className="text-x-text-secondary">· {timeAgo(notif.createdAt)}</span>
                  </div>
                  <div className="text-[15px] text-x-text leading-5">{notif.text}</div>
                </div>
              ) : (
                <div className="text-[15px] text-x-text leading-5">
                  <span className="font-bold">{notif.actor.name}</span>
                  {notif.actor.verified && <span className="inline-block ml-1 align-middle"><VerifiedIcon size={14} /></span>}
                  {notif.type === 'like' && ' liked your post'}
                  {notif.type === 'repost' && ' reposted your post'}
                  {notif.type === 'follow' && ' followed you'}
                  {notif.postPreview && (
                    <div className="text-x-text-secondary text-[15px] mt-1 line-clamp-2 leading-5">{notif.postPreview}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
