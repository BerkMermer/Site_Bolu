import ErrorMessage from './ErrorMessage'
import Loading from './Loading'

/**
 * API'den gelen verinin üç durumunu tek yerden yönetir:
 *
 *   <DataState loading={loading} error={error} onRetry={refetch}
 *              isEmpty={!events?.length} empty="Yaklaşan etkinlik yok.">
 *     {events?.map(...)}
 *   </DataState>
 */
export default function DataState({ loading, error, onRetry, isEmpty, empty, loadingText, children }) {
  if (loading) return <Loading text={loadingText} />
  if (error) return <ErrorMessage error={error} onRetry={onRetry} />
  if (isEmpty) return <p className="empty-state">{empty ?? 'Henüz içerik yok.'}</p>
  return children
}
