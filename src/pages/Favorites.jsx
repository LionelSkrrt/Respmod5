import MotorCard from '../components/MotorCard'

export default function Favorites({ motors, favs, onOpen, onToggleFav, onGoCatalog }) {
  const list = motors.filter((m) => favs.includes(m.id))
  return (
    <section className="flex flex-col gap-5">
      <h1 className="display text-4xl">Motor favorit</h1>
      {list.length === 0 ? (
        <div className="bg-white border border-ink/15 p-6 text-center flex flex-col items-center gap-3">
          <p>Belum ada favorit. Tekan ikon hati pada motor yang kamu suka.</p>
          <button type="button" className="btn btn-primary" onClick={onGoCatalog}>Lihat katalog</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m) => <MotorCard key={m.id} motor={m} isFav onOpen={onOpen} onToggleFav={onToggleFav} />)}
        </div>
      )}
    </section>
  )
}
