import ZoneTiles from './ZoneTiles'

const ACTION_BUTTONS = [
  { key: 'power',    label: '⚡ REROUTE POWER'  },
  { key: 'security', label: '🛡 SEND SECURITY'   },
  { key: 'drones',   label: '◈ DEPLOY DRONES'   },
  { key: 'jam',      label: '◉ SIGNAL JAM'      },
]

export default function ControlsPanel({ onAction, zoneStates, onToggleTile, onLockdown, locked }) {
  return (
    <div className="bg-bg-panel p-4 relative overflow-hidden panel-accent h-full flex flex-col">
      {/* Title */}
      <div className="font-head text-[11px] tracking-widest text-text-dim mb-3">
        TERMINAL CONTROLS
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {ACTION_BUTTONS.map(({ key, label }) => (
          <CtrlButton key={key} label={label} onClick={() => onAction(key)} />
        ))}
      </div>

      {/* Zone systems label */}
      <div className="font-mono text-[11px] text-text-dim mb-2">// ZONE SYSTEMS</div>

      {/* Zone tiles */}
      <ZoneTiles zoneStates={zoneStates} onToggle={onToggleTile} />

      {/* Lockdown button */}
      <button
        disabled={locked}
        onClick={onLockdown}
        className="w-full py-3.5 font-head text-xs tracking-widest border border-red text-red mt-auto transition-all cursor-pointer disabled:cursor-not-allowed"
        style={{
          background: 'rgba(255,34,68,0.08)',
          textShadow: '0 0 8px rgba(255,34,68,0.5)',
          animation: locked ? 'crit-flash 0.5s infinite alternate' : undefined,
        }}
        onMouseEnter={e => {
          if (!locked) {
            e.currentTarget.style.background = 'rgba(255,34,68,0.2)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255,34,68,0.4), inset 0 0 20px rgba(255,34,68,0.1)'
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,34,68,0.08)'
          e.currentTarget.style.boxShadow = ''
        }}
      >
        {locked ? '⚠ SYSTEM LOCKED' : '⚠ SYSTEM LOCKDOWN'}
      </button>
    </div>
  )
}

function CtrlButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative px-2 py-2.5 font-head text-[9px] tracking-wide bg-bg-panel2 border border-border-bright text-text-dim cursor-pointer transition-all overflow-hidden active:scale-[0.97]"
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#00d4ff'
        e.currentTarget.style.color = '#00d4ff'
        e.currentTarget.style.boxShadow = '0 0 10px rgba(0,212,255,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#252540'
        e.currentTarget.style.color = '#556070'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {label}
    </button>
  )
}