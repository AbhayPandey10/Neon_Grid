import { useEffect, useRef } from 'react'

const CHART_OPTIONS = {
  animation: false,
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { display: false },
    y: { display: false, min: 0, max: 100 },
  },
  elements: {
    point: { radius: 0 },
    line: { borderWidth: 1.5, tension: 0.4 },
  },
}

function makeSparkData(color) {
  return {
    labels: Array(60).fill(''),
    datasets: [
      {
        data: Array(60).fill(50),
        borderColor: color,
        fill: true,
        backgroundColor: color + '18',
      },
    ],
  }
}

function useSparkChart(canvasId, color, value) {
  const chartRef = useRef(null)

  useEffect(() => {
    let chart
    const canvas = document.getElementById(canvasId)
    if (!canvas) return

    import('chart.js').then(({ Chart, registerables }) => {
      Chart.register(...registerables)
      const existing = Chart.getChart(canvas)
      if (existing) existing.destroy()
      chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: makeSparkData(color),
        options: CHART_OPTIONS,
      })
      chartRef.current = chart
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    chart.data.datasets[0].data.push(value)
    chart.data.datasets[0].data.shift()
    chart.update('none')
  }, [value])
}

const METRIC_CARDS = [
  { key: 'network',  label: '// NETWORK HEALTH',  accent: '#00d4ff', textClass: 'text-blue glow-blue',     barClass: 'bg-blue box-glow-blue'     },
  { key: 'power',    label: '// POWER USAGE',      accent: '#ffcc00', textClass: 'text-yellow glow-yellow', barClass: 'bg-yellow box-glow-yellow' },
  { key: 'firewall', label: '// FIREWALL STATUS',  accent: '#00ff88', textClass: 'text-green glow-green',   barClass: 'bg-green box-glow-green'   },
  { key: 'traffic',  label: '// TRAFFIC LOAD',     accent: '#ff0090', textClass: 'text-pink glow-pink',     barClass: 'bg-pink box-glow-pink'     },
]

export default function TelemetryPanel({ metrics }) {
  useSparkChart('powerChart',   '#ffcc00', metrics.power)
  useSparkChart('trafficChart', '#ff0090', metrics.traffic)

  return (
    <div className="bg-bg-panel p-4 relative overflow-hidden panel-accent col-span-2 row-span-1">
      <div className="font-head text-[11px] tracking-widest text-text-dim mb-3 flex items-center justify-between">
        SYSTEM TELEMETRY
        <span className="font-mono text-[11px] px-2 py-0.5 border border-border-bright text-text-dim">LIVE</span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3">
        {METRIC_CARDS.map(card => {
          const val = Math.round(metrics[card.key])
          return (
            <div key={card.key} className="bg-bg-panel2 border border-border-bright p-3 relative overflow-hidden">
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: card.accent, boxShadow: `0 0 8px ${card.accent}` }}
              />
              <div className="font-mono text-[10px] text-text-dim tracking-wide mb-1">{card.label}</div>
              <div className={`font-head text-[26px] font-black leading-none mb-1.5 ${card.textClass}`}>
                {val}%
              </div>
              <div className="h-1 rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className={`h-full rounded-sm transition-all duration-700 ${card.barClass}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Sparklines */}
      <div className="flex gap-2.5 mt-3">
        <div className="flex-[2] bg-bg-panel2 border border-border-bright p-2.5 pb-1.5">
          <div className="font-mono text-[10px] text-text-dim tracking-wide mb-1">// POWER — 60s HISTORY</div>
          <canvas id="powerChart" height="60" />
        </div>
        <div className="flex-[2] bg-bg-panel2 border border-border-bright p-2.5 pb-1.5">
          <div className="font-mono text-[10px] text-text-dim tracking-wide mb-1">// TRAFFIC — 60s HISTORY</div>
          <canvas id="trafficChart" height="60" />
        </div>
      </div>
    </div>
  )
}