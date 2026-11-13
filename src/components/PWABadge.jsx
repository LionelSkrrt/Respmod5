import { useState, useEffect } from 'react'
import { Download, WifiOff, X } from 'lucide-react'

export default function PWABadge() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallPrompt(e) }
    const onInstalled = () => setInstallPrompt(null)
    const on = () => setIsOffline(false)
    const off = () => setIsOffline(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  const install = async () => {
    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  const wrap = 'fixed z-50 left-3 right-3 md:left-auto md:right-4 md:w-96 bottom-20 md:bottom-4 p-3 flex items-center justify-between gap-3 shadow-lg'

  if (isOffline) {
    return (
      <aside className={`${wrap} bg-ink text-white`} role="status" aria-live="polite">
        <span className="flex items-center gap-2 text-sm"><WifiOff size={16} /> Mode offline. Data tersimpan tetap bisa dipakai.</span>
      </aside>
    )
  }
  if (installPrompt && !dismissed) {
    return (
      <aside className={`${wrap} bg-white border border-ink/15`} role="region" aria-label="Pasang aplikasi">
        <span className="flex items-center gap-2 text-sm"><Download size={16} className="text-tank" /> Pasang <strong>Lapak Roda</strong> di perangkatmu.</span>
        <span className="flex items-center gap-1">
          <button type="button" className="btn btn-primary" onClick={install}>Pasang</button>
          <button type="button" className="p-2 cursor-pointer" onClick={() => setDismissed(true)} aria-label="Tutup"><X size={16} /></button>
        </span>
      </aside>
    )
  }
  return null
}
