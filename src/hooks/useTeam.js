import { getTeam } from '../services/api'
import { useFetch } from './useFetch'

/** Ekip üyeleri. */
export function useTeam() {
  return useFetch((signal) => getTeam({ signal }), [])
}
