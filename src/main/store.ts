import Store from 'electron-store'

let store: any = null

export function initStore(): Store<any> {
  if (!store) {
    store = new Store({
      name: 'widget-x-config',
      encryptionKey: 'widget-x-secure-key-2024',
      defaults: {
        widgets: [],
        settings: {
          theme: 'system',
          refreshInterval: 90,
          cyclingEnabled: false,
          cyclingInterval: 180,
          alwaysOnTop: false,
          clickThrough: false,
          glassmorphism: true,
          startOnBoot: false
        },
        auth: {
          accessToken: null,
          refreshToken: null,
          expiresAt: null
        }
      }
    })
  }
  return store
}
