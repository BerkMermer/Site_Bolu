import { getEvent, getEvents } from '../services/api'
import { useFetch } from './useFetch'

/**
 * Etkinlik listesi.
 *   useEvents({ status: 'upcoming', limit: 3 })
 */
export function useEvents({ status, type, limit } = {}) {
  return useFetch((signal) => getEvents({ status, type, limit }, { signal }), [status, type, limit])
}

/** Tek etkinlik (detay sayfası). */
export function useEvent(id) {
  return useFetch((signal) => getEvent(id, { signal }), [id])
}
