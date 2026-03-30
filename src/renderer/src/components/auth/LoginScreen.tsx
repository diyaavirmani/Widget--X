import React from 'react'

export function LoginScreen() {
  const handleLogin = () => {
    // Start the auth flow via Main process
    window.widgetAPI.login()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-x-bg text-x-text no-drag p-8">
      <div className="mb-8">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-16 h-16 fill-current text-x-text">
          <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.75H5.03z"></path></g>
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Connect to X</h1>
      <p className="text-x-text-secondary text-center mb-8 max-w-[280px]">
        Authenticate to view your timeline, notifications, and trends directly on your desktop.
      </p>

      <button
        onClick={handleLogin}
        className="bg-x-text text-x-bg font-bold text-lg px-8 py-3 rounded-full hover:opacity-90 transition w-full max-w-[280px]"
      >
        Sign in with X
      </button>

      <div className="mt-8 text-xs text-x-text-secondary text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  )
}
