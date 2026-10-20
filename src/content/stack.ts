import type { StackGroup } from './types'

export const stackGroups: StackGroup[] = [
  {
    id: 'mobile',
    profiles: ['dev'],
    items: [
      { name: 'Flutter / Dart' },
      { name: 'Riverpod' },
      { name: 'React Native' },
      { name: 'Expo' },
      { name: 'Kotlin / Android', learning: true },
    ],
  },
  {
    id: 'web',
    profiles: ['dev'],
    items: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
      { name: 'Node.js' },
      { name: 'Laravel / PHP' },
      { name: 'WordPress' },
    ],
  },
  {
    id: 'backend',
    profiles: ['dev'],
    items: [
      { name: 'Firebase' },
      { name: 'Supabase' },
      { name: 'Python' },
      { name: 'MySQL / MariaDB' },
      { name: 'MongoDB' },
      { name: 'Docker' },
      { name: 'AWS', learning: true },
    ],
  },
  {
    id: 'security',
    profiles: ['security'],
    items: [
      { name: 'Kali Linux' },
      { name: 'Seguridad en aplicaciones web' },
      { name: 'Detección de amenazas' },
    ],
  },
  { id: 'games', profiles: ['dev'], items: [{ name: 'Unity' }, { name: 'C#' }, { name: 'Photon' }] },
  {
    id: 'ai',
    profiles: ['dev', 'security'],
    items: [{ name: 'Gemini API' }, { name: 'Claude API' }, { name: 'Ollama' }],
  },
  {
    id: 'java',
    profiles: ['dev'],
    items: [{ name: 'Java' }, { name: 'Swing' }, { name: 'Concurrencia' }],
  },
  {
    id: 'audiovisual',
    profiles: ['audiovisual'],
    items: [
      { name: 'Sonido directo' },
      { name: 'Grabación en estudio' },
      { name: 'Postproducción de sonido' },
      { name: 'Producción' },
      { name: 'Photoshop' },
      { name: 'Figma' },
    ],
  },
]

/** Dev-only reminder rendered in the security stack group. */
export const securityTodo = 'Añadir certificaciones y CTFs'
