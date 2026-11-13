import { useState } from 'react'
import Header from './components/Header'
import PWABadge from './components/PWABadge'
import MotorDetail from './components/MotorDetail'
import Catalog from './pages/Catalog'
import Favorites from './pages/Favorites'
import Sell from './pages/Sell'
import Profile from './pages/Profile'
import { useMotors } from './hooks/useMotors'
import motorService from './services/motorService'

export default function App() {
  const [tab, setTab] = useState('Katalog')
  const [selected, setSelected] = useState(null)
  const [favs, setFavs] = useState(() => motorService.getFavorites())
  const { motors, loading, error, refetch } = useMotors()

  const go = (t) => { setTab(t); window.scrollTo({ top: 0 }) }
  const toggleFav = (id) => setFavs(motorService.toggleFavorite(id))
  // Pastikan modal detail memakai data terbaru / tertutup jika iklan dihapus
  const current = selected ? motors.find((m) => m.id === selected) : null

  return (
    <div className="min-h-svh flex flex-col">
      <Header tab={tab} onTab={go} favCount={favs.length} />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 pb-28 md:pb-10">
        {tab === 'Katalog' && <Catalog motors={motors} loading={loading} error={error} favs={favs} onOpen={(m) => setSelected(m.id)} onToggleFav={toggleFav} onRetry={refetch} />}
        {tab === 'Favorit' && <Favorites motors={motors} favs={favs} onOpen={(m) => setSelected(m.id)} onToggleFav={toggleFav} onGoCatalog={() => go('Katalog')} />}
        {tab === 'Jual' && <Sell motors={motors} onChanged={refetch} />}
        {tab === 'Profil' && <Profile />}
      </main>
      {current && <MotorDetail motor={current} isFav={favs.includes(current.id)} onClose={() => setSelected(null)} onToggleFav={toggleFav} />}
      <PWABadge />
    </div>
  )
}
