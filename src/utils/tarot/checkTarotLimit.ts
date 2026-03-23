const DAILY_LIMIT = 1
const ONE_DAY = 24 * 60 * 60 * 1000

type TarotLimitData = {
  count: number
  expiresAt: number
}

export const checkTarotLimit = (guestId: string) => {
  if (!guestId || typeof window === 'undefined') {
    return { allowed: false, used: 0, limit: DAILY_LIMIT, key: null }
  }

  const key = `tarot_limit_${guestId}`
  const raw = localStorage.getItem(key)

  let data: TarotLimitData | null = raw ? JSON.parse(raw) : null

  // если нет данных или срок истёк — сбрасываем
  if (!data || Date.now() > data.expiresAt) {
    data = {
      count: 0,
      expiresAt: Date.now() + ONE_DAY,
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  return {
    allowed: data.count < DAILY_LIMIT,
    used: data.count,
    limit: DAILY_LIMIT,
    key,
  }
}

export const incrementTarotLimit = (key: string) => {
  if (!key) return

  const raw = localStorage.getItem(key)
  if (!raw) return

  const data: TarotLimitData = JSON.parse(raw)
  data.count += 1

  localStorage.setItem(key, JSON.stringify(data))
}
