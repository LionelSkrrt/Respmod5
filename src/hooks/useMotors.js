import { useState, useEffect, useCallback } from 'react'
import motorService from '../services/motorService'

export function useMotors() {
  const [motors, setMotors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMotors = useCallback(async () => {
    try {
      setError(null)
      const res = await motorService.getMotors()
      if (res.success) setMotors(res.data)
      else setError(res.message || 'Gagal memuat data.')
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat data.')
      setMotors([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMotors() }, [fetchMotors])

  return { motors, loading, error, refetch: fetchMotors }
}
