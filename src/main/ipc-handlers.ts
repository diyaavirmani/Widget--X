import { ipcMain, BrowserWindow, shell, nativeTheme } from 'electron'
import { IPC_CHANNELS } from '../shared/ipc-channels'
import { initStore } from './store'

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

  // Auth token
  ipcMain.handle(IPC_CHANNELS.AUTH_GET_TOKEN, () => {
    return store.get('auth.accessToken') || process.env.X_BEARER_TOKEN || null
  })

  ipcMain.handle(IPC_CHANNELS.AUTH_GET_STATUS, () => {
    const token = store.get('auth.accessToken')
    return { authenticated: !!token }
  })
}
