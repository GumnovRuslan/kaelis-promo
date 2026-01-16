const DAILY_LIMIT = 3

export const checkTarotLimit = (guestId: string) => {
  const today = new Date().toISOString().slice(0, 10)
  const key = `tarot_limit_${guestId}_${today}`

  const used = Number(localStorage.getItem(key) || 0)

  return {
    allowed: used < DAILY_LIMIT,
    used,
    limit: DAILY_LIMIT,
    key,
  }
}

export const incrementTarotLimit = (key: string) => {
  const current = Number(localStorage.getItem(key) || 0)
  localStorage.setItem(key, String(current + 1))
}
