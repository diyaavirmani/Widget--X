import React, { useMemo } from 'react'
import type { WidgetSize } from '../../types/widget'
import { useWidgetStore } from '../../store/widget-store'
import { MOCK_NOTIFICATIONS } from '../../lib/mock-data'
import { Heart, Repeat2, MessageCircle, UserPlus, Bell } from 'lucide-react'
import { cn, timeAgo } from '../../lib/utils'

interface NotificationsWidgetProps {
  size: WidgetSize
}

export function NotificationsWidget({ size }: NotificationsWidgetProps): JSX.Element {
  const { notifications } = useWidgetStore()
  
  // Decide how many to show
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
      <div className="flex w-full h-full items-center justify-center relative">
        <Bell size={42} className="text-x-text" strokeWidth={1.5} />
        {notifications.length > 0 && (
          <div className="absolute top-2 right-2 bg-x-danger text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-x-bg">
            {notifications.length}
          </div>
        )}
      </div>
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart size={20} fill="currentColor" className="text-x-like" />
      case 'repost': return <Repeat2 size={20} className="text-x-repost" />
      case 'reply': return <MessageCircle size={20} fill="currentColor" className="text-x-accent" />
      case 'mention': return <span className="text-x-accent font-bold text-lg">@</span>
      case 'follow': return <UserPlus size={20} fill="currentColor" className="text-[var(--x-accent)]" />
      default: return null
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-3 border-b border-x-border w-full no-drag font-bold text-lg text-x-text sticky top-0 bg-transparent flex justify-between items-center z-10">
        <h3>Notifications</h3>
        {notifications.length > 0 && (
          <span className="bg-x-danger text-white text-xs px-2 py-0.5 rounded-full">
            {notifications.length} new
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-drag">
        {displayNotifs.map(notif => (
          <div key={notif.id} className="p-3 border-b border-x-border cursor-pointer hover:bg-x-bg-hover transition flex gap-3" onClick={() => window.widgetAPI.openExternal(notif.url)}>
            <div className="flex flex-col items-end pt-1 w-8 shrink-0">
              {getIcon(notif.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <img src={notif.actor.avatar} alt={notif.actor.name} className="w-8 h-8 rounded-full" />
              </div>
              
              {(notif.type === 'reply' || notif.type === 'mention') && notif.text ? (
                <div>
                  <div className="flex items-center gap-1 text-x-sm mb-1">
                    <span className="font-bold text-x-text">{notif.actor.name}</span>
                    <span className="text-x-text-secondary">{notif.actor.handle}</span>
                    <span className="text-x-text-secondary">· {timeAgo(notif.createdAt)}</span>
                  </div>
                  <div className="text-x-base text-x-text leading-snug">{notif.text}</div>
                </div>
              ) : (
                <div className="text-x-base text-x-text leading-snug">
                  <span className="font-bold">{notif.actor.name}</span>
                  {notif.type === 'like' && ' liked your post'}
                  {notif.type === 'repost' && ' reposted your post'}
                  {notif.type === 'follow' && ' followed you'}
                  {notif.postPreview && <div className="text-x-text-secondary text-x-sm mt-1 line-clamp-2">{notif.postPreview}</div>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
