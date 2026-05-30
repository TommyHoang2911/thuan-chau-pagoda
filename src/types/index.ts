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
