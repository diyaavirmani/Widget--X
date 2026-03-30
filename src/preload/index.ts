import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from '../shared/ipc-channels'

// Expose safe APIs to the renderer via context bridge
const api = {
  // Window controls
  minimize: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_MINIMIZE),
  close: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_CLOSE),
  toggleAlwaysOnTop: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_TOGGLE_ALWAYS_ON_TOP),
  setClickThrough: (ignore: boolean) =>
    ipcRenderer.send(IPC_CHANNELS.WINDOW_SET_CLICK_THROUGH, ignore),

  // External links
  openExternal: (url: string) => ipcRenderer.send(IPC_CHANNELS.OPEN_EXTERNAL, url),

  // Theme
  getTheme: () => ipcRenderer.invoke(IPC_CHANNELS.GET_THEME),
  onThemeChanged: (callback: (theme: string) => void) => {
    const handler = (_event: any, theme: string) => callback(theme)
    ipcRenderer.on(IPC_CHANNELS.THEME_CHANGED, handler)
    return () => ipcRenderer.removeListener(IPC_CHANNELS.THEME_CHANGED, handler)
  },

  // Settings
  getSettings: () => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET),
  setSetting: (key: string, value: unknown) =>
    ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_SET, key, value),

  // Auth
  login: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGIN),
  logout: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGOUT),
  getAuthToken: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_GET_TOKEN),
  getAuthStatus: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_GET_STATUS),
  onAuthSuccess: (callback: () => void) => {
    const handler = () => callback()
    ipcRenderer.on('auth-success', handler)
    return () => ipcRenderer.removeListener('auth-success', handler)
  }
}

contextBridge.exposeInMainWorld('widgetAPI', api)

export type WidgetAPI = typeof api
