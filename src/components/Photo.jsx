import { Bike } from 'lucide-react'

const TONES = ['#D3202F', '#16213A', '#2F6F4F', '#7A5C1E', '#4B3F72', '#0F5E7A']
const toneFor = (s = '') => TONES[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % TONES.length]

export default function Photo({ motor, className = 'aspect-[4/3]' }) {
  if (motor.photo) {
    return <img src={motor.photo} alt={motor.name} className={`${className} w-full object-cover bg-chrome`} />
  }
  return (
    <div
      className={`${className} w-full flex flex-col items-center justify-center gap-1 text-white`}
      style={{ background: toneFor(motor.brand) }}
      role="img"
      aria-label={`Foto belum tersedia untuk ${motor.name}`}
    >
      <Bike size={44} strokeWidth={1.5} />
      <span className="display text-lg">{motor.brand}</span>
    </div>
  )
}
