import { useRef, useCallback } from 'react'

export function useAudio(muted) {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      ctxRef.current = new AudioCtx()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback(
    (freq, dur, type = 'sine', vol = 0.08) => {
      if (muted) return
      try {
        const c = getCtx()
        const o = c.createOscillator()
        const g = c.createGain()
        o.connect(g)
        g.connect(c.destination)
        o.type = type
        o.frequency.setValueAtTime(freq, c.currentTime)
        g.gain.setValueAtTime(vol, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
        o.start()
        o.stop(c.currentTime + dur)
      } catch (e) {}
    },
    [muted, getCtx]
  )

  const playClick = useCallback(() => {
    playTone(800, 0.06, 'square', 0.05)
  }, [playTone])

  const playAlert = useCallback(() => {
    playTone(1200, 0.15, 'sawtooth', 0.1)
    setTimeout(() => playTone(900, 0.15, 'sawtooth', 0.1), 200)
  }, [playTone])

  return { playClick, playAlert }
}