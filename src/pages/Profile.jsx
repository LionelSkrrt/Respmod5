import { PROFILE } from '../data/profile'

export default function Profile() {
  const rows = [['Nama', PROFILE.nama], ['NIM', PROFILE.nim], ['Kelompok', PROFILE.kelompok]]
  return (
    <section className="max-w-xl flex flex-col gap-5">
      <h1 className="display text-4xl">Profil</h1>
      <div className="bg-white border border-ink/15">
        <div className="bg-ink text-white p-5">
          <p className="display text-3xl leading-tight">{PROFILE.nama}</p>
          <p className="text-white/70 text-sm">{PROFILE.prodi}</p>
        </div>
        <dl className="divide-y divide-ink/10">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 p-4"><dt className="text-ink/60">{k}</dt><dd className="font-semibold text-right">{v}</dd></div>
          ))}
        </dl>
      </div>
      <p className="text-sm text-ink/70">{PROFILE.matkul}. Aplikasi ini dibuat dengan React, Vite, Tailwind CSS, dan vite-plugin-pwa.</p>
    </section>
  )
}
