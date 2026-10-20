import { ZONE_STATUS_LABELS } from '../data/constants'

const ZONE_DEFS = [
  {
    id: 'Rich Peak',
    label: 'RICH PEAK',
    style: {
      top: '5%', left: '3%', width: '40%', height: '35%',
      borderColor: '#00d4ff',
      background: 'rgba(0,212,255,0.05)',
      color: '#00d4ff',
      borderRadius: '40px 8px 30px 8px',
    },
    hoverStyle: {
      background: 'rgba(0,212,255,0.15)',
      boxShadow: '0 0 25px rgba(0,212,255,0.5), inset 0 0 15px rgba(0,212,255,0.1)',
    },
  },
  {
    id: 'Factory Zone 4',
    label: 'FACTORY\u00a0ZONE 4',
    style: {
      top: '8%', right: '4%', width: '30%', height: '55%',
      borderColor: '#ffcc00',
      background: 'rgba(255,204,0,0.05)',
      color: '#ffcc00',
      clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 5% 100%)',
    },
    hoverStyle: {
      background: 'rgba(255,204,0,0.15)',
      boxShadow: '0 0 25px rgba(255,204,0,0.4), inset 0 0 15px rgba(255,204,0,0.1)',
    },
  },
  {
    id: 'Neon Market',
    label: 'NEON\u00a0MARKET',
    style: {
      top: '30%', left: '35%', width: '22%', height: '28%',
      borderColor: '#ff0090',
      background: 'rgba(255,0,144,0.08)',
      color: '#ff0090',
    },
    hoverStyle: {
      background: 'rgba(255,0,144,0.2)',
      boxShadow: '0 0 25px rgba(255,0,144,0.5), inset 0 0 15px rgba(255,0,144,0.15)',
    },
  },
  {
    id: 'The Underground',
    label: 'THE\u00a0UNDERGROUND',
    style: {
      bottom: '4%', left: '5%', width: '45%', height: '25%',
      borderColor: '#cc44ff',
      background: 'rgba(204,68,255,0.06)',
      color: '#cc44ff',
      clipPath: 'polygon(0 15%, 100% 0, 92% 100%, 8% 85%)',
    },
    hoverStyle: {
      background: 'rgba(204,68,255,0.18)',
      boxShadow: '0 0 25px rgba(204,68,255,0.5), inset 0 0 15px rgba(204,68,255,0.12)',
    },
  },
]

const STATUS_CLASS = {
  safe: 'text-green',
  warn: 'text-yellow',
  crit: 'text-red',
}

export default function MapPanel({ selectedZone, onSelectZone, zoneStatuses }) {
  return (
    <div className="bg-bg-panel p-4 relative overflow-hidden panel-accent col-span-2 row-span-1">
      {/* Panel title */}
      <div className="font-head text-[11px] tracking-widest text-text-dim mb-3 flex items-center justify-between">
        CITY GRID // <span className="text-blue">{selectedZone === 'ALL' ? 'ALL SECTORS' : selectedZone.toUpperCase()}</span>
        <span className="font-mono text-[11px] px-2 py-0.5 border border-border-bright text-text-dim">
          GPS: ONLINE
        </span>
      </div>

      {/* Map */}
      <div className="relative w-full h-[280px] overflow-hidden" style={{ background: '#030308' }}>
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Radar rings */}
        {[0, 1.3, 2.6].map((delay, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              borderColor: 'rgba(0,212,255,0.2)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `radar-expand 4s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}

        {/* Radar sweep */}
        <div
          className="absolute radar-sweep"
          style={{
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            animation: 'sweep 5s linear infinite',
          }}
        />

        {/* Zones */}
        {ZONE_DEFS.map(zone => {
          const status = zoneStatuses[zone.id] || 'safe'
          const isActive = selectedZone === zone.id
          return (
            <div
              key={zone.id}
              className="absolute flex flex-col items-center justify-center font-head text-[9px] tracking-wide border cursor-crosshair transition-all text-center leading-snug"
              style={{
                ...zone.style,
                ...(isActive ? zone.hoverStyle : {}),
              }}
              onMouseEnter={e => {
                Object.assign(e.currentTarget.style, zone.hoverStyle)
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  Object.assign(e.currentTarget.style, zone.style)
                }
              }}
              onClick={() => onSelectZone(zone.id)}
            >
              {zone.label}
              <div
                className={`font-mono text-[8px] mt-0.5 opacity-80 ${STATUS_CLASS[status]}`}
                style={{
                  animation:
                    status === 'crit'
                      ? 'blink 0.4s infinite'
                      : status === 'warn'
                      ? 'blink 1s infinite'
                      : undefined,
                }}
              >
                {ZONE_STATUS_LABELS[status]}
              </div>
            </div>
          )
        })}
      </div>

      {/* Reset button */}
      <button
        className="w-full mt-2.5 py-2 font-head text-[10px] tracking-widest bg-transparent border border-border-bright text-text-dim cursor-pointer transition-all hover:border-blue hover:text-blue"
        onClick={() => onSelectZone('ALL')}
      >
        [ RESET — SHOW ALL SECTORS ]
      </button>
    </div>
  )
}