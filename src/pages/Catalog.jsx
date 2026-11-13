import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import MotorCard from '../components/MotorCard'
import { TYPES } from '../data/seed'

export default function Catalog({ motors, loading, error, favs, onOpen, onToggleFav, onRetry }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState('Semua')
  const [sort, setSort] = useState('terbaru')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    const out = motors.filter((m) =>
      (type === 'Semua' || m.type === type) &&
      (!term || `${m.name} ${m.brand} ${m.city}`.toLowerCase().includes(term)))
    const by = { terbaru: (a, b) => b.createdAt - a.createdAt, termurah: (a, b) => a.price - b.price, termahal: (a, b) => b.price - a.price }
    return out.sort(by[sort])
  }, [motors, q, type, sort])

  return (
    <section className="flex flex-col gap-5">
      <div>
        <h1 className="display text-4xl sm:text-5xl leading-none">Motor siap jalan, harga jelas.</h1>
        <p className="text-ink/70 mt-2">{motors.length} iklan tersedia. Tetap bisa dibuka tanpa internet.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <label className="relative flex-1">
          <span className="sr-only">Cari motor</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50" />
          <input className="field pl-9" placeholder="Cari nama, merek, atau kota" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Urutkan</span>
          <select className="field sm:w-44" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="terbaru">Terbaru</option>
            <option value="termurah">Harga termurah</option>
            <option value="termahal">Harga termahal</option>
          </select>
        </label>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter tipe">
        {['Semua', ...TYPES].map((t) => (
          <button key={t} type="button" onClick={() => setType(t)} aria-pressed={type === t}
            className={`px-3 py-1.5 text-sm border cursor-pointer whitespace-nowrap ${type === t ? 'bg-ink text-white border-ink' : 'bg-white border-ink/25'}`}>
            {t}
          </button>
        ))}
      </div>

      {loading && <p role="status">Memuat iklan…</p>}
      {error && (
        <div className="bg-white border border-tank p-4" role="alert">
          <p className="font-semibold">Iklan gagal dimuat</p>
          <p className="text-sm mb-3">{error}</p>
          <button type="button" className="btn btn-primary" onClick={onRetry}>Coba lagi</button>
        </div>
      )}
      {!loading && !error && list.length === 0 && (
        <p className="bg-white border border-ink/15 p-6 text-center">Tidak ada motor yang cocok. Coba kata kunci atau tipe lain.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((m) => <MotorCard key={m.id} motor={m} isFav={favs.includes(m.id)} onOpen={onOpen} onToggleFav={onToggleFav} />)}
      </div>
    </section>
  )
}
