const paletteMap = {
  gaming: ['#d6b06b', '#8f6bff', '#0a1016'],
  workstation: ['#7ac0ae', '#6aa7ad', '#0a1016'],
  business: ['#efe7d4', '#6aa7ad', '#131920'],
  monitor: ['#7fb0d6', '#6aa7ad', '#091016'],
  accessory: ['#d48d74', '#d6b06b', '#121820'],
  desktop: ['#6aa7ad', '#d6b06b', '#0a1016'],
}

export function createProductVisual(name, category, accent = 'gaming') {
  const [primary, secondary, dark] = paletteMap[accent] || paletteMap.gaming
  const label = encodeURIComponent(name)
  const categoryLabel = encodeURIComponent(category.toUpperCase())

  return `data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
      <defs>
        <linearGradient id='bg' x1='0' x2='1' y1='0' y2='1'>
          <stop stop-color='${dark}' offset='0%' />
          <stop stop-color='#101d35' offset='100%' />
        </linearGradient>
        <linearGradient id='shine' x1='0' x2='1'>
          <stop stop-color='${primary}' offset='0%' />
          <stop stop-color='${secondary}' offset='100%' />
        </linearGradient>
      </defs>
      <rect width='1200' height='900' rx='40' fill='url(%23bg)' />
      <circle cx='930' cy='130' r='170' fill='${secondary}' opacity='0.22' />
      <circle cx='210' cy='170' r='140' fill='${primary}' opacity='0.16' />
      <rect x='160' y='230' width='880' height='420' rx='36' fill='#0b1426' stroke='url(%23shine)' stroke-width='10' />
      <rect x='220' y='285' width='760' height='310' rx='22' fill='#07111f' stroke='rgba(255,255,255,0.12)' />
      <path d='M260 690h680l90 70H170z' fill='url(%23shine)' opacity='0.88' />
      <text x='160' y='132' fill='white' font-size='48' font-family='Space Grotesk, Arial' font-weight='700'>${categoryLabel}</text>
      <text x='160' y='770' fill='white' font-size='62' font-family='Space Grotesk, Arial' font-weight='700'>${label}</text>
      <text x='160' y='830' fill='${primary}' font-size='28' font-family='Manrope, Arial'>Premium computing platform</text>
    </svg>`.replace(/\n/g, '')
}
