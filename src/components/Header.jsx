import { Bike, Heart, PlusCircle, User } from 'lucide-react'

export const TABS = [
  { id: 'Katalog', label: 'Katalog', icon: Bike },
  { id: 'Favorit', label: 'Favorit', icon: Heart },
  { id: 'Jual', label: 'Jual Motor', icon: PlusCircle },
  { id: 'Profil', label: 'Profil', icon: User },
]

export default function Header({ tab, onTab, favCount }) {
  return (
    <>
      <header className="bg-ink text-white sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button type="button" onClick={() => onTab('Katalog')} className="display text-2xl cursor-pointer flex items-center gap-2">
            <span className="bg-tank px-1.5 py-0.5">LR</span> Lapak Roda
          </button>
          <nav className="hidden md:flex gap-1" aria-label="Navigasi utama">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => onTab(id)} aria-current={tab === id ? 'page' : undefined}
                className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-b-2 ${tab === id ? 'border-tank text-white' : 'border-transparent text-white/70 hover:text-white'}`}>
                <Icon size={16} /> {label}{id === 'Favorit' && favCount > 0 && <span className="bg-tank text-xs px-1.5">{favCount}</span>}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-ink/15 grid grid-cols-4 pb-[env(safe-area-inset-bottom)]" aria-label="Navigasi utama">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => onTab(id)} aria-current={tab === id ? 'page' : undefined}
            className={`py-2.5 flex flex-col items-center gap-0.5 text-xs cursor-pointer ${tab === id ? 'text-tank font-semibold' : 'text-ink/70'}`}>
            <Icon size={20} /> {label}
          </button>
        ))}
      </nav>
    </>
  )
}
