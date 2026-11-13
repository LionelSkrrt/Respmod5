export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n) || 0)

export const number = (n) => new Intl.NumberFormat('id-ID').format(Number(n) || 0)

export const waLink = (phone, name) => {
  const digits = String(phone || '').replace(/\D/g, '').replace(/^0/, '62')
  const text = encodeURIComponent(`Halo, saya tertarik dengan ${name} di Lapak Roda. Apakah masih tersedia?`)
  return `https://wa.me/${digits}?text=${text}`
}

// Perkecil foto sebelum disimpan agar localStorage tidak cepat penuh.
export function resizeImage(file, max = 640, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('File bukan gambar yang valid.')) }
    img.src = url
  })
}
