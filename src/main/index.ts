import { app, BrowserWindow, nativeTheme } from 'electron'
import { join } from 'path'
import { setupTray } from './tray'
import { setupIpcHandlers } from './ipc-handlers'
import { WindowManager } from './window-manager'
import { initStore } from './store'

// Prevent multiple instances
const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
}

let windowManager: WindowManager

async function createInitialWidget(): Promise<void> {
  windowManager = new WindowManager()
  const savedWidgets = initStore().get('widgets', []) as any[]

  if (savedWidgets.length > 0) {
    for (const config of savedWidgets) {
      windowManager.createWidget(config)
    }
  } else {
    windowManager.createWidget({
      type: 'timeline',
      width: 420,
      height: 520,
      x: undefined,
      y: undefined
    })
  }
}

app.whenReady().then(async () => {
  setupIpcHandlers()
  await createInitialWidget()
  setupTray(windowManager)

  // Watch for system theme changes
  nativeTheme.on('updated', () => {
    const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('system:theme-changed', theme)
    })
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createInitialWidget()
    }
  })
})

app.on('window-all-closed', () => {
  // Don't quit on all windows closed — we have the tray
})

app.on('before-quit', () => {
  if (windowManager) {
    windowManager.saveAllPositions()
  }
})

export { windowManager }
