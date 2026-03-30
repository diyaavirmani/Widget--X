import React, { useState, useEffect } from 'react'
import { useWidgetStore } from '../../store/widget-store'
import { Monitor, Moon, Sun, Clock, Repeat, Smartphone, ShieldCheck, X } from 'lucide-react'
import { cn } from '../../lib/utils'

export function SettingsPanel() {
  const { theme, setTheme, refreshInterval, setRefreshInterval, cyclingEnabled, setCyclingEnabled, cyclingInterval, setCyclingInterval } = useWidgetStore()

  const handleClose = () => {
    window.widgetAPI.close()
  }

  return (
    <div className="flex flex-col h-full w-full bg-x-bg text-x-text overflow-y-auto no-drag">
      <div className="flex justify-between items-center p-4 border-b border-x-border sticky top-0 bg-x-bg z-10">
        <h2 className="text-xl font-bold">Settings</h2>
        <button 
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-x-bg-hover transition"
        >
          <X size={20} className="text-x-text" />
        </button>
      </div>

      <div className="p-4 space-y-8">
        {/* Appearance Settings */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Monitor size={18} className="text-x-text-secondary" /> Appearance
          </h3>
          
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-x-text-secondary">Theme</label>
              <div className="flex p-1 bg-x-bg-secondary rounded-lg">
                {[
                  { id: 'light', icon: Sun, label: 'Light' },
                  { id: 'dark', icon: Moon, label: 'Dark' },
                  { id: 'system', icon: Smartphone, label: 'System' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition",
                      theme === opt.id ? "bg-x-bg shadow text-x-text" : "text-x-text-secondary hover:text-x-text"
                    )}
                  >
                    <opt.icon size={16} /> {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Behavior Settings */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Clock size={18} className="text-x-text-secondary" /> Behavior
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-x-text">Auto-Refresh Interval</label>
                <div className="text-xs text-x-text-secondary">How often to fetch new data</div>
              </div>
              <select 
                className="bg-x-bg-secondary border border-x-border text-x-text text-sm rounded-lg pr-8 pl-3 py-2 outline-none focus:border-x-accent"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
              >
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={90}>90 seconds</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>
          </div>
        </section>

        {/* Cycling Settings */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Repeat size={18} className="text-x-text-secondary" /> Widget Cycling
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-x-text">Enable Cycling Mode</label>
                <div className="text-xs text-x-text-secondary">Automatically switches between widget types</div>
              </div>
              <button 
                onClick={() => setCyclingEnabled(!cyclingEnabled)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-x-accent focus:ring-offset-2 focus:ring-offset-x-bg",
                  cyclingEnabled ? 'bg-x-success' : 'bg-x-bg-secondary border border-x-border'
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  cyclingEnabled ? 'translate-x-6' : 'translate-x-1'
                )} />
              </button>
            </div>

            {cyclingEnabled && (
              <div className="flex items-center justify-between animate-x-fade-in pl-4 border-l-2 border-x-border">
                <div>
                  <label className="text-sm font-medium text-x-text">Cycling Speed</label>
                </div>
                <select 
                  className="bg-x-bg-secondary border border-x-border text-x-text text-sm rounded-lg pr-8 pl-3 py-2 outline-none focus:border-x-accent"
                  value={cyclingInterval}
                  onChange={(e) => setCyclingInterval(Number(e.target.value))}
                >
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                  <option value={180}>3 minutes</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>
            )}
          </div>
        </section>
        
        {/* Account Info */}
        <section className="space-y-4 pt-4 border-t border-x-border">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheck size={18} className="text-x-success" /> Account
          </h3>
          <div className="bg-x-bg-secondary p-4 rounded-xl border border-x-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-x-accent text-white flex items-center justify-center font-bold">X</div>
              <div>
                <div className="font-bold text-x-text">Authenticated via Bearer Token</div>
                <div className="text-xs text-x-text-secondary">Read-only access mode active</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
