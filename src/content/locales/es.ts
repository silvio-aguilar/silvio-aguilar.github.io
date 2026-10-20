import type { LocalizedContent } from '../types'

const es: LocalizedContent = {
  headline: 'Desarrollo de Software · Ciberseguridad',
  bio: [
    'Soy Silvio Aguilar (@kurzerhand), desarrollador full stack y estudiante de ciberseguridad en Madrid. Construyo aplicaciones móviles y web de principio a fin: mi app de seguridad ciudadana, BGuardian, está publicada en Google Play.',
    'Estudio DAM y DAW en Euroformac y practico seguridad en un laboratorio propio con Kali Linux. Mi lema resume cómo lo entiendo: «We hack to protect».',
    'Antes de programar trabajé en cine y sonido. Soy técnico superior en sonido, fui ayudante de producción en Los Ilusos Films y actor de reparto en «Quién lo impide», de Jonás Trueba. De ahí vienen mi atención al detalle y el perfil audiovisual de esta ficha.',
  ],
  profiles: {
    dev: {
      label: 'Desarrollo móvil',
      tagline: 'Apps móviles y web, de la idea a la tienda',
      summary:
        'Flutter y React Native en móvil, React y TypeScript en web, Firebase y Supabase detrás. Una app publicada en Google Play y varios productos propios.',
    },
    security: {
      label: 'Ciberseguridad',
      tagline: 'We hack to protect',
      summary:
        'Laboratorio propio en Kali Linux, formación en seguridad de aplicaciones web y proyectos centrados en la gestión de incidencias y la privacidad del usuario.',
    },
    audiovisual: {
      label: 'Audiovisual',
      tagline: 'Cine, sonido y producción',
      summary:
        'Técnico superior en sonido, ayudante de producción en Los Ilusos Films y actor de reparto en «Quién lo impide» (Jonás Trueba, 2021).',
    },
  },
  projects: {
    bguardian: {
      title: 'BGuardian',
      logline:
        'App de seguridad ciudadana: reportes en tiempo real, mapa de zonas, fotos, puntos e insignias, y borrado de cuenta y datos desde la propia app.',
      role: 'Diseño y desarrollo',
      note: 'Google Play · v0.1.1',
    },
    horizon: {
      title: 'Horizon',
      logline: 'Gestor personal con asistente de IA.',
      role: 'Desarrollo',
    },
    veoveo: {
      title: 'VeoVeo',
      logline: 'Mapa en tiempo real de Madrid: metro, bus, BiciMAD, tráfico y cámaras.',
      role: 'Desarrollo',
    },
    'top-word': {
      title: 'Top-Word',
      logline: 'Plataforma para coleccionar y votar palabras.',
      role: 'Desarrollo',
    },
    centinela: {
      title: 'Centinela',
      logline:
        'Proyecto de fin de grado: gestión de incidencias de seguridad con app Android y panel web.',
      role: 'TFG',
    },
    iaexp: {
      title: 'IAExp',
      logline:
        'Agente de IA local con Ollama y aprobación humana en el bucle antes de cada acción.',
      role: 'Desarrollo',
    },
    kimera: { title: 'Kimera', logline: 'App de citas con astrología.', role: 'Desarrollo' },
    gold: {
      title: 'G[OLD]',
      logline: 'Red social inspirada en Tuenti, modernizada con estética Frutiger Aero.',
      role: 'Desarrollo',
    },
    'elecciones-2026': {
      title: 'Elecciones 2026',
      logline:
        'Web informativa y neutral sobre las elecciones generales del 29-N, con test de afinidad.',
      role: 'Desarrollo',
    },
    frutigerchat: {
      title: 'FrutigerChat',
      logline: 'Mensajería de escritorio al estilo MSN con base de datos propia y sockets TCP.',
      role: 'Desarrollo',
    },
    nextcode: { title: 'NextCode', logline: 'IDE ligero de escritorio.', role: 'Desarrollo' },
    miprimerjuego: { title: 'MiPrimerJuego', logline: 'Roguelite 2D.', role: 'Desarrollo' },
    zombiefortress: {
      title: 'ZombieFortress',
      logline: 'Juego multijugador en línea.',
      role: 'Desarrollo',
    },
    'robot-esp32': {
      title: 'Robot de combate',
      logline: 'Robot con ESP32 controlado con un mando DualSense.',
      role: 'Hardware y firmware',
    },
    'quien-lo-impide': {
      title: 'Quién lo impide',
      logline: 'Película de Jonás Trueba sobre un grupo de jóvenes madrileños.',
      role: 'Actor de reparto',
      note: 'Goya a la mejor película documental',
    },
    'los-ilusos-films': {
      title: 'Los Ilusos Films',
      logline: 'Productora de cine de Jonás Trueba.',
      role: 'Ayudante de producción',
    },
    'sonido-cfgs': {
      title: 'Sonido para audiovisuales y espectáculos',
      logline: 'Sonido directo, grabación en estudio, postproducción y electroacústica.',
      role: 'Técnico superior',
    },
  },
  timeline: {
    euroformac: {
      title: 'DAM + DAW (Desarrollo de Aplicaciones Multiplataforma y Web)',
      detail: 'Cursando 2.º. Primer curso aprobado con una media de 9.',
    },
    gdpymes: {
      title: 'Desarrollo de Productos Interactivos y Serious Games con Unity para PYMES',
      detail: 'Programa GDPYMES, financiado por Next Generation EU. Más de 150 h.',
    },
    godman: { title: 'Godman Enterprises' },
    'los-ilusos': { title: 'Ayudante de producción', detail: 'Productora de Jonás Trueba.' },
    'factoria-f5': {
      title: 'Bootcamp de programación web full stack',
      detail:
        'Frontend, backend, bases de datos, API REST, control de versiones y seguridad de aplicaciones web.',
    },
    sonido: { title: 'Técnico Superior en Sonido para Audiovisuales y Espectáculos' },
    ifcd0210: {
      title: 'IFCD0210 · Desarrollo de aplicaciones con tecnologías web (nivel 3)',
    },
    'quien-lo-impide': {
      title: 'Actor de reparto en «Quién lo impide»',
      detail: 'Goya a la mejor película documental.',
    },
    utad: { title: 'Estudios en U-tad' },
    'cine-en-curso': {
      title: 'Taller de cine con Jonás Trueba',
      detail: 'Programa «Cine en Curso».',
    },
    bachillerato: {
      title: 'Bachillerato de Artes',
      detail: 'Con talleres de fotografía y diseño gráfico.',
    },
  },
  stackGroups: {
    mobile: 'Móvil',
    web: 'Web',
    backend: 'Backend y nube',
    security: 'Seguridad',
    games: 'Videojuegos',
    ai: 'IA',
    java: 'Java',
    audiovisual: 'Audiovisual y diseño',
  },
  stackItems: {},
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'B2' },
    { name: 'Alemán', level: 'A1' },
  ],
  cv: {
    summary:
      'Desarrollador full stack y estudiante de ciberseguridad en Madrid. Apps móviles (Flutter, React Native) y web (React, TypeScript), con Firebase y Supabase. App publicada en Google Play. Trayectoria previa en cine y sonido.',
  },
}

export default es
