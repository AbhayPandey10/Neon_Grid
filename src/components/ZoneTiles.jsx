// ── SVG ICONS ────────────────────────────────────────────────

function LightsIcon({ on }) {
  const c = on ? '#ffcc00' : '#556070'
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <line x1="26" y1="48" x2="26" y2="18" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="10" width="16" height="9" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
      <line x1="26" y1="10" x2="26" y2="18" stroke={c} strokeWidth="1.5" />
      <ellipse
        cx="26" cy="14" rx="5" ry="3"
        fill={on ? '#ffcc00' : '#252540'}
        style={on ? { animation: 'lamp-pulse 2s ease-in-out infinite' } : {}}
      />
      <ellipse cx="26" cy="30" rx="10" ry="4" fill={on ? '#ffcc00' : '#252540'} opacity={on ? 0.18 : 0.5} />
      <line x1="15" y1="28" x2="37" y2="28" stroke={on ? '#ffcc00' : '#252540'} strokeWidth="0.5" opacity={on ? 0.35 : 0.4} />
      <line x1="18" y1="32" x2="34" y2="32" stroke={on ? '#ffcc00' : '#252540'} strokeWidth="0.5" opacity={on ? 0.25 : 0.3} />
    </svg>
  )
}

function GunsIcon({ on }) {
  const c = on ? '#ff2244' : '#556070'
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="32" width="18" height="10" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
      <rect x="14" y="26" width="8" height="8" rx="1" fill="none" stroke={c} strokeWidth="1.5" />
      <line x1="18" y1="26" x2="18" y2="22" stroke={c} strokeWidth="1.5" />
      <rect x="10" y="18" width="22" height="5" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
      <line
        x1="32" y1="20.5" x2="42" y2="20.5"
        stroke={c} strokeWidth="2" strokeLinecap="round"
        style={on ? { animation: 'gun-recoil 0.8s ease-in-out infinite' } : {}}
      />
      <line x1="32" y1="18.5" x2="40" y2="18.5" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="32" y1="22.5" x2="40" y2="22.5" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <circle cx="42" cy="20.5" r="1.5" fill={c} />
      <rect x="8" y="40" width="18" height="4" rx="1" fill="#252540" stroke="#252540" />
      <line x1="10" y1="42" x2="24" y2="42" stroke={c} strokeWidth="0.8" opacity="0.4" />
      <circle cx="11" cy="42" r="1.5" fill="#252540" stroke={c} strokeWidth="0.8" />
      <circle cx="16" cy="42" r="1.5" fill="#252540" stroke={c} strokeWidth="0.8" />
      <circle cx="21" cy="42" r="1.5" fill="#252540" stroke={c} strokeWidth="0.8" />
      <g
        style={{
          transformOrigin: '42px 20.5px',
          opacity: on ? 0.7 : 0.15,
          animation: on ? 'crosshair-spin 4s linear infinite' : undefined,
        }}
      >
        <circle cx="42" cy="20.5" r="5" fill="none" stroke={c} strokeWidth="0.8" />
        <line x1="37" y1="20.5" x2="47" y2="20.5" stroke={c} strokeWidth="0.5" />
        <line x1="42" y1="15.5" x2="42" y2="25.5" stroke={c} strokeWidth="0.5" />
      </g>
    </svg>
  )
}

function WifiIcon({ on }) {
  const c = on ? '#00d4ff' : '#556070'
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <rect x="21" y="36" width="10" height="10" rx="1" fill="none" stroke={c} strokeWidth="1.5" />
      <line x1="26" y1="36" x2="26" y2="28" stroke={c} strokeWidth="1.5" />
      <rect x="23" y="24" width="6" height="5" rx="1" fill="none" stroke={c} strokeWidth="1.2" />
      <line x1="26" y1="24" x2="26" y2="18" stroke={c} strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
      <path
        d="M 16 20 A 10 10 0 0 1 36 20"
        fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"
        className={on ? 'wifi-ring-anim-1' : ''}
        style={on ? { strokeDasharray: 60 } : {}}
      />
      <path
        d="M 10 14 A 16 16 0 0 1 42 14"
        fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"
        className={on ? 'wifi-ring-anim-2' : ''}
        style={on ? { strokeDasharray: 60 } : {}}
      />
      <path
        d="M 4 8 A 22 22 0 0 1 48 8"
        fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round"
        className={on ? 'wifi-ring-anim-3' : ''}
        style={on ? { strokeDasharray: 60 } : {}}
      />
      <circle cx="26" cy="19" r="2" fill={c} />
    </svg>
  )
}

function CCTVIcon({ on }) {
  const c = on ? '#00ff88' : '#556070'
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <line x1="26" y1="8" x2="26" y2="20" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="8" width="12" height="3" rx="1" fill="none" stroke={c} strokeWidth="1.2" />
      <g style={on ? { transformOrigin: '26px 24px', animation: 'cam-sweep 4s ease-in-out infinite' } : {}}>
        <rect x="16" y="20" width="20" height="11" rx="3" fill="none" stroke={c} strokeWidth="1.5" />
        <rect x="34" y="22.5" width="8" height="6" rx="2" fill="none" stroke={c} strokeWidth="1.2" />
        <circle cx="38" cy="25.5" r="2" fill="#252540" stroke={c} strokeWidth="1" />
        <circle cx="38" cy="25.5" r="0.8" fill={c} />
        <rect
          x="16" y="24" width="3" height="3" rx="0.5"
          fill={on ? '#00ff88' : '#252540'} stroke={c} strokeWidth="0.8"
          style={on ? { animation: 'lamp-pulse 1s ease-in-out infinite' } : {}}
        />
      </g>
      <path d="M26 33 L20 44 L32 44 Z" fill="none" stroke={c} strokeWidth="1.2" />
      <line x1="18" y1="44" x2="34" y2="44" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 22 L48 16 M42 28 L48 34" fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="2 2" opacity={on ? 0.5 : 0.25} />
      <path d="M42 25.5 L50 25.5" fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="2 2" opacity={on ? 0.35 : 0.15} />
    </svg>
  )
}

// ── TILE CONFIGS ─────────────────────────────────────────────

const TILE_DEFS = [
  { key: 'lights', label: 'STREETLIGHTS', onStatus: 'ONLINE',       offStatus: 'OFFLINE',  Icon: LightsIcon },
  { key: 'guns',   label: 'AUTO-GUNS',    onStatus: 'ARMED',         offStatus: 'OFFLINE',  Icon: GunsIcon   },
  { key: 'wifi',   label: 'FREE WI-FI',   onStatus: 'BROADCASTING',  offStatus: 'OFFLINE',  Icon: WifiIcon   },
  { key: 'cctv',   label: 'CCTV NETWORK', onStatus: 'RECORDING',     offStatus: 'OFFLINE',  Icon: CCTVIcon   },
]

// ── ZONE TILES ───────────────────────────────────────────────

export default function ZoneTiles({ zoneStates, onToggle }) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      {TILE_DEFS.map(({ key, label, onStatus, offStatus, Icon }) => {
        const on = zoneStates[key]
        return (
          <div
            key={key}
            onClick={() => onToggle(key)}
            className="relative bg-bg-panel2 border p-2.5 flex flex-col items-center gap-1.5 cursor-pointer transition-all select-none"
            style={{
              borderColor: on ? 'rgba(255,255,255,0.12)' : '#252540',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#00d4ff')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = on ? 'rgba(255,255,255,0.12)' : '#252540')}
          >
            {/* Status pip */}
            <div
              className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: on ? '#00ff88' : '#252540' }}
            />

            {/* Icon */}
            <div className="w-[52px] h-[52px] flex items-center justify-center">
              <Icon on={on} />
            </div>

            {/* Label */}
            <div className="font-head text-[9px] tracking-widest text-text-dim text-center leading-snug">
              {label}
            </div>

            {/* Status */}
            <div
              className="font-mono text-[10px] tracking-wide text-center"
              style={{ color: on ? '#00ff88' : '#556070' }}
            >
              {on ? onStatus : offStatus}
            </div>
          </div>
        )
      })}
    </div>
  )
}