import { Heart, MapPin } from 'lucide-react'
import Photo from './Photo'
import { rupiah, number } from '../utils/format'

export default function MotorCard({ motor, isFav, onOpen, onToggleFav }) {
  return (
    <article className="bg-white border border-ink/15 flex flex-col">
      <div className="relative">
        <button type="button" onClick={() => onOpen(motor)} className="block w-full cursor-pointer" aria-label={`Lihat detail ${motor.name}`}>
          <Photo motor={motor} />
        </button>
        <button
          type="button"
          onClick={() => onToggleFav(motor.id)}
          aria-pressed={isFav}
          aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          className="absolute top-2 right-2 bg-white/95 p-2 cursor-pointer"
        >
          <Heart size={18} className={isFav ? 'fill-tank text-tank' : 'text-ink'} />
        </button>
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 ${motor.condition === 'Baru' ? 'bg-moss text-white' : 'bg-ink text-white'}`}>
          {motor.condition}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="display text-xl leading-tight">{motor.name}</h3>
        <p className="display text-2xl text-tank">{rupiah(motor.price)}</p>
        <p className="text-sm text-ink/70">{motor.year} • {number(motor.km)} km • {motor.cc} cc • {motor.type}</p>
        <p className="text-sm text-ink/70 flex items-center gap-1 mt-auto pt-1"><MapPin size={14} /> {motor.city}</p>
      </div>
    </article>
  )
}
