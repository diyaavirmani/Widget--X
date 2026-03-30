import { ipcMain, BrowserWindow, shell, nativeTheme } from 'electron'
import { IPC_CHANNELS } from '../shared/ipc-channels'
import { initStore } from './store'
import { login, logout } from './auth'
import { fetchTimeline } from './api'

export function setupIpcHandlers(): void {
  const store = initStore()

  // Window controls
  ipcMain.on(IPC_CHANNELS.WINDOW_MINIMIZE, (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize()
  })

  ipcMain.on(IPC_CHANNELS.WINDOW_CLOSE, (event) => {
    BrowserWindow.fromWebContents(event.sender)?.close()
  })

  ipcMain.on(IPC_CHANNELS.WINDOW_TOGGLE_ALWAYS_ON_TOP, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
      const current = win.isAlwaysOnTop()
      win.setAlwaysOnTop(!current)
      event.reply(IPC_CHANNELS.WINDOW_TOGGLE_ALWAYS_ON_TOP, !current)
    }
  })

  ipcMain.on(IPC_CHANNELS.WINDOW_SET_CLICK_THROUGH, (event, ignore: boolean) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
      win.setIgnoreMouseEvents(ignore, { forward: true })
    }
  })

  // Move window by delta (for manual drag on frameless transparent windows)
  ipcMain.on('window:move-delta', (event, dx: number, dy: number) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
      const [x, y] = win.getPosition()
      win.setPosition(x + dx, y + dy)
    }
  })

  // Resize window by delta (for manual resize on frameless transparent windows)
  ipcMain.on('window:resize-delta', (event, dx: number, dy: number) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
      const [w, h] = win.getSize()
      const newW = Math.max(140, Math.min(800, w + dx))
      const newH = Math.max(140, Math.min(800, h + dy))
      win.setSize(newW, newH)
    }
  })

  // Open external links
  ipcMain.on(IPC_CHANNELS.OPEN_EXTERNAL, (_event, url: string) => {
    shell.openExternal(url)
  })

  // Theme
  ipcMain.handle(IPC_CHANNELS.GET_THEME, () => {
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
  })

  // Settings
  ipcMain.handle(IPC_CHANNELS.SETTINGS_GET, () => {
    return store.get('settings')
  })

  ipcMain.handle(IPC_CHANNELS.SETTINGS_SET, (_event, key: string, value: unknown) => {
    store.set(`settings.${key}`, value)
    return store.get('settings')
  })

  // Auth flow
  ipcMain.handle(IPC_CHANNELS.AUTH_LOGIN, async (event) => {
    return await login(event.sender)
  })

  ipcMain.handle(IPC_CHANNELS.AUTH_LOGOUT, () => {
    logout()
  })

  // Auth token
  ipcMain.handle(IPC_CHANNELS.AUTH_GET_TOKEN, () => {
    return store.get('auth.accessToken') || process.env.X_BEARER_TOKEN || null
  })

  ipcMain.handle(IPC_CHANNELS.AUTH_GET_STATUS, () => {
    const token = store.get('auth.accessToken')
    return { authenticated: !!token }
  })

  // Twitter API Data Fetchers
  ipcMain.handle(IPC_CHANNELS.API_GET_TIMELINE, async () => {
    return await fetchTimeline()
  })
}
