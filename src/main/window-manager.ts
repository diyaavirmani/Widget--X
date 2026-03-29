import { BrowserWindow, screen, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { initStore } from './store'

export interface WidgetConfig {
  id?: string
  type: 'timeline' | 'notifications' | 'compose' | 'trending'
  width: number
  height: number
  x?: number
  y?: number
  alwaysOnTop?: boolean
}

const WIDGET_SIZES = {
  '1x1': { width: 140, height: 140 },
  '2x1': { width: 280, height: 140 },
  '2x2': { width: 280, height: 280 },
  '4x1': { width: 520, height: 140 },
  '4x2': { width: 520, height: 280 },
  '4x4': { width: 520, height: 520 }
}

export class WindowManager {
  private widgets: Map<string, { window: BrowserWindow; config: WidgetConfig }> = new Map()
  private counter = 0

  createWidget(config: WidgetConfig): BrowserWindow {
    const id = config.id || `widget-${Date.now()}-${this.counter++}`
    const display = screen.getPrimaryDisplay()
    const { width: screenW, height: screenH } = display.workAreaSize

    const x = config.x ?? Math.round((screenW - config.width) / 2)
    const y = config.y ?? Math.round((screenH - config.height) / 2)

    const win = new BrowserWindow({
      width: config.width,
      height: config.height,
      x,
      y,
      frame: false,
      transparent: true,
      resizable: true,
      alwaysOnTop: config.alwaysOnTop ?? false,
      skipTaskbar: false,
      hasShadow: true,
      minWidth: 140,
      minHeight: 140,
      maxWidth: 800,
      maxHeight: 800,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false
      }
    })

    // Set vibrancy on macOS
    if (process.platform === 'darwin') {
      win.setVibrancy('under-window')
    }

    // Load the renderer
    const widgetQuery = `?widgetId=${id}&widgetType=${config.type}`
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}${widgetQuery}`)
    } else {
      win.loadFile(join(__dirname, '../renderer/index.html'), {
        search: widgetQuery.slice(1)
      })
    }

    // Open links in external browser
    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url)
      return { action: 'deny' }
    })

    // Save position on move/resize
    win.on('moved', () => this.saveWidgetPosition(id, win))
    win.on('resized', () => this.saveWidgetPosition(id, win))

    win.on('closed', () => {
      this.widgets.delete(id)
    })

    this.widgets.set(id, { window: win, config: { ...config, id } })
    return win
  }

  private saveWidgetPosition(id: string, win: BrowserWindow): void {
    const entry = this.widgets.get(id)
    if (!entry) return
    const [x, y] = win.getPosition()
    const [width, height] = win.getSize()
    entry.config = { ...entry.config, x, y, width, height }
  }

  saveAllPositions(): void {
    const store = initStore()
    const configs = Array.from(this.widgets.values()).map((e) => e.config)
    store.set('widgets', configs)
  }

  removeWidget(id: string): void {
    const entry = this.widgets.get(id)
    if (entry) {
      entry.window.close()
      this.widgets.delete(id)
    }
    this.saveAllPositions()
  }

  getAll(): WidgetConfig[] {
    return Array.from(this.widgets.values()).map((e) => e.config)
  }

  getWindow(id: string): BrowserWindow | undefined {
    return this.widgets.get(id)?.window
  }

  getAllWindows(): BrowserWindow[] {
    return Array.from(this.widgets.values()).map((e) => e.window)
  }
}

export { WIDGET_SIZES }
