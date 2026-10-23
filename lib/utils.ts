import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function withBasePath(path: string): string {
  if (!path || path.startsWith('http') || (BASE_PATH && path.startsWith(BASE_PATH))) {
    return path
  }
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}
