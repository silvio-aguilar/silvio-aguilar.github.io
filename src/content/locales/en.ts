import type { LocalizedContent } from '../types'

const en: LocalizedContent = {
  headline: 'Software Development · Cybersecurity',
  bio: [
    "I'm Silvio Aguilar (@kurzerhand), a full stack developer and cybersecurity student based in Madrid. I build mobile and web apps end to end: my community-safety app, BGuardian, is live on Google Play.",
    'I study cross-platform and web application development (DAM + DAW) at Euroformac and practise security in my own Kali Linux lab. My motto sums up how I see it: “We hack to protect”.',
    'Before coding I worked in film and sound. I trained as a sound technician, worked as a production assistant at Los Ilusos Films and had a supporting role in “Quién lo impide” by Jonás Trueba. That is where my eye for detail — and the audiovisual side of this profile — comes from.',
  ],
  profiles: {
    dev: {
      label: 'Mobile development',
      tagline: 'Mobile and web apps, from idea to store',
      summary:
        'Flutter and React Native on mobile, React and TypeScript on the web, Firebase and Supabase behind them. One app on Google Play and several products of my own.',
    },
    security: {
      label: 'Cybersecurity',
      tagline: 'We hack to protect',
      summary:
        'Personal Kali Linux lab, training in web application security and projects focused on incident management and user privacy.',
    },
    audiovisual: {
      label: 'Audiovisual',
      tagline: 'Film, sound and production',
      summary:
        'Qualified sound technician, production assistant at Los Ilusos Films and supporting actor in “Quién lo impide” (Jonás Trueba, 2021).',
    },
  },
  projects: {
    bguardian: {
      title: 'BGuardian',
      logline:
        'Community-safety app: real-time reports, area map, photos, points and badges, plus in-app account and data deletion.',
      role: 'Design and development',
      note: 'Google Play · v0.1.1',
    },
    horizon: {
      title: 'Horizon',
      logline: 'Personal organiser with an AI assistant.',
      role: 'Development',
    },
    veoveo: {
      title: 'VeoVeo',
      logline: 'Real-time map of Madrid: metro, buses, BiciMAD bikes, traffic and cameras.',
      role: 'Development',
    },
    'top-word': {
      title: 'Top-Word',
      logline: 'A platform to collect and vote on words.',
      role: 'Development',
    },
    centinela: {
      title: 'Centinela',
      logline:
        'Final degree project: security incident management with an Android app and a web dashboard.',
      role: 'Final project',
    },
    iaexp: {
      title: 'IAExp',
      logline:
        'Local AI agent built on Ollama, with human approval in the loop before every action.',
      role: 'Development',
    },
    kimera: { title: 'Kimera', logline: 'Astrology-based dating app.', role: 'Development' },
    gold: {
      title: 'G[OLD]',
      logline: 'Social network inspired by Tuenti, reimagined with a Frutiger Aero look.',
      role: 'Development',
    },
    'elecciones-2026': {
      title: 'Elecciones 2026',
      logline:
        'Neutral information site about the Spanish general election, with an affinity quiz.',
      role: 'Development',
    },
    frutigerchat: {
      title: 'FrutigerChat',
      logline: 'MSN-style desktop messenger with its own database and TCP sockets.',
      role: 'Development',
    },
    nextcode: { title: 'NextCode', logline: 'Lightweight desktop IDE.', role: 'Development' },
    miprimerjuego: { title: 'MiPrimerJuego', logline: '2D roguelite.', role: 'Development' },
    zombiefortress: {
      title: 'ZombieFortress',
      logline: 'Online multiplayer game.',
      role: 'Development',
    },
    'robot-esp32': {
      title: 'Combat robot',
      logline: 'ESP32-based robot driven with a DualSense controller.',
      role: 'Hardware and firmware',
    },
    'quien-lo-impide': {
      title: 'Quién lo impide',
      logline: 'Film by Jonás Trueba about a group of young people in Madrid.',
      role: 'Supporting actor',
      note: 'Goya Award for Best Documentary',
    },
    'los-ilusos-films': {
      title: 'Los Ilusos Films',
      logline: "Jonás Trueba's film production company.",
      role: 'Production assistant',
    },
    'sonido-cfgs': {
      title: 'Sound for Audiovisual and Live Shows',
      logline: 'Live sound, studio recording, post-production and electroacoustics.',
      role: 'Higher technician',
    },
  },
  timeline: {
    euroformac: {
      title: 'Cross-platform & Web Application Development (DAM + DAW)',
      detail: 'Second year in progress. First year passed with a 9/10 average.',
    },
    gdpymes: {
      title: 'Interactive Products and Serious Games with Unity for SMEs',
      detail: 'GDPYMES programme, funded by Next Generation EU. 150+ hours.',
    },
    godman: { title: 'Godman Enterprises' },
    'los-ilusos': { title: 'Production assistant', detail: "Jonás Trueba's production company." },
    'factoria-f5': {
      title: 'Full stack web development bootcamp',
      detail:
        'Frontend, backend, databases, REST APIs, version control and web application security.',
    },
    sonido: { title: 'Higher Technician in Sound for Audiovisual and Live Shows' },
    ifcd0210: { title: 'IFCD0210 · Web application development (level 3 certificate)' },
    'quien-lo-impide': {
      title: 'Supporting role in “Quién lo impide”',
      detail: 'Goya Award for Best Documentary.',
    },
    utad: { title: 'Studies at U-tad' },
    'cine-en-curso': {
      title: 'Film workshop with Jonás Trueba',
      detail: '“Cine en Curso” programme.',
    },
    bachillerato: {
      title: 'Arts Baccalaureate',
      detail: 'Including photography and graphic design workshops.',
    },
  },
  stackGroups: {
    mobile: 'Mobile',
    web: 'Web',
    backend: 'Backend & cloud',
    security: 'Security',
    games: 'Games',
    ai: 'AI',
    java: 'Java',
    audiovisual: 'Audiovisual & design',
  },
  stackItems: {
    'Seguridad en aplicaciones web': 'Web application security',
    'Detección de amenazas': 'Threat detection',
    Concurrencia: 'Concurrency',
    'Sonido directo': 'Live sound',
    'Grabación en estudio': 'Studio recording',
    'Postproducción de sonido': 'Sound post-production',
    Producción: 'Production',
  },
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'B2' },
    { name: 'German', level: 'A1' },
  ],
  cv: {
    summary:
      'Full stack developer and cybersecurity student in Madrid. Mobile (Flutter, React Native) and web (React, TypeScript) apps with Firebase and Supabase. One app live on Google Play. Background in film and sound.',
  },
}

export default en
