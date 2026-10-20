import { useState, useCallback } from 'react'
import Header from './components/Header'
import MapPanel from './components/MapPanel'
import TelemetryPanel from './components/TelemetryPanel'
import EventFeed from './components/EventFeed'
import ControlsPanel from './components/ControlsPanel'
import NetworkPanel from './components/NetworkPanel'
import LockdownModal from './components/LockdownModal'
import LockdownOverlay from './components/LockdownOverlay'
import { useAudio } from './hooks/useAudio'
import { useSimulation } from './hooks/useSimulation'

export default function App() {
  const [muted, setMuted] = useState(false)
  const [selectedZone, setSelectedZone] = useState('ALL')
  const [locked, setLockedUI] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [zoneStates, setZoneStates] = useState({
    lights: true,
    guns: false,
    wifi: true,
    cctv: true,
  })

  const { playClick, playAlert } = useAudio(muted)

  const {
    metrics,
    warnings,
    critCount,
    zoneStatuses,
    alertBanner,
    addWarning,
    ackWarning,
    setLocked,
    lockdownMetrics,
  } = useSimulation(playAlert, playClick)

  const handleToggleMute = useCallback(() => {
    setMuted(m => !m)
    playClick()
  }, [playClick])

  const handleSelectZone = useCallback(
    zone => {
      playClick()
      setSelectedZone(zone === 'ALL' ? 'ALL' : zone)
    },
    [playClick]
  )

  const handleAction = useCallback(
    type => {
      playClick()
      const loc = selectedZone === 'ALL' ? 'Global' : selectedZone
      if (type === 'power') {
        addWarning('Power route changed — grid rerouted', 'Medium', loc, true)
      } else if (type === 'security') {
        addWarning('Security drones deployed to sector', 'Low', loc, true)
      } else if (type === 'drones') {
        addWarning('Repair drone fleet dispatched', 'Low', loc, true)
      } else if (type === 'jam') {
        addWarning('Signal jamming active — network degraded', 'Medium', loc, true)
      }
    },
    [playClick, selectedZone, addWarning]
  )

  const handleToggleTile = useCallback(
    key => {
      playClick()
      setZoneStates(prev => {
        const next = { ...prev, [key]: !prev[key] }
        const labels = { lights: 'Streetlights', guns: 'Auto-Guns', wifi: 'Free Wi-Fi', cctv: 'CCTV Network' }
        addWarning(
          labels[key] + (next[key] ? ' enabled' : ' disabled'),
          'Low',
          'Global',
          true
        )
        return next
      })
    },
    [playClick, addWarning]
  )

  const handleShowLockdown = useCallback(() => {
    playClick()
    setShowModal(true)
  }, [playClick])

  const handleConfirmLockdown = useCallback(() => {
    setShowModal(false)
    setLockedUI(true)
    setLocked(true)
    lockdownMetrics()
    setZoneStates({ lights: false, guns: false, wifi: false, cctv: false })
    addWarning('SYSTEM LOCKDOWN INITIATED', 'Critical', 'Global', false)
    setTimeout(() => {
      document.getElementById('lockdown-overlay')?.classList.add('show')
    }, 500)
  }, [setLocked, lockdownMetrics, addWarning])

  const handleUnlock = useCallback(() => {
    playClick()
    setLockedUI(false)
    setLocked(false)
    addWarning('Lockdown disengaged — systems restarting', 'Medium', 'Global', true)
  }, [playClick, setLocked, addWarning])

  return (
    <div className="min-h-screen bg-bg text-text-main font-body">
      {/* Corner decorations */}
      <div className="fixed top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-blue pointer-events-none z-50" />
      <div className="fixed top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-blue pointer-events-none z-50" />
      <div className="fixed bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-blue pointer-events-none z-50" />
      <div className="fixed bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-blue pointer-events-none z-50" />

      <Header
        alertBanner={alertBanner}
        muted={muted}
        onToggleMute={handleToggleMute}
      />

      {/* Main grid */}
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto auto',
          background: '#1a1a2e',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        {/* Row 1 */}
        <div style={{ gridColumn: '1 / 3', gridRow: '1 / 2' }}>
          <MapPanel
            selectedZone={selectedZone}
            onSelectZone={handleSelectZone}
            zoneStatuses={zoneStatuses}
          />
        </div>

        <div style={{ gridColumn: '3 / 5', gridRow: '1 / 2' }}>
          <TelemetryPanel metrics={metrics} />
        </div>

        {/* Row 2 */}
        <div style={{ gridColumn: '1 / 3', gridRow: '2 / 3' }}>
          <EventFeed
            warnings={warnings}
            critCount={critCount}
            selectedZone={selectedZone}
            onAck={ackWarning}
          />
        </div>

        <div style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}>
          <ControlsPanel
            onAction={handleAction}
            zoneStates={zoneStates}
            onToggleTile={handleToggleTile}
            onLockdown={handleShowLockdown}
            locked={locked}
          />
        </div>

        <div style={{ gridColumn: '4 / 5', gridRow: '2 / 3' }}>
          <NetworkPanel
            metrics={metrics}
            zoneStatuses={zoneStatuses}
            onSelectZone={handleSelectZone}
          />
        </div>
      </div>

      {/* Modals */}
      <LockdownModal
        show={showModal}
        onConfirm={handleConfirmLockdown}
        onCancel={() => { playClick(); setShowModal(false) }}
      />
      <LockdownOverlay show={locked} onUnlock={handleUnlock} />
    </div>
  )
}