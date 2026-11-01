import { useCallback, useEffect, useState } from 'react'

/**
 * Veri çekmek için ortak hook: yükleniyor / hata / veri durumlarını yönetir.
 *
 *   const { data, loading, error, refetch } = useFetch((signal) => getEvents({}, { signal }), [])
 *
 * - deps değişince istek yeniden atılır, eski istek iptal edilir (AbortController).
 * - Component kapanırsa (unmount) yarım kalan isteğin sonucu yok sayılır.
 * - fetcher her render'da yeniden oluşturulduğu için bağımlılık listesine
 *   bilerek eklenmez; isteği yalnızca deps belirler.
 */
export function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    // deps değişince yeni istek başlıyor: "yükleniyor" durumuna dönmek bilinçli.
    // oxlint-disable-next-line react/set-state-in-effect
    setState((prev) => ({ data: prev.data, loading: true, error: null }))

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState({ data: null, loading: false, error })
      })

    return () => controller.abort()
    // fetcher bilerek eklenmedi; isteği yalnızca deps + reloadKey belirler (bkz. üstteki not).
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  return { ...state, refetch }
}
