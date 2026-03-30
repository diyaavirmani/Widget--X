import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `M`
  if (num >= 1_000) return `K`
  return num.toString()
}

export function timeAgo(date: Date | string): string {
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)
  if (seconds < 60) return `s`
  if (seconds < 3600) return `m`
  if (seconds < 86400) return `h`
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
