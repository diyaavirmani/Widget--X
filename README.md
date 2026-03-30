# Widget X 🚀

Widget X is a premium, native-feeling desktop widget for X (Twitter). Built using cutting-edge transparent window protocols within Electron, this application places dynamic, glassmorphic X feeds directly onto your Windows, macOS, or Linux desktop.

## ✨ Features
- **Authentic Glassmorphism UI**: Beautiful, fully transparent interactive panes using custom CSS matched directly to X's proprietary design system.
- **Multiple Resizable Layouts**: Scale your widget sizes dynamically (`1x1`, `2x1`, `2x2`, `4x2`, `4x4`) and the layout intelligently snaps just like native OS widgets.
- **Four Widget Dashboards**:
  - **Timeline**: Clean scrollable feed with embedded images, real-time engagement limits, and user profiles.
  - **Notifications**: See likes, reposts, follows, and mentions instantly.
  - **Explore/Trending**: Multi-tiered trending lists with an embedded search capability.
  - **Compose**: A lightweight floating editor to immediately publish thoughts directly from your home screen.
- **Active OAuth 2.0 PKCE Engine**: Secure 2026-compliant X API token management running fully locally so you own your token secrets.
- **Auto-Refresh & Smart Cycling**: Hooks dynamically sequence through feeds natively on your screen in the background.

## 🛠️ Stack & Technologies
- **Core Engine**: Electron 32+, Node 20+, React 19
- **Build Server**: Vite 6+ mapped with HMR & ContextBridge
- **Visuals**: Tailwind v4 + Custom SVGs
- **State Flow**: Zustand with encrypted `electron-store` bindings

---

## 🚀 Getting Started

### 1. Requirements
Ensure you have **Node.js (v20+)** installed on your system.
You will also need Developer API keys from your [X Developer Portal](https://developer.x.com/en/portal/dashboard).

> **Crucial X Portal Setup**: Ensure you configure your App settings in the X Developer Portal to specify **`http://127.0.0.1:3000/callback`** as one of the approved Redirect URIs/Callback URLs, otherwise authentication will bounce!

### 2. Environment Variables
In the root directory of this repository, create a `.env` file referencing your keys:
```env
X_BEARER_TOKEN=your_bearer_token...
X_CLIENT_ID=your_client_id...
X_CLIENT_SECRET=your_client_secret...
```

### 3. Installation
Open your terminal and install all core node modules:
```bash
npm install
```

### 4. Running the Dev Server
Fire up the application in live-reload mode. 
```bash
npm run dev
```

Right away, the native widgets will spawn over your desktop! *Note: Development mode currently spawns highly-detailed mocked internal metrics if Authentication is bypassed in state.*

---

## 📦 Packaging & Compiling Deployables
Once you're satisfied with your deployment target, invoke the high-performance compiler tools included via `electron-builder` to package natively standalone executables.

**Windows Executable Installer:**
```bash
npm run package:win
```
*(Produces a robust `/dist/Widget X Setup 1.0.0.exe` file natively integrated with Windows registry).*

**MacOS Deployment (.dmg & zip):**
```bash
npm run package:mac
```

**Linux (AppImage):**
```bash
npm run package:linux
```