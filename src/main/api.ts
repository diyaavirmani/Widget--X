import { TwitterApi } from 'twitter-api-v2'
import { initStore } from './store'
import dotenv from 'dotenv'

dotenv.config()

// This matches our unified widget 'Post' schema shape
export interface WidgetPost {
  id: string
  text: string
  author: {
    name: string
    handle: string
    avatar: string
    verified: boolean
  }
  media?: Array<{ type: 'image' | 'video'; url: string }>
  metrics: {
    replies: number
    reposts: number
    likes: number
    views: number
  }
  createdAt: string
  url: string
}

export async function fetchTimeline(): Promise<WidgetPost[]> {
  const store = initStore()
  const token = (store.get('auth.accessToken') as string) || process.env.X_BEARER_TOKEN

  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const client = new TwitterApi(token)
    
    // First, try to get the user's authentic home timeline (Requires OAuth2 PKCE User-Auth)
    // If it fails (e.g., using an App-Only Bearer Token), crash gracefully to catch block
    
    // As a robust hack for users bypassing dev login with just a bearer token, we will ping 'Twitter' or 'ElonMusk' as a mock "Live" timeline or attempt to find their own user if possible.
    // For our actual implementation, we will query Twitter V2 search to get popular recent tweets to serve as the feed if homeTimeline fails.
    
    let rawTweets: any = []
    let includes: any = {}

    try {
      // Attempt true OAuth2 reverse chronological timeline
      const me = await client.v2.me()
      const home = await client.v2.homeTimeline({
        max_results: 15,
        'tweet.fields': ['created_at', 'public_metrics'],
        'user.fields': ['profile_image_url', 'verified'],
        expansions: ['author_id', 'attachments.media_keys'],
        'media.fields': ['url', 'preview_image_url', 'type']
      })
      rawTweets = home.tweets
      includes = home.includes
    } catch (err: any) {
      // Fallback: The user is using an App-Only generated Bearer token (Dev Bypass), 
      // which does not have permission to read "Home Timeline".
      // We will fetch a dynamic search feed instead to provide LIVE DATA.
      console.log('App-Only token detected or rate limited. Falling back to global search...')
      const search = await client.v2.search('tech OR design has:images -is:retweet', {
        max_results: 15,
        'tweet.fields': ['created_at', 'public_metrics'],
        'user.fields': ['profile_image_url', 'verified'],
        expansions: ['author_id', 'attachments.media_keys'],
        'media.fields': ['url', 'preview_image_url', 'type']
      })
      rawTweets = search.tweets
      includes = search.includes
    }

    if (!rawTweets || rawTweets.length === 0) {
      return []
    }

    // Map the complex Twitter V2 payload into our clean WidgetPost format
    const posts: WidgetPost[] = rawTweets.map((tweet: any) => {
      // Find Author
      const authorId = tweet.author_id
      const authorRecord = includes?.users?.find((u: any) => u.id === authorId)
      
      // Find Media
      let mediaOutput: Array<{ type: 'image' | 'video'; url: string }> | undefined = undefined
      if (tweet.attachments?.media_keys && includes?.media) {
        mediaOutput = tweet.attachments.media_keys.map((key: string) => {
          const m = includes.media.find((mediaItem: any) => mediaItem.media_key === key)
          return {
            type: m?.type === 'video' ? 'video' : 'image',
            url: m?.url || m?.preview_image_url || ''
          }
        }).filter((m: any) => m.url)
      }

      return {
        id: tweet.id,
        text: tweet.text,
        author: {
          name: authorRecord?.name || 'Unknown User',
          handle: authorRecord?.username || 'user',
          avatar: authorRecord?.profile_image_url || `https://api.dicebear.com/6.x/avataaars/svg?seed=${tweet.id}`,
          verified: authorRecord?.verified || false
        },
        metrics: {
          replies: tweet.public_metrics?.reply_count || 0,
          reposts: tweet.public_metrics?.retweet_count || 0,
          likes: tweet.public_metrics?.like_count || 0,
          views: tweet.public_metrics?.impression_count || 0
        },
        createdAt: tweet.created_at || new Date().toISOString(),
        url: `https://twitter.com/${authorRecord?.username}/status/${tweet.id}`,
        media: mediaOutput?.length ? mediaOutput : undefined
      }
    })

    return posts

  } catch (error) {
    console.error('Failed to fetch Twitter data:', error)
    return []
  }
}
