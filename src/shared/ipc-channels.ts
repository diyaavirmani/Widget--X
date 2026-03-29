// IPC Channel names shared between main and renderer
export const IPC_CHANNELS = {
  // Window management
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_CLOSE: 'window:close',
  WINDOW_TOGGLE_ALWAYS_ON_TOP: 'window:toggle-always-on-top',
  WINDOW_SET_CLICK_THROUGH: 'window:set-click-through',
  WINDOW_SET_SIZE: 'window:set-size',
  WINDOW_GET_ID: 'window:get-id',

  // Widget management
  WIDGET_CREATE: 'widget:create',
  WIDGET_REMOVE: 'widget:remove',
  WIDGET_GET_ALL: 'widget:get-all',
  WIDGET_UPDATE_CONFIG: 'widget:update-config',

  // Auth
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_GET_STATUS: 'auth:get-status',
  AUTH_GET_TOKEN: 'auth:get-token',

  // API Data
  API_GET_TIMELINE: 'api:get-timeline',
  API_GET_TRENDING: 'api:get-trending',
  API_GET_NOTIFICATIONS: 'api:get-notifications',
  API_COMPOSE_TWEET: 'api:compose-tweet',
  API_SEARCH: 'api:search',

  // Settings
  SETTINGS_GET: 'settings:get',
  SETTINGS_SET: 'settings:set',
  SETTINGS_OPEN: 'settings:open',

  // System
  OPEN_EXTERNAL: 'system:open-external',
  GET_THEME: 'system:get-theme',
  THEME_CHANGED: 'system:theme-changed'
} as const

export type IPCChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS]
