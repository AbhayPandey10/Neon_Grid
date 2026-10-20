import { useEffect, useRef } from 'react'
import { ZONE_COLORS, ZONE_STATUS_LABELS } from '../data/constants'

const STATUS_COLOR = {
  safe: '#00ff88',
  warn: '#ffcc00',
  crit: '#ff2244',
}

const STATUS_ANIM = {
  safe: undefined,
  warn: 'blink 1s infinite',
  crit: 'blink 0.4s infinite',
}

export default function NetworkPanel({ metrics, zoneStatuses, onSelectZone }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    import('chart.js').then(({ Chart, registerables }) => {
      Chart.register(...registerables)
      const existing = Chart.getChart(canvas)
      if (existing) existing.destroy()
      chartRef.current = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: Array(60).fill(''),
          datasets: [{
            data: Array(60).fill(50),
            borderColor: '#00d4ff',
            fill: true,
            backgroundColor: '#00d4ff18',
          }],
        },
        options: {
          animation: false,
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { display: false },
            y: { display: false, min: 0, max: 100 },
          },
          elements: {
            point: { radius: 0 },
            line: { borderWidth: 2, tension: 0.4 },
          },
        },
      })
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    chart.data.datasets[0].data.push(metrics.network)
    chart.data.datasets[0].data.shift()
    chart.update('none')
  }, [metrics.network])

  return (
    <div className="bg-bg-panel p-4 relative overflow-hidden panel-accent h-full flex flex-col">
      <div className="font-head text-[11px] tracking-widest text-text-dim mb-3 flex items-center justify-between">
        NETWORK PULSE
        <span className="font-mono text-[11px] px-2 py-0.5 border border-border-bright text-text-dim">LIVE</span>
      </div>

      <canvas ref={canvasRef} height="120" />

      <div className="mt-3 flex-1">
        <div className="font-head text-[11px] tracking-widest text-text-dim mb-2">ZONE STATUS</div>
        <div className="flex flex-col gap-1.5">
          {Object.entries(zoneStatuses).map(([zone, status]) => (
            <div
              key={zone}
              onClick={() => onSelectZone(zone)}
              className="flex items-center justify-between px-2 py-1.5 bg-bg-panel2 border border-border-bright font-mono text-[11px] cursor-pointer transition-all"
              onMouseEnter={e => (e.currentTarget.style.borderColor = ZONE_COLORS[zone])}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#252540')}
            >
              <span style={{ color: ZONE_COLORS[zone] }}>{zone}</span>
              <span
                className="text-[10px]"
                style={{ color: STATUS_COLOR[status], animation: STATUS_ANIM[status] }}
              >
                {ZONE_STATUS_LABELS[status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}