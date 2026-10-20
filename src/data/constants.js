export const ZONES = ['Neon Market', 'Factory Zone 4', 'Rich Peak', 'The Underground']

export const ZONE_COLORS = {
  'Neon Market': '#ff0090',
  'Factory Zone 4': '#ffcc00',
  'Rich Peak': '#00d4ff',
  'The Underground': '#cc44ff',
  Global: '#00ff88',
}

export const MESSAGES = {
  Critical: [
    'SYSTEM BREACH DETECTED',
    'UNAUTHORIZED ACCESS DETECTED',
    'GRID FAILURE IMMINENT',
    'PERIMETER BREACH',
    'POWER CORE UNSTABLE',
  ],
  Medium: [
    'Voltage fluctuation detected',
    'Encrypted packet intercepted',
    'Traffic anomaly in sector',
    'Firewall stress detected',
    'Network lag spike',
  ],
  Low: [
    'Routine scan complete',
    'Node sync successful',
    'Drone patrol returned',
    'Backup completed',
    'Signal noise low',
  ],
}

export const INITIAL_ZONE_STATUSES = {
  'Neon Market': 'safe',
  'Factory Zone 4': 'warn',
  'Rich Peak': 'safe',
  'The Underground': 'crit',
}

export const ZONE_STATUS_LABELS = {
  safe: '◆ SAFE',
  warn: '⚡ WARNING',
  crit: '⚠ CRITICAL',
}

export const ZONE_MAP_IDS = {
  'Rich Peak': 'zRich',
  'Factory Zone 4': 'zFactory',
  'Neon Market': 'zNeon',
  'The Underground': 'zUnder',
}