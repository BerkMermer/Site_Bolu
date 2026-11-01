/** Yükleniyor göstergesi. */
export default function Loading({ text = 'Yükleniyor…', compact = false }) {
  return (
    <div className={`loading${compact ? ' loading--compact' : ''}`} role="status">
      <span className="loading__spinner" aria-hidden="true" />
      <span className="loading__text">{text}</span>
    </div>
  )
}
