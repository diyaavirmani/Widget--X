import { Tray, Menu, nativeImage, app } from 'electron'
import { join } from 'path'
import { WindowManager } from './window-manager'

let tray: Tray | null = null

export function setupTray(windowManager: WindowManager): void {
  // Use a simple 16x16 tray icon
  const iconPath = join(__dirname, '../../resources/tray-icon.png')
  let icon: nativeImage
  try {
    icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
  } catch {
    // Fallback: create a simple icon
    icon = nativeImage.createEmpty()
  }

  tray = new Tray(icon)
  tray.setToolTip('Widget X')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '➕ New Widget',
      submenu: [
        {
          label: '📰 Timeline',
          click: () => windowManager.createWidget({ type: 'timeline', width: 420, height: 520 })
        },
        {
          label: '🔔 Notifications',
          click: () =>
            windowManager.createWidget({ type: 'notifications', width: 420, height: 520 })
        },
        {
          label: '✏️ Compose',
          click: () => windowManager.createWidget({ type: 'compose', width: 340, height: 400 })
        },
        {
          label: '🔥 Trending',
          click: () => windowManager.createWidget({ type: 'trending', width: 420, height: 520 })
        }
      ]
    },
    { type: 'separator' },
    {
      label: '⚙️ Settings',
      click: () => {
        // Open settings in a new widget-style window
        windowManager.createWidget({ type: 'timeline', width: 480, height: 600 })
      }
    },
    { type: 'separator' },
    {
      label: '❌ Quit Widget X',
      click: () => {
        windowManager.saveAllPositions()
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)
}
