export default function LockdownOverlay({ show, onUnlock }) {
  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6"
      style={{ background: 'rgba(0,0,0,0.95)' }}
    >
      <div className="lockdown-title">⚠ LOCKED DOWN ⚠</div>

      <div className="font-mono text-sm text-text-dim tracking-widest">
        ALL SYSTEMS DISABLED — OPERATOR OVERRIDE ACTIVE
      </div>

      <div
        className="font-mono text-xs text-center leading-loose max-w-sm"
        style={{ color: 'rgba(255,34,68,0.6)' }}
      >
        {'> CUTTING POWER TO NON-ESSENTIAL NODES...'}
        <br />
        {'> DEPLOYING SECURITY PERIMETER...'}
        <br />
        {'> ALERTING COMMAND AUTHORITY...'}
        <br />
        {'> AWAITING AUTHORIZATION CODE...'}
      </div>

      <button
        onClick={onUnlock}
        className="max-w-[300px] w-full py-3.5 font-head text-xs tracking-widest border border-red text-red cursor-pointer transition-all mt-2"
        style={{
          background: 'rgba(255,34,68,0.08)',
          textShadow: '0 0 8px rgba(255,34,68,0.5)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,34,68,0.2)'
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255,34,68,0.4), inset 0 0 20px rgba(255,34,68,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,34,68,0.08)'
          e.currentTarget.style.boxShadow = ''
        }}
      >
        [ DISENGAGE LOCKDOWN ]
      </button>
    </div>
  )
}