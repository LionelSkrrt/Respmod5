export default function ConfirmModal({ open, title, message, confirmLabel = 'Hapus', loading, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] bg-ink/60 flex items-center justify-center p-4" onClick={onCancel}>
      <div role="alertdialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="bg-white p-5 w-full max-w-sm flex flex-col gap-3">
        <h2 className="display text-2xl">{title}</h2>
        <p className="text-sm text-ink/80">{message}</p>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={loading}>Batal</button>
          <button type="button" className="btn btn-primary" onClick={onConfirm} disabled={loading}>{loading ? 'Menghapus…' : confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
