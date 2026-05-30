export interface Event {
  id: string
  title: string
  emoji: string
  badge: string
  day: string
  month: string
  date: string
  time: string
  loc: string
  desc: string
}

export interface CauSieuForm {
  name: string
  phone: string
  ceremony: string
  names: string[]
  relation: string
  note: string
}

export type TabId = 'events' | 'causieu' | 'chat' | 'about'

// ── Admin types ───────────────────────────────────────────
export interface CauSieuRecord {
  id: string
  name: string
  phone: string
  ceremony: string
  names: string[]
  relation: string
  note: string
  status: 'pending' | 'done'
  createdAt: { seconds: number } | null
}

export interface PushNotif {
  id: string
  title: string
  body: string
  url?: string
  sentAt: { seconds: number } | null
  sentBy: string
}
