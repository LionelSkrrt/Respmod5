import { useEffect } from 'react'
import { X, Heart, MessageCircle, MapPin, User } from 'lucide-react'
import Photo from './Photo'
import { rupiah, number, waLink } from '../utils/format'

export default function MotorDetail({ motor, isFav, onClose, onToggleFav }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const specs = [
    ['Tahun', motor.year], ['Kilometer', `${number(motor.km)} km`], ['Mesin', `${motor.cc} cc`],
    ['Tipe', motor.type], ['Merek', motor.brand], ['Kondisi', motor.condition],
  ]

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={motor.name} onClick={(e) => e.stopPropagation()}
        className="bg-paper w-full sm:max-w-2xl max-h-[92svh] overflow-y-auto">
        <div className="relative">
          <Photo motor={motor} className="aspect-[16/10]" />
          <button type="button" onClick={onClose} aria-label="Tutup" className="absolute top-3 right-3 bg-white p-2 cursor-pointer"><X size={18} /></button>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <h2 className="display text-3xl leading-tight">{motor.name}</h2>
            <p className="display text-3xl text-tank">{rupiah(motor.price)}</p>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-white p-3"><dt className="text-xs text-ink/60">{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
          </dl>
          {motor.description && <p className="leading-relaxed max-w-prose">{motor.description}</p>}
          <p className="text-sm text-ink/70 flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1"><User size={14} /> {motor.seller}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {motor.city}</span>
          </p>
          <div className="flex gap-2">
            <a href={waLink(motor.phone, motor.name)} target="_blank" rel="noreferrer" className="btn btn-primary flex-1"><MessageCircle size={16} /> Hubungi penjual</a>
            <button type="button" onClick={() => onToggleFav(motor.id)} aria-pressed={isFav} className="btn btn-ghost">
              <Heart size={16} className={isFav ? 'fill-tank text-tank' : ''} /> {isFav ? 'Favorit' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
