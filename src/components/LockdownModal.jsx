export default function LockdownModal({ show, onConfirm, onCancel }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div
        className="bg-bg-panel border border-red p-8 max-w-sm w-[90%] text-center"
        style={{ boxShadow: '0 0 40px rgba(255,34,68,0.3)' }}
      >
        <h2
          className="font-head text-base tracking-widest mb-3"
          style={{ color: '#ff2244' }}
        >
          ⚠ WARNING
        </h2>
        <p className="font-mono text-[13px] text-text-dim mb-6 leading-relaxed">
          SYSTEM LOCKDOWN WILL DISABLE ALL ZONES.
          <br />
          POWER WILL BE CUT TO NON-ESSENTIAL SYSTEMS.
          <br />
          <br />
          CONFIRM THIS ACTION?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 font-head text-[11px] tracking-widest border border-red text-red cursor-pointer transition-all"
            style={{ background: 'rgba(255,34,68,0.15)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,34,68,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,34,68,0.15)')}
          >
            CONFIRM
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-3 font-head text-[11px] tracking-widest bg-transparent border border-border-bright text-text-dim cursor-pointer transition-all"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#c0c8d8'
              e.currentTarget.style.color = '#c0c8d8'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#252540'
              e.currentTarget.style.color = '#556070'
            }}
          >
            ABORT
          </button>
        </div>
      </div>
    </div>
  )
}