const now = Date.now()
const day = 86400000
const base = { photo: null, phone: '6281200000000', condition: 'Bekas' }

export const SEED = [
  { id: 's1', name: 'Honda Vario 160 CBS', brand: 'Honda', type: 'Matic', year: 2022, cc: 160, km: 12500, price: 24500000, city: 'Semarang', seller: 'Budi Motor', description: 'Pajak hidup, service rutin di AHASS, surat lengkap, tangan pertama. Siap pakai.', createdAt: now - 1 * day, ...base },
  { id: 's2', name: 'Yamaha NMAX 155 Connected', brand: 'Yamaha', type: 'Matic', year: 2021, cc: 155, km: 21000, price: 27800000, city: 'Yogyakarta', seller: 'Rina', description: 'Kondisi mulus, ban baru, bagasi luas. Kunci cadangan ada.', createdAt: now - 2 * day, ...base },
  { id: 's3', name: 'Honda Beat Street', brand: 'Honda', type: 'Matic', year: 2019, cc: 110, km: 34000, price: 11500000, city: 'Solo', seller: 'Pak Heru', description: 'Irit, mesin halus, cocok untuk harian. Pajak baru diperpanjang.', createdAt: now - 4 * day, ...base },
  { id: 's4', name: 'Kawasaki Ninja 250 SL', brand: 'Kawasaki', type: 'Sport', year: 2018, cc: 250, km: 18000, price: 36500000, city: 'Jakarta', seller: 'Garasi Dimas', description: 'Knalpot standar masih ada, tidak pernah jatuh, rantai dan gear baru.', createdAt: now - 6 * day, ...base },
  { id: 's5', name: 'Suzuki Satria F150', brand: 'Suzuki', type: 'Bebek', year: 2020, cc: 150, km: 15000, price: 19800000, city: 'Bandung', seller: 'Andi', description: 'Tarikan enteng, kaki-kaki aman, body orisinal tanpa dempul.', createdAt: now - 8 * day, ...base },
  { id: 's6', name: 'Vespa Sprint 150 i-get', brand: 'Piaggio', type: 'Klasik', year: 2017, cc: 150, km: 27000, price: 42000000, city: 'Surabaya', seller: 'Vespa Corner', description: 'Warna biru langka, jok kulit, siap touring santai.', createdAt: now - 10 * day, ...base },
]

export const BRANDS = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Piaggio', 'TVS', 'Lainnya']
export const TYPES = ['Matic', 'Bebek', 'Sport', 'Klasik', 'Trail']
