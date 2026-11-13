import { useState } from 'react'
import { Pencil, Trash2, ImagePlus } from 'lucide-react'
import Photo from '../components/Photo'
import ConfirmModal from '../components/ConfirmModal'
import motorService from '../services/motorService'
import { BRANDS, TYPES } from '../data/seed'
import { rupiah, resizeImage } from '../utils/format'

const EMPTY = { name: '', brand: 'Honda', type: 'Matic', year: new Date().getFullYear(), cc: '', km: '', price: '', condition: 'Bekas', city: '', seller: '', phone: '', description: '', photo: null }

function validate(f) {
  const e = {}
  const maxYear = new Date().getFullYear() + 1
  if (!f.name.trim()) e.name = 'Nama motor wajib diisi.'
  if (!(Number(f.price) > 0)) e.price = 'Harga harus lebih dari 0.'
  if (!(Number(f.year) >= 1990 && Number(f.year) <= maxYear)) e.year = `Tahun antara 1990 dan ${maxYear}.`
  if (!(Number(f.cc) > 0)) e.cc = 'Isi kapasitas mesin (cc).'
  if (f.km === '' || Number(f.km) < 0) e.km = 'Isi kilometer (boleh 0).'
  if (!f.city.trim()) e.city = 'Kota wajib diisi.'
  if (!f.seller.trim()) e.seller = 'Nama penjual wajib diisi.'
  if (!/^(\+?62|0)8\d{7,12}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Nomor WhatsApp tidak valid. Contoh: 081234567890.'
  return e
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {label}
      {children}
      {error && <span className="text-tank-dark text-xs font-normal" role="alert">{error}</span>}
    </label>
  )
}

export default function Sell({ motors, onChanged }) {
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState(null)
  const [target, setTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const reset = () => { setForm(EMPTY); setEditingId(null); setErrors({}) }

  const startEdit = (m) => {
    setForm({ ...EMPTY, ...m })
    setEditingId(m.id)
    setErrors({})
    setNotice(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onPhoto = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const photo = await resizeImage(file)
      setForm((f) => ({ ...f, photo }))
    } catch (err) {
      setNotice({ type: 'error', text: err.message })
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    const payload = {
      ...form, name: form.name.trim(), city: form.city.trim(), seller: form.seller.trim(),
      year: Number(form.year), cc: Number(form.cc), km: Number(form.km), price: Number(form.price),
    }
    try {
      setSaving(true)
      const res = editingId ? await motorService.updateMotor(editingId, payload) : await motorService.createMotor(payload)
      if (!res.success) throw new Error(res.message)
      setNotice({ type: 'ok', text: editingId ? 'Perubahan iklan tersimpan.' : 'Iklan berhasil dipasang.' })
      reset()
      await onChanged()
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'Gagal menyimpan iklan.' })
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = async () => {
    try {
      setDeleting(true)
      await motorService.deleteMotor(target.id)
      if (editingId === target.id) reset()
      setNotice({ type: 'ok', text: `Iklan "${target.name}" dihapus.` })
      setTarget(null)
      await onChanged()
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'Gagal menghapus iklan.' })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="display text-4xl">{editingId ? 'Ubah iklan' : 'Pasang iklan motor'}</h1>
        <p className="text-ink/70">Data tersimpan di perangkat ini dan tetap ada saat offline.</p>
      </div>

      {notice && (
        <p role="status" className={`p-3 text-sm border ${notice.type === 'ok' ? 'bg-white border-moss text-moss' : 'bg-white border-tank text-tank-dark'}`}>{notice.text}</p>
      )}

      <form onSubmit={submit} noValidate className="bg-white border border-ink/15 p-4 sm:p-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2"><Field label="Nama motor" error={errors.name}><input className="field" value={form.name} onChange={set('name')} placeholder="Contoh: Honda Vario 160 CBS" /></Field></div>
        <Field label="Merek"><select className="field" value={form.brand} onChange={set('brand')}>{BRANDS.map((b) => <option key={b}>{b}</option>)}</select></Field>
        <Field label="Tipe"><select className="field" value={form.type} onChange={set('type')}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
        <Field label="Tahun" error={errors.year}><input className="field" type="number" inputMode="numeric" value={form.year} onChange={set('year')} /></Field>
        <Field label="Kapasitas mesin (cc)" error={errors.cc}><input className="field" type="number" inputMode="numeric" value={form.cc} onChange={set('cc')} /></Field>
        <Field label="Kilometer" error={errors.km}><input className="field" type="number" inputMode="numeric" value={form.km} onChange={set('km')} /></Field>
        <Field label="Harga (Rp)" error={errors.price}><input className="field" type="number" inputMode="numeric" value={form.price} onChange={set('price')} /></Field>
        <Field label="Kondisi"><select className="field" value={form.condition} onChange={set('condition')}><option>Bekas</option><option>Baru</option></select></Field>
        <Field label="Kota" error={errors.city}><input className="field" value={form.city} onChange={set('city')} /></Field>
        <Field label="Nama penjual" error={errors.seller}><input className="field" value={form.seller} onChange={set('seller')} /></Field>
        <Field label="Nomor WhatsApp" error={errors.phone}><input className="field" inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="081234567890" /></Field>
        <div className="sm:col-span-2"><Field label="Deskripsi"><textarea className="field min-h-24" value={form.description} onChange={set('description')} placeholder="Kondisi mesin, kelengkapan surat, riwayat servis" /></Field></div>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <label className="btn btn-ghost cursor-pointer"><ImagePlus size={16} /> {form.photo ? 'Ganti foto' : 'Tambah foto'}<input type="file" accept="image/*" className="sr-only" onChange={onPhoto} /></label>
          {form.photo && <>
            <img src={form.photo} alt="Pratinjau foto" className="h-16 w-24 object-cover" />
            <button type="button" className="btn btn-ghost" onClick={() => setForm((f) => ({ ...f, photo: null }))}>Hapus foto</button>
          </>}
        </div>
        <div className="sm:col-span-2 flex gap-2 justify-end">
          {editingId && <button type="button" className="btn btn-ghost" onClick={reset}>Batal ubah</button>}
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Menyimpan…' : editingId ? 'Simpan perubahan' : 'Pasang iklan'}</button>
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="display text-3xl">Kelola iklan ({motors.length})</h2>
        {motors.length === 0 && <p className="bg-white border border-ink/15 p-6 text-center">Belum ada iklan. Isi formulir di atas untuk memasang iklan pertama.</p>}
        <ul className="flex flex-col gap-2">
          {motors.map((m) => (
            <li key={m.id} className={`bg-white border p-2 flex items-center gap-3 ${editingId === m.id ? 'border-tank' : 'border-ink/15'}`}>
              <div className="w-20 shrink-0"><Photo motor={m} className="aspect-[4/3]" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{m.name}</p>
                <p className="text-sm text-tank">{rupiah(m.price)}</p>
                <p className="text-xs text-ink/60">{m.year} • {m.city}</p>
              </div>
              <button type="button" className="btn btn-ghost" onClick={() => startEdit(m)} aria-label={`Ubah ${m.name}`}><Pencil size={16} /></button>
              <button type="button" className="btn btn-danger" onClick={() => setTarget(m)} aria-label={`Hapus ${m.name}`}><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmModal open={Boolean(target)} title="Hapus iklan?" message={`Iklan "${target?.name}" akan dihapus dan tidak bisa dikembalikan.`}
        loading={deleting} onConfirm={confirmDelete} onCancel={() => setTarget(null)} />
    </section>
  )
}
