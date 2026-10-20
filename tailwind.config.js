/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050508',
        'bg-panel': '#0a0a10',
        'bg-panel2': '#0d0d15',
        border: '#1a1a2e',
        'border-bright': '#252540',
        blue: '#00d4ff',
        'blue-dim': '#007a99',
        pink: '#ff0090',
        'pink-dim': '#880050',
        green: '#00ff88',
        'green-dim': '#006633',
        yellow: '#ffcc00',
        red: '#ff2244',
        'red-dim': '#880022',
        purple: '#cc44ff',
        'text-main': '#c0c8d8',
        'text-dim': '#556070',
      },
      fontFamily: {
        head: ['Orbitron', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      animation: {
        'pulse-border': 'pulse-border 3s infinite',
        'inner-pulse': 'inner-pulse 3s infinite',
        'blink': 'blink 2s infinite',
        'blink-fast': 'blink 0.5s infinite',
        'blink-medium': 'blink 1s infinite',
        'radar-expand': 'radar-expand 4s linear infinite',
        'sweep': 'sweep 5s linear infinite',
        'flicker': 'flicker 0.3s infinite alternate',
        'crit-flash': 'crit-flash 1.5s infinite alternate',
        'lamp-pulse': 'lamp-pulse 2s ease-in-out infinite',
        'cam-sweep': 'cam-sweep 4s ease-in-out infinite',
        'wifi-ring': 'wifi-ring 1s ease-out infinite',
        'crosshair-spin': 'crosshair-spin 4s linear infinite',
        'gun-recoil': 'gun-recoil 0.8s ease-in-out infinite',
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { boxShadow: '0 0 8px #00d4ff' },
          '50%': { boxShadow: '0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.3)' },
        },
        'inner-pulse': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'radar-expand': {
          '0%': { width: '0', height: '0', opacity: '0.8' },
          '100%': { width: '400px', height: '400px', opacity: '0' },
        },
        'sweep': { to: { transform: 'rotate(360deg)' } },
        'flicker': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.8' },
        },
        'crit-flash': {
          '0%': { background: 'rgba(255,34,68,0.05)', borderColor: '#ff2244' },
          '100%': { background: 'rgba(255,34,68,0.15)', borderColor: 'rgba(255,34,68,0.5)' },
        },
        'lamp-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'cam-sweep': {
          '0%': { transform: 'rotate(-18deg)' },
          '50%': { transform: 'rotate(18deg)' },
          '100%': { transform: 'rotate(-18deg)' },
        },
        'wifi-ring': {
          '0%': { opacity: '0.8', strokeDashoffset: '0' },
          '100%': { opacity: '0', strokeDashoffset: '-60' },
        },
        'crosshair-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gun-recoil': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(2px)' },
        },
      },
    },
  },
  plugins: [],
}