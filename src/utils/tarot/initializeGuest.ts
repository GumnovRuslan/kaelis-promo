import { shuffleActions } from "@/store"
import { AppDispatch } from '@/store'

export const initGuest = async (dispatch: AppDispatch) => {
  if (typeof window === 'undefined') return null

  const guestToken = localStorage.getItem('guestToken')
  const guestId = localStorage.getItem('guestId')

  if (!guestToken || !guestId) {
    const result = await dispatch(shuffleActions.authenticateGuest())

    if (shuffleActions.authenticateGuest.fulfilled.match(result)) {
      if (result.payload) {
        dispatch(shuffleActions.setGuestAuth(result.payload))
        return result.payload
      }
    }

    return null
  }

  const payload = { guestId, token: guestToken }
  dispatch(shuffleActions.setGuestAuth(payload))
  return payload
}
