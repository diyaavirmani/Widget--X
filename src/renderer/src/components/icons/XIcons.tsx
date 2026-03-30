import React from 'react'

// All icons match the official X (Twitter) outlined icon set
// Using SVG paths extracted from X's actual interface

export function HomeIcon({ size = 24, active = false }: { size?: number; active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.903c0-.301-.158-.584-.408-.757z"></path></g>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913V7.903c0-.301-.158-.584-.408-.757zM20 20l-4.5.01v-7.088c0-.502-.418-.913-.929-.913H9.43c-.511 0-.929.41-.929.913V20L4 20.01V8.773l8-5.275 8 5.275V20z"></path></g>
    </svg>
  )
}

export function SearchIcon({ size = 24, active = false }: { size?: number; active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 2.013-.664 3.872-1.784 5.373l3.706 3.706-1.414 1.414-3.706-3.706c-1.501 1.12-3.36 1.784-5.373 1.784-4.971-.029-8.429-4.029-8.429-9z"></path></g>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g>
    </svg>
  )
}

export function BellIcon({ size = 24, active = false }: { size?: number; active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"></path></g>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.858 16H5.134z"></path></g>
    </svg>
  )
}

export function ComposeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M23 3c-6.62-.1-10.38 2.421-13.424 6.054C7.593 11.137 6.231 13.744 5.4 16c-2.5-.5-4.263.584-5.4 1.5V22c1.137-.916 2.742-1.5 4.5-1.5 1.068 0 2.054.195 2.9.5 1.916-.504 3.479-1.266 4.73-2.1C14.992 16.763 17.5 12.9 18 9.5l4.5-4.5c0-1-1.5-2-1.5-2z"></path></g>
    </svg>
  )
}

export function XLogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.75H5.03z"></path></g>
    </svg>
  )
}

export function HeartIcon({ size = 18, filled = false }: { size?: number; filled?: boolean }) {
  return filled ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor" className="text-x-like">
      <g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.56-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
    </svg>
  )
}

export function ReplyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g>
    </svg>
  )
}

export function RepostIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g>
    </svg>
  )
}

export function ViewsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M8.75 21V3h2v18h-2zM18.75 21V8.5h2V21h-2zM13.75 21v-9h2v9h-2zM3.75 21v-4h2v4h-2z"></path></g>
    </svg>
  )
}

export function VerifiedIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 22 22" aria-label="Verified account" width={size} height={size} fill="currentColor" className="text-x-accent">
      <g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.706 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g>
    </svg>
  )
}

export function BookmarkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g>
    </svg>
  )
}

export function ShareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V15h2z"></path></g>
    </svg>
  )
}

export function GrokIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} fill="currentColor">
      <g><path d="M2.205 7.423L11.745 21h4.241L6.446 7.423H2.205zM18.064 3L12.29 10.706l2.121 3.018L21.553 3h-3.489z"></path></g>
    </svg>
  )
}
