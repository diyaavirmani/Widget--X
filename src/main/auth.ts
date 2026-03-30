import { shell, WebContents } from 'electron'
import http from 'http'
import crypto from 'crypto'
import { URL } from 'url'
import { initStore } from './store'
import dotenv from 'dotenv'

dotenv.config()

const CLIENT_ID = process.env.X_CLIENT_ID
const REDIRECT_URI = 'http://127.0.0.1:3000/callback' // MUST exactly match Developer Portal

interface AuthConfig {
  verifier: string | null
  state: string | null
  server: http.Server | null
}

const authConfig: AuthConfig = {
  verifier: null,
  state: null,
  server: null
}

function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString('base64url')
}

function generateCodeChallenge(verifier: string): string {
  if (!verifier) throw new Error('No verifier provided')
  return crypto.createHash('sha256').update(verifier).digest('base64url')
}

function getState(): string {
  return crypto.randomBytes(16).toString('hex')
}

export async function login(webContents: WebContents): Promise<boolean> {
  if (!CLIENT_ID) {
    console.error('Missing X_CLIENT_ID in .env')
    return false
  }

  return new Promise((resolve) => {
    // 1. Generate auth credentials
    const verifier = generateCodeVerifier()
    const challenge = generateCodeChallenge(verifier)
    const state = getState()

    authConfig.verifier = verifier
    authConfig.state = state

    // 2. Start local callback server
    if (authConfig.server) {
      authConfig.server.close()
    }

    authConfig.server = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url || '', `http://${req.headers.host}`)
        if (url.pathname === '/callback') {
          const code = url.searchParams.get('code')
          const incomingState = url.searchParams.get('state')

          if (!code || incomingState !== authConfig.state) {
            res.writeHead(400, { 'Content-Type': 'text/html' })
            res.end('<h1>Authentication failed</h1><p>Invalid state or missing code.</p>')
            return resolve(false)
          }

          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(`
            <html>
            <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff;">
              <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 48px; height: 48px; fill: currentColor; margin-bottom: 24px;">
                <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.75H5.03z"></path></g>
              </svg>
              <h1>Authenticated successfully!</h1>
              <p>You can close this window and return to X Widget.</p>
              <script>window.close()</script>
            </body>
            </html>
          `)

          // 3. Exchange code for token
          const success = await exchangeCodeForToken(code, verifier)
          
          if (authConfig.server) {
             authConfig.server.close()
             authConfig.server = null
          }
          
          if (success) {
            webContents.send('auth-success')
          }
          
          resolve(success)
        } else {
          res.writeHead(404)
          res.end('Not found')
        }
      } catch (e) {
        console.error('Callback error', e)
        res.writeHead(500)
        res.end('Internal Server Error')
        resolve(false)
      }
    })

    authConfig.server.listen(3000, '127.0.0.1', () => {
      // 4. Open External Browser
      const authUrl = new URL('https://twitter.com/i/oauth2/authorize')
      authUrl.searchParams.append('response_type', 'code')
      authUrl.searchParams.append('client_id', CLIENT_ID)
      authUrl.searchParams.append('redirect_uri', REDIRECT_URI)
      authUrl.searchParams.append('scope', 'tweet.read users.read offline.access')
      authUrl.searchParams.append('state', state)
      authUrl.searchParams.append('code_challenge', challenge)
      authUrl.searchParams.append('code_challenge_method', 'S256')

      shell.openExternal(authUrl.toString())
    })
  })
}

async function exchangeCodeForToken(code: string, verifier: string): Promise<boolean> {
  try {
    const params = new URLSearchParams()
    params.append('client_id', CLIENT_ID || '')
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', REDIRECT_URI)
    params.append('code_verifier', verifier)
    params.append('code', code)

    // Using Basic Auth via Client ID and Client Secret
    const authHeader = Buffer.from(`${CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64')

    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authHeader}`
      },
      body: params.toString()
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Failed to exchange token:', err)
      return false
    }

    const data = await response.json()
    
    // Save to store
    const store = initStore()
    const now = Date.now()
    const authData = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: now + (data.expires_in * 1000)
    }
    
    store.set('auth', authData)
    return true
  } catch (error) {
    console.error('Error exchanging token:', error)
    return false
  }
}

export function logout(): void {
  const store = initStore()
  store.set('auth', {
    accessToken: null,
    refreshToken: null,
    expiresAt: null
  })
}

export function getAuthToken(): string | null {
  const store = initStore()
  const auth = store.get('auth') as any
  if (!auth) return null
  
  if (auth.expiresAt && Date.now() > auth.expiresAt) {
    // Attempt refresh... normally you'd do refresh token flow here.
    return null
  }
  
  return auth.accessToken
}
