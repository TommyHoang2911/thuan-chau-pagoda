import { useState, useEffect } from 'react'
import { onAuthChange } from '../../lib/firebase'
import type { User } from 'firebase/auth'

export function useAuth() {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthChange(u => { setUser(u); setLoading(false) })
    return unsub
  }, [])

  return { user, loading }
}
