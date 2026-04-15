const paletteMap = {
  gaming: ['#f7c477', '#8f6bff', '#090d14', '#1f2c45'],
  workstation: ['#7ac0ae', '#6aa7ad', '#081018', '#1c3440'],
  business: ['#efe7d4', '#6aa7ad', '#0c1218', '#223042'],
  monitor: ['#7fb0d6', '#6aa7ad', '#081018', '#1b3652'],
  accessory: ['#d48d74', '#d6b06b', '#121820', '#3d2a24'],
  desktop: ['#6aa7ad', '#d6b06b', '#0a1016', '#263a47'],
}

function commonsImage(fileName, width = 1600) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`
}

const categoryPhotoMap = {
  laptops: [
    commonsImage('Laptop image.jpg'),
    commonsImage('Laptop computer.jpg'),
    commonsImage('Laptop PC.jpg'),
  ],
  desktops: [
    commonsImage('My computer with desk.jpg'),
    commonsImage('All-in-One PC.jpg'),
    commonsImage('Computer desk.jpg'),
  ],
  gaming: [
    commonsImage('Gaming computer.jpg'),
    commonsImage('Gaming pc.jpg'),
    commonsImage('Windows Gaming PC.jpg'),
  ],
  workstations: [
    commonsImage('Desk setup.jpg'),
    commonsImage('Computer desk.jpg'),
    commonsImage('Laptop computer.jpg'),
  ],
  monitors: [
    commonsImage('Computer monitor.jpg'),
    commonsImage('Average Computer Monitor.png'),
    commonsImage('Dell Computer Monitor.png'),
  ],
  accessories: [
    commonsImage('Keyboard (29544637393).jpg'),
    commonsImage('Keyboard with mouse.jpg'),
    commonsImage('A computer mouse in black and white with a computer keyboard behind it.jpg'),
  ],
}

function svgToDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function getPalette(accent) {
  return paletteMap[accent] || paletteMap.gaming
}

function getDeviceFrame(category) {
  const frames = {
    gaming: {
      body: "<rect x='185' y='230' width='830' height='420' rx='38' fill='#09111d' stroke='url(#shine)' stroke-width='10' />",
      screen: "<rect x='240' y='278' width='720' height='318' rx='24' fill='#07111f' stroke='rgba(255,255,255,0.12)' />",
      base: "<path d='M265 692h665l108 86H160z' fill='url(#shine)' opacity='0.92' />",
      shadow: "<ellipse cx='600' cy='786' rx='320' ry='28' fill='rgba(0,0,0,0.35)' />",
    },
    laptops: {
      body: "<rect x='200' y='220' width='800' height='430' rx='34' fill='#0a1321' stroke='url(#shine)' stroke-width='9' />",
      screen: "<rect x='252' y='270' width='696' height='330' rx='20' fill='#07101d' stroke='rgba(255,255,255,0.12)' />",
      base: "<path d='M245 686h710l92 64H153z' fill='url(#shine)' opacity='0.88' />",
      shadow: "<ellipse cx='600' cy='774' rx='300' ry='24' fill='rgba(0,0,0,0.34)' />",
    },
    desktops: {
      body: "<rect x='235' y='176' width='270' height='500' rx='32' fill='#0c1523' stroke='url(#shine)' stroke-width='9' />",
      screen: "<rect x='555' y='255' width='365' height='238' rx='22' fill='#07111f' stroke='rgba(255,255,255,0.12)' />",
      base: "<rect x='645' y='512' width='180' height='22' rx='11' fill='url(#shine)' opacity='0.84' /><rect x='706' y='494' width='58' height='38' rx='14' fill='#152032' />",
      shadow: "<ellipse cx='600' cy='774' rx='310' ry='26' fill='rgba(0,0,0,0.34)' />",
    },
    workstations: {
      body: "<rect x='200' y='220' width='800' height='430' rx='34' fill='#09121e' stroke='url(#shine)' stroke-width='9' />",
      screen: "<rect x='252' y='270' width='696' height='330' rx='18' fill='#06101b' stroke='rgba(255,255,255,0.14)' />",
      base: "<path d='M228 688h744l78 58H150z' fill='url(#shine)' opacity='0.84' /><rect x='505' y='648' width='190' height='26' rx='13' fill='rgba(255,255,255,0.08)' />",
      shadow: "<ellipse cx='600' cy='778' rx='308' ry='24' fill='rgba(0,0,0,0.35)' />",
    },
    monitors: {
      body: "<rect x='165' y='170' width='870' height='470' rx='30' fill='#0a1320' stroke='url(#shine)' stroke-width='10' />",
      screen: "<rect x='215' y='218' width='770' height='374' rx='18' fill='#07111f' stroke='rgba(255,255,255,0.12)' />",
      base: "<rect x='560' y='642' width='80' height='84' rx='16' fill='#152032' /><rect x='458' y='714' width='284' height='24' rx='12' fill='url(#shine)' opacity='0.88' />",
      shadow: "<ellipse cx='600' cy='782' rx='314' ry='28' fill='rgba(0,0,0,0.34)' />",
    },
    accessories: {
      body: "<rect x='190' y='250' width='820' height='350' rx='34' fill='#0b1420' stroke='url(#shine)' stroke-width='9' />",
      screen: "<circle cx='420' cy='426' r='95' fill='#08101b' stroke='rgba(255,255,255,0.12)' /><rect x='575' y='320' width='250' height='220' rx='28' fill='#08101b' stroke='rgba(255,255,255,0.12)' />",
      base: "<path d='M276 650h650l72 58H202z' fill='url(#shine)' opacity='0.84' />",
      shadow: "<ellipse cx='600' cy='766' rx='298' ry='24' fill='rgba(0,0,0,0.34)' />",
    },
  }

  return frames[category] || frames.gaming
}

function getDisplayScene(variant, primary, secondary, tertiary) {
  const scenes = {
    product: `
      <rect x='0' y='0' width='100%' height='100%' fill='url(#screenGlow)' />
      <circle cx='585' cy='145' r='132' fill='${secondary}' opacity='0.20' />
      <circle cx='190' cy='290' r='120' fill='${primary}' opacity='0.18' />
      <path d='M0 250C145 178 268 196 405 260s246 92 392 56 250-30 403 44v240H0z' fill='url(#landscape)' opacity='0.95' />
      <path d='M0 215c119-33 232-16 358 34s246 74 390 42 286-18 452 56v58H0z' fill='rgba(255,255,255,0.06)' />
    `,
    lifestyle: `
      <rect x='0' y='0' width='100%' height='100%' fill='url(#screenGlow)' />
      <rect x='70' y='70' width='560' height='210' rx='26' fill='rgba(255,255,255,0.07)' />
      <rect x='100' y='104' width='322' height='18' rx='9' fill='rgba(255,255,255,0.84)' />
      <rect x='100' y='144' width='240' height='16' rx='8' fill='rgba(255,255,255,0.24)' />
      <rect x='100' y='186' width='452' height='12' rx='6' fill='rgba(255,255,255,0.14)' />
      <rect x='100' y='214' width='468' height='12' rx='6' fill='rgba(255,255,255,0.12)' />
      <rect x='100' y='242' width='404' height='12' rx='6' fill='rgba(255,255,255,0.12)' />
      <rect x='442' y='332' width='210' height='120' rx='20' fill='rgba(255,255,255,0.08)' />
      <rect x='110' y='332' width='290' height='120' rx='20' fill='rgba(255,255,255,0.06)' />
      <circle cx='594' cy='156' r='112' fill='${tertiary}' opacity='0.12' />
      <path d='M28 482h650l64 96H0z' fill='url(#shine)' opacity='0.42' />
    `,
    specs: `
      <rect x='0' y='0' width='100%' height='100%' fill='url(#screenGlow)' />
      <rect x='74' y='64' width='612' height='384' rx='26' fill='rgba(7,17,31,0.76)' stroke='rgba(255,255,255,0.08)' />
      <rect x='110' y='112' width='156' height='118' rx='18' fill='rgba(255,255,255,0.06)' />
      <rect x='286' y='112' width='156' height='118' rx='18' fill='rgba(255,255,255,0.06)' />
      <rect x='462' y='112' width='186' height='118' rx='18' fill='rgba(255,255,255,0.06)' />
      <rect x='110' y='270' width='538' height='18' rx='9' fill='rgba(255,255,255,0.12)' />
      <rect x='110' y='314' width='464' height='18' rx='9' fill='rgba(255,255,255,0.10)' />
      <rect x='110' y='358' width='382' height='18' rx='9' fill='rgba(255,255,255,0.10)' />
      <circle cx='596' cy='340' r='62' fill='${secondary}' opacity='0.18' />
    `,
  }

  return scenes[variant] || scenes.product
}

export function createProductVisual(name, category, accent = 'gaming', variant = 'product') {
  const [primary, secondary, dark, tertiary] = getPalette(accent)
  const frame = getDeviceFrame(category)
  const categoryLabel = String(category).replace(/-/g, ' ').toUpperCase()

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
      <defs>
        <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${dark}' />
          <stop offset='100%' stop-color='#101d35' />
        </linearGradient>
        <linearGradient id='shine' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${primary}' />
          <stop offset='100%' stop-color='${secondary}' />
        </linearGradient>
        <linearGradient id='screenGlow' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#14243c' />
          <stop offset='48%' stop-color='${tertiary}' />
          <stop offset='100%' stop-color='#0b1220' />
        </linearGradient>
        <linearGradient id='landscape' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${primary}' />
          <stop offset='100%' stop-color='${secondary}' />
        </linearGradient>
      </defs>
      <rect width='1200' height='900' rx='40' fill='url(#bg)' />
      <circle cx='1002' cy='136' r='174' fill='${secondary}' opacity='0.18' />
      <circle cx='184' cy='168' r='142' fill='${primary}' opacity='0.14' />
      <path d='M0 0h1200v190c-128-68-302-94-500-40C522 196 372 208 218 162 132 136 60 98 0 48z' fill='rgba(255,255,255,0.04)' />
      ${frame.body}
      <g transform='translate(240 278)'>
        ${getDisplayScene(variant, primary, secondary, tertiary)}
      </g>
      ${frame.base}
      ${frame.shadow}
      <rect x='84' y='86' width='228' height='48' rx='24' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.08)' />
      <text x='118' y='118' fill='${primary}' font-size='24' font-family='Space Grotesk, Arial' font-weight='700'>${categoryLabel}</text>
      <text x='84' y='782' fill='white' font-size='60' font-family='Space Grotesk, Arial' font-weight='700'>${name}</text>
      <text x='84' y='830' fill='${primary}' font-size='26' font-family='Manrope, Arial'>Premium computing platform</text>
    </svg>
  `

  return svgToDataUri(svg)
}

export function getCategoryPhotos(category) {
  return categoryPhotoMap[category] || categoryPhotoMap.laptops
}

export function getProductPhotos(category, seed = 0) {
  const photos = getCategoryPhotos(category)
  if (!photos.length) {
    return [createProductVisual(category, category)]
  }

  const start = seed % photos.length
  return [...photos.slice(start), ...photos.slice(0, start)]
}

export function createCategoryVisual(label, accent = 'gaming') {
  const [primary, secondary, dark, tertiary] = getPalette(accent)

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
      <defs>
        <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${dark}' />
          <stop offset='100%' stop-color='#132235' />
        </linearGradient>
        <linearGradient id='shine' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${primary}' />
          <stop offset='100%' stop-color='${secondary}' />
        </linearGradient>
      </defs>
      <rect width='1200' height='900' rx='40' fill='url(#bg)' />
      <circle cx='1016' cy='156' r='190' fill='${secondary}' opacity='0.16' />
      <circle cx='202' cy='208' r='158' fill='${primary}' opacity='0.14' />
      <rect x='136' y='180' width='928' height='520' rx='42' fill='rgba(7,17,31,0.72)' stroke='rgba(255,255,255,0.08)' />
      <rect x='192' y='236' width='420' height='248' rx='28' fill='rgba(255,255,255,0.06)' />
      <rect x='652' y='236' width='218' height='104' rx='24' fill='rgba(255,255,255,0.07)' />
      <rect x='894' y='236' width='112' height='104' rx='24' fill='rgba(255,255,255,0.11)' />
      <rect x='652' y='368' width='354' height='116' rx='28' fill='rgba(255,255,255,0.05)' />
      <path d='M194 542h812l58 96H136z' fill='url(#shine)' opacity='0.56' />
      <circle cx='330' cy='360' r='82' fill='${tertiary}' opacity='0.32' />
      <rect x='264' y='474' width='404' height='16' rx='8' fill='rgba(255,255,255,0.16)' />
      <rect x='264' y='512' width='330' height='16' rx='8' fill='rgba(255,255,255,0.12)' />
      <text x='136' y='120' fill='${primary}' font-size='28' font-family='Space Grotesk, Arial' font-weight='700'>COLECCION</text>
      <text x='136' y='782' fill='white' font-size='78' font-family='Space Grotesk, Arial' font-weight='700'>${label}</text>
    </svg>
  `

  return svgToDataUri(svg)
}

export function createBrandVisual(brand, accent = 'business') {
  const [primary, secondary, dark, tertiary] = getPalette(accent)
  const monogram = brand.slice(0, 2).toUpperCase()

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'>
      <defs>
        <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${dark}' />
          <stop offset='100%' stop-color='${tertiary}' />
        </linearGradient>
        <linearGradient id='shine' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${primary}' />
          <stop offset='100%' stop-color='${secondary}' />
        </linearGradient>
      </defs>
      <rect width='640' height='420' rx='36' fill='url(#bg)' />
      <circle cx='526' cy='96' r='86' fill='${secondary}' opacity='0.16' />
      <circle cx='126' cy='110' r='74' fill='${primary}' opacity='0.12' />
      <rect x='72' y='74' width='132' height='132' rx='32' fill='url(#shine)' />
      <text x='102' y='158' fill='#09111b' font-size='58' font-family='Space Grotesk, Arial' font-weight='700'>${monogram}</text>
      <text x='72' y='286' fill='white' font-size='56' font-family='Space Grotesk, Arial' font-weight='700'>${brand}</text>
      <text x='72' y='334' fill='${primary}' font-size='22' font-family='Manrope, Arial'>Selected hardware partner</text>
    </svg>
  `

  return svgToDataUri(svg)
}

export function createPromoVisual(title, accent = 'gaming') {
  const [primary, secondary, dark, tertiary] = getPalette(accent)

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
      <defs>
        <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${dark}' />
          <stop offset='100%' stop-color='#10213a' />
        </linearGradient>
        <linearGradient id='shine' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${primary}' />
          <stop offset='100%' stop-color='${secondary}' />
        </linearGradient>
      </defs>
      <rect width='1200' height='900' rx='40' fill='url(#bg)' />
      <circle cx='956' cy='148' r='188' fill='${secondary}' opacity='0.20' />
      <circle cx='214' cy='174' r='150' fill='${primary}' opacity='0.16' />
      <rect x='132' y='176' width='936' height='548' rx='42' fill='rgba(7,17,31,0.72)' stroke='rgba(255,255,255,0.08)' />
      <rect x='194' y='238' width='418' height='424' rx='34' fill='rgba(255,255,255,0.05)' />
      <rect x='648' y='238' width='356' height='184' rx='30' fill='rgba(255,255,255,0.07)' />
      <rect x='648' y='452' width='172' height='126' rx='26' fill='rgba(255,255,255,0.05)' />
      <rect x='846' y='452' width='158' height='126' rx='26' fill='rgba(255,255,255,0.09)' />
      <path d='M194 628h810l60 88H136z' fill='url(#shine)' opacity='0.52' />
      <text x='194' y='758' fill='white' font-size='74' font-family='Space Grotesk, Arial' font-weight='700'>${title}</text>
    </svg>
  `

  return svgToDataUri(svg)
}
