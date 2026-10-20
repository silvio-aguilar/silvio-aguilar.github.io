import type { LocalizedContent } from '../types'

/** German translation: pending review by a native speaker. */
const de: LocalizedContent = {
  headline: 'Softwareentwicklung · Cybersicherheit',
  bio: [
    'Ich bin Silvio Aguilar (@kurzerhand), Full-Stack-Entwickler und Student der Cybersicherheit in Madrid. Ich entwickle mobile Apps und Webanwendungen von Anfang bis Ende: Meine App für Bürgersicherheit, BGuardian, ist bei Google Play veröffentlicht.',
    'Ich studiere plattformübergreifende und Webanwendungsentwicklung (DAM + DAW) bei Euroformac und übe Sicherheit in meinem eigenen Kali-Linux-Labor. Mein Motto: „We hack to protect“.',
    'Vor dem Programmieren habe ich in Film und Ton gearbeitet: Ausbildung zum Tontechniker, Produktionsassistent bei Los Ilusos Films und Nebenrolle in „Quién lo impide“ von Jonás Trueba. Daher kommen mein Blick fürs Detail und das audiovisuelle Profil.',
  ],
  profiles: {
    dev: {
      label: 'Mobile Entwicklung',
      tagline: 'Mobile Apps und Web, von der Idee bis zum Store',
      summary:
        'Flutter und React Native für Mobile, React und TypeScript fürs Web, dahinter Firebase und Supabase. Eine App bei Google Play und mehrere eigene Produkte.',
    },
    security: {
      label: 'Cybersicherheit',
      tagline: 'We hack to protect',
      summary:
        'Eigenes Kali-Linux-Labor, Ausbildung in Webanwendungssicherheit und Projekte rund um Vorfallmanagement und Datenschutz.',
    },
    audiovisual: {
      label: 'Audiovisuell',
      tagline: 'Film, Ton und Produktion',
      summary:
        'Tontechniker, Produktionsassistent bei Los Ilusos Films und Nebendarsteller in „Quién lo impide“ (Jonás Trueba, 2021).',
    },
  },
  projects: {
    bguardian: {
      title: 'BGuardian',
      logline:
        'App für Bürgersicherheit: Echtzeitmeldungen, Gebietskarte, Fotos, Punkte und Abzeichen sowie Konto- und Datenlöschung in der App.',
      role: 'Design und Entwicklung',
      note: 'Google Play · v0.1.1',
    },
    horizon: { title: 'Horizon', logline: 'Persönlicher Organizer mit KI-Assistent.', role: 'Entwicklung' },
    veoveo: {
      title: 'VeoVeo',
      logline: 'Echtzeitkarte von Madrid: U-Bahn, Bus, BiciMAD, Verkehr und Kameras.',
      role: 'Entwicklung',
    },
    'top-word': {
      title: 'Top-Word',
      logline: 'Plattform zum Sammeln und Bewerten von Wörtern.',
      role: 'Entwicklung',
    },
    centinela: {
      title: 'Centinela',
      logline: 'Abschlussprojekt: Verwaltung von Sicherheitsvorfällen mit Android-App und Web-Dashboard.',
      role: 'Abschlussprojekt',
    },
    iaexp: {
      title: 'IAExp',
      logline: 'Lokaler KI-Agent mit Ollama und menschlicher Freigabe vor jeder Aktion.',
      role: 'Entwicklung',
    },
    kimera: { title: 'Kimera', logline: 'Dating-App mit Astrologie.', role: 'Entwicklung' },
    gold: {
      title: 'G[OLD]',
      logline: 'Soziales Netzwerk nach dem Vorbild von Tuenti, im Frutiger-Aero-Stil.',
      role: 'Entwicklung',
    },
    'elecciones-2026': {
      title: 'Elecciones 2026',
      logline: 'Neutrale Informationsseite zur spanischen Parlamentswahl mit Affinitätstest.',
      role: 'Entwicklung',
    },
    frutigerchat: {
      title: 'FrutigerChat',
      logline: 'Desktop-Messenger im MSN-Stil mit eigener Datenbank und TCP-Sockets.',
      role: 'Entwicklung',
    },
    nextcode: { title: 'NextCode', logline: 'Schlanke Desktop-IDE.', role: 'Entwicklung' },
    miprimerjuego: { title: 'MiPrimerJuego', logline: '2D-Roguelite.', role: 'Entwicklung' },
    zombiefortress: { title: 'ZombieFortress', logline: 'Online-Multiplayer-Spiel.', role: 'Entwicklung' },
    'robot-esp32': {
      title: 'Kampfroboter',
      logline: 'Roboter mit ESP32, gesteuert über einen DualSense-Controller.',
      role: 'Hardware und Firmware',
    },
    'quien-lo-impide': {
      title: 'Quién lo impide',
      logline: 'Film von Jonás Trueba über eine Gruppe junger Menschen in Madrid.',
      role: 'Nebendarsteller',
      note: 'Goya für den besten Dokumentarfilm',
    },
    'los-ilusos-films': {
      title: 'Los Ilusos Films',
      logline: 'Filmproduktionsfirma von Jonás Trueba.',
      role: 'Produktionsassistent',
    },
    'sonido-cfgs': {
      title: 'Ton für Audiovisuelle Medien und Veranstaltungen',
      logline: 'Live-Ton, Studioaufnahme, Postproduktion und Elektroakustik.',
      role: 'Staatlich geprüfter Techniker',
    },
  },
  timeline: {
    euroformac: {
      title: 'Plattformübergreifende und Webanwendungsentwicklung (DAM + DAW)',
      detail: 'Zweites Jahr laufend. Erstes Jahr mit Notendurchschnitt 9/10 bestanden.',
    },
    gdpymes: {
      title: 'Interaktive Produkte und Serious Games mit Unity für KMU',
      detail: 'Programm GDPYMES, gefördert durch Next Generation EU. Über 150 Stunden.',
    },
    godman: { title: 'Godman Enterprises' },
    'los-ilusos': { title: 'Produktionsassistent', detail: 'Produktionsfirma von Jonás Trueba.' },
    'factoria-f5': {
      title: 'Full-Stack-Webentwicklung (Bootcamp)',
      detail: 'Frontend, Backend, Datenbanken, REST-APIs, Versionskontrolle und Webanwendungssicherheit.',
    },
    sonido: { title: 'Techniker für Ton in Audiovisuellen Medien und Veranstaltungen' },
    ifcd0210: { title: 'IFCD0210 · Entwicklung von Webanwendungen (Stufe 3)' },
    'quien-lo-impide': {
      title: 'Nebenrolle in „Quién lo impide“',
      detail: 'Goya für den besten Dokumentarfilm.',
    },
    utad: { title: 'Studium an der U-tad' },
    'cine-en-curso': { title: 'Filmworkshop mit Jonás Trueba', detail: 'Programm „Cine en Curso“.' },
    bachillerato: { title: 'Abitur mit Schwerpunkt Kunst', detail: 'Mit Workshops in Fotografie und Grafikdesign.' },
  },
  stackGroups: {
    mobile: 'Mobile',
    web: 'Web',
    backend: 'Backend & Cloud',
    security: 'Sicherheit',
    games: 'Spiele',
    ai: 'KI',
    java: 'Java',
    audiovisual: 'Audiovisuell & Design',
  },
  stackItems: {
    'Seguridad en aplicaciones web': 'Webanwendungssicherheit',
    'Detección de amenazas': 'Bedrohungserkennung',
    Concurrencia: 'Nebenläufigkeit',
    'Sonido directo': 'Live-Ton',
    'Grabación en estudio': 'Studioaufnahme',
    'Postproducción de sonido': 'Ton-Postproduktion',
    Producción: 'Produktion',
  },
  languages: [
    { name: 'Spanisch', level: 'Muttersprache' },
    { name: 'Englisch', level: 'B2' },
    { name: 'Deutsch', level: 'A1' },
  ],
  cv: {
    summary:
      'Full-Stack-Entwickler und Student der Cybersicherheit in Madrid. Mobile Apps (Flutter, React Native) und Web (React, TypeScript) mit Firebase und Supabase. Eine App bei Google Play. Hintergrund in Film und Ton.',
  },
}

export default de
