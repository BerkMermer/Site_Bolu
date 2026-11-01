import { getAnnouncements } from '../services/api'
import { useFetch } from './useFetch'

/** Duyurular (en yeni önce). */
export function useAnnouncements({ limit } = {}) {
  return useFetch((signal) => getAnnouncements({ limit }, { signal }), [limit])
}
