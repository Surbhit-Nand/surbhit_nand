// Local-first store. Public visitors see the seed list in
// src/data/projects.js. The hidden admin (#/admin) saves edits to
// localStorage for instant preview; the owner publishes them by pasting the
// exported JSON into src/data/projects.js and redeploying. This keeps zero
// backend and zero secrets in the bundle. Swap these functions for API calls
// when a shared backend (Supabase/KV + server-checked PIN) is provisioned.
import { projects as seedProjects } from '../data/projects.js'

const PROJECTS_KEY = 'eport_projects_override'
const PIN_KEY = 'eport_admin_hash'

function isValidList(value) {
  return (
    Array.isArray(value) &&
    value.every((p) => p && typeof p.slug === 'string' && typeof p.name === 'string')
  )
}

export function loadProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    if (!raw) return seedProjects
    const parsed = JSON.parse(raw)
    return isValidList(parsed) ? parsed : seedProjects
  } catch {
    return seedProjects
  }
}

export function saveProjectsLocal(list) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
}

export function clearLocalOverride() {
  localStorage.removeItem(PROJECTS_KEY)
}

export function hasLocalOverride() {
  try {
    return localStorage.getItem(PROJECTS_KEY) !== null
  } catch {
    return false
  }
}

export function exportProjectsJSON(list) {
  return JSON.stringify(list, null, 2)
}

/** True for https URLs; Google Photos direct links are preferred. */
export function checkImageUrl(url) {
  const value = url.trim()
  if (!/^https:\/\//i.test(value)) return 'Use a full https:// link.'
  if (!/googleusercontent\.com/i.test(value))
    return 'Not a Google Photos direct link — open the photo, right-click, “Copy image address” (album or share links will not display). Saved anyway.'
  return ''
}

async function sha256Hex(text) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function insecureHash(text) {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 31) + text.charCodeAt(i)) | 0
  return `insecure:${h}`
}

export async function hashPin(pin) {
  try {
    if (crypto.subtle) return await sha256Hex(`eport-admin:${pin}`)
  } catch {
    /* fall through */
  }
  return insecureHash(pin)
}

export function hasPin() {
  try {
    return localStorage.getItem(PIN_KEY) !== null
  } catch {
    return false
  }
}

export async function verifyPin(pin) {
  try {
    const stored = localStorage.getItem(PIN_KEY)
    if (!stored) return false
    return (await hashPin(pin)) === stored
  } catch {
    return false
  }
}

export async function setPin(pin) {
  localStorage.setItem(PIN_KEY, await hashPin(pin))
}
