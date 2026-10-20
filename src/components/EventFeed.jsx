export default function EventFeed({ warnings, critCount, selectedZone, onAck }) {
  const filtered =
    selectedZone === 'ALL'
      ? warnings
      : warnings.filter(w => w.location === selectedZone)

  return (
    <div className="bg-bg-panel p-4 relative overflow-hidden panel-accent h-full">
      {/* Title */}
      <div className="font-head text-[11px] tracking-widest text-text-dim mb-3 flex items-center justify-between">
        EVENT LOG // <span className="text-blue">{selectedZone}</span>
        <span
          className="font-mono text-[11px] px-2 py-0.5 border"
          style={{ color: '#ff2244', borderColor: '#880022' }}
        >
          {critCount} CRITICAL
        </span>
      </div>

      {/* Feed */}
      <div className="h-[240px] overflow-y-auto feed-scroll">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full font-mono text-xs text-text-dim">
            // NO EVENTS FOR THIS SECTOR //
          </div>
        ) : (
          filtered.map(w => (
            <FeedItem key={w.id} warning={w} onAck={onAck} />
          ))
        )}
      </div>
    </div>
  )
}

function FeedItem({ warning, onAck }) {
  const { id, time, severity, location, message } = warning
  const isCrit = severity === 'Critical'
  const isMed = severity === 'Medium'

  const borderColor = isCrit ? '#ff2244' : isMed ? '#ffcc00' : '#007a99'
  const bgColor = isCrit ? 'rgba(255,34,68,0.08)' : 'transparent'

  return (
    <div
      className="grid gap-2 items-center px-2.5 py-2 mb-1 font-mono text-xs border-l-2 bg-bg-panel2 transition-all hover:bg-white/[0.03]"
      style={{
        gridTemplateColumns: '90px 70px 1fr auto',
        borderLeftColor: borderColor,
        background: bgColor,
        animation: isCrit ? 'crit-flash 1.5s infinite alternate' : undefined,
      }}
    >
      <span className="text-text-dim">{time}</span>

      <span
        className="font-bold"
        style={{
          color: isCrit ? '#ff2244' : isMed ? '#ffcc00' : '#00d4ff',
          textShadow: isCrit ? '0 0 8px #ff2244' : undefined,
        }}
      >
        {severity.toUpperCase()}
      </span>

      <span className="text-text-main">
        [{location}] {message}
      </span>

      {isCrit ? (
        <button
          className="font-head text-[9px] tracking-wide px-2 py-1 border border-red text-red bg-transparent whitespace-nowrap transition-all hover:bg-red/20"
          style={{ boxShadow: undefined }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 8px rgba(255,34,68,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}
          onClick={() => onAck(id)}
        >
          ACK
        </button>
      ) : (
        <span />
      )}
    </div>
  )
}