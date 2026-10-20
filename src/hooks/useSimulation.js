import { useState, useEffect, useCallback, useRef } from 'react'
import { ZONES, MESSAGES, INITIAL_ZONE_STATUSES } from '../data/constants'

function drift(v, amt, min, max) {
  return Math.min(max, Math.max(min, v + (Math.random() * amt * 2 - amt)))
}

function randomFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function useSimulation(onAlert, onClick) {
  const [metrics, setMetrics] = useState({
    network: 95,
    power: 45,
    firewall: 88,
    traffic: 60,
  })
  const [warnings, setWarnings] = useState([])
  const [critCount, setCritCount] = useState(0)
  const [zoneStatuses, setZoneStatuses] = useState(INITIAL_ZONE_STATUSES)
  const [alertBanner, setAlertBanner] = useState({ show: false, message: '' })
  const lockedRef = useRef(false)

  const addWarning = useCallback(
    (msg, severity, location, manual) => {
      const w = {
        id: Date.now() + Math.random(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        severity,
        location: location || randomFromArr(ZONES),
        message: msg || randomFromArr(MESSAGES[severity]),
      }

      setWarnings(prev => {
        const next = [w, ...prev]
        return next.slice(0, 20)
      })

      if (severity === 'Critical') {
        setCritCount(c => c + 1)
        onAlert?.()
        setAlertBanner({ show: true, message: w.message })
      } else if (!manual) {
        onClick?.()
      }
    },
    [onAlert, onClick]
  )

  const ackWarning = useCallback(id => {
    setWarnings(prev => prev.filter(w => w.id !== id))
    setCritCount(c => {
      const next = Math.max(0, c - 1)
      if (next === 0) setAlertBanner({ show: false, message: '' })
      return next
    })
  }, [])

  const setLocked = useCallback(locked => {
    lockedRef.current = locked
  }, [])

  const lockdownMetrics = useCallback(() => {
    setMetrics({ network: 0, power: 0, firewall: 0, traffic: 0 })
  }, [])

  // Initial warnings
  useEffect(() => {
    const timers = [
      setTimeout(() => addWarning(null, 'Critical', 'The Underground', false), 300),
      setTimeout(() => addWarning(null, 'Medium', 'Factory Zone 4', false), 600),
      setTimeout(() => addWarning(null, 'Low', 'Neon Market', false), 900),
      setTimeout(() => addWarning(null, 'Low', 'Rich Peak', false), 1200),
    ]
    return () => timers.forEach(clearTimeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Tick
  useEffect(() => {
    const interval = setInterval(() => {
      if (lockedRef.current) return

      setMetrics(prev => ({
        power: drift(prev.power, 8, 5, 100),
        traffic: drift(prev.traffic, 7, 5, 100),
        network: drift(prev.network, 5, 30, 100),
        firewall: drift(prev.firewall, 4, 40, 100),
      }))

      // Random zone status change
      if (Math.random() > 0.97) {
        const z = randomFromArr(ZONES)
        const statuses = ['safe', 'warn', 'crit']
        setZoneStatuses(prev => ({ ...prev, [z]: randomFromArr(statuses) }))
      }

      // Random events
      if (Math.random() > 0.75) {
        const sevs = ['Low', 'Low', 'Medium', 'Medium', 'Critical']
        addWarning(null, randomFromArr(sevs), null, false)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [addWarning])

  return {
    metrics,
    setMetrics,
    warnings,
    critCount,
    zoneStatuses,
    setZoneStatuses,
    alertBanner,
    setAlertBanner,
    addWarning,
    ackWarning,
    setLocked,
    lockdownMetrics,
  }
}