import { useState, useEffect } from 'react'

export default function Header({ alertBanner, muted, onToggleMute }) {
  const [time, setTime] = useState('')
  const isNominal = !alertBanner.show

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <header
        className="flex items-center justify-between px-6 py-3 border-b sticky top-0 z-50 backdrop-blur-md"
        style={{
          borderColor: '#252540',
          background: 'linear-gradient(180deg, rgba(0,212,255,0.04) 0%, transparent 100%)',
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div
            className="w-9 h-9 border-2 border-blue flex items-center justify-center relative"
            style={{ animation: 'pulse-border 3s infinite' }}
          >
            <div
              className="absolute inset-[3px] bg-blue opacity-20"
              style={{ animation: 'inner-pulse 3s infinite' }}
            />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon
                points="8,1 15,5 15,11 8,15 1,11 1,5"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Title */}
          <h1
            className="font-head text-lg font-black tracking-widest text-blue"
            style={{ textShadow: '0 0 15px #00d4ff' }}
          >
            NEON_GRID
          </h1>

          {/* Status */}
          <div className="flex items-center gap-2 font-mono text-xs text-text-dim">
            <div
              className={`w-2 h-2 rounded-full ${
                isNominal ? 'bg-green box-glow-green' : 'bg-red box-glow-red'
              }`}
              style={{
                animation: isNominal ? 'blink 2s infinite' : 'blink 0.5s infinite',
              }}
            />
            <span className={isNominal ? 'text-text-dim' : 'text-red'}>
              {isNominal ? 'SYSTEMS NOMINAL' : 'CRITICAL ALERT'}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-sm text-yellow tracking-widest">{time}</div>
          <button
            onClick={onToggleMute}
            className={`font-head text-[10px] tracking-wider px-3 py-1.5 border transition-all ${
              muted
                ? 'border-pink text-pink'
                : 'border-border-bright text-text-dim hover:border-blue hover:text-blue'
            }`}
            style={muted ? { boxShadow: '0 0 10px rgba(255,0,144,0.3)' } : {}}
          >
            {muted ? '◯ AUDIO OFF' : '◉ AUDIO ON'}
          </button>
        </div>
      </header>

      {/* Alert banner */}
      {alertBanner.show && (
        <div
          className="flex items-center gap-3 px-6 py-2.5 border-b-2 border-red font-head text-xs tracking-widest text-red"
          style={{
            background: 'rgba(255,34,68,0.15)',
            textShadow: '0 0 10px #ff2244',
            animation: 'flicker 0.3s infinite alternate',
          }}
        >
          ⚠ CRITICAL ALERT ACTIVE —{' '}
          <span>{alertBanner.message}</span> — ACKNOWLEDGE REQUIRED
        </div>
      )}
    </>
  )
}