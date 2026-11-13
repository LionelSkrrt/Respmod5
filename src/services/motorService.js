import { SEED } from '../data/seed'

const KEY = 'lapakroda.motors.v1'
const FAV_KEY = 'lapakroda.favorites.v1'
const wait = (ms = 150) => new Promise((r) => setTimeout(r, ms))

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* data rusak → pakai seed */ }
  save(SEED)
  return [...SEED]
}

function save(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    throw new Error('Penyimpanan penuh. Coba foto dengan ukuran lebih kecil.')
  }
}

const motorService = {
  // READ (list)
  async getMotors() {
    await wait()
    return { success: true, data: load() }
  },
  // CREATE
  async createMotor(payload) {
    await wait()
    const motor = { ...payload, id: crypto.randomUUID(), createdAt: Date.now() }
    save([motor, ...load()])
    return { success: true, data: motor }
  },
  // UPDATE
  async updateMotor(id, payload) {
    await wait()
    const list = load()
    const idx = list.findIndex((m) => m.id === id)
    if (idx === -1) return { success: false, message: 'Iklan tidak ditemukan.' }
    list[idx] = { ...list[idx], ...payload, id }
    save(list)
    return { success: true, data: list[idx] }
  },
  // DELETE
  async deleteMotor(id) {
    await wait()
    save(load().filter((m) => m.id !== id))
    localStorage.setItem(FAV_KEY, JSON.stringify(motorService.getFavorites().filter((f) => f !== id)))
    return { success: true }
  },

  getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || [] } catch { return [] }
  },
  toggleFavorite(id) {
    const favs = motorService.getFavorites()
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
    localStorage.setItem(FAV_KEY, JSON.stringify(next))
    return next
  },
}

export default motorService
