import type { ProfileId } from '../../content/types'

/** Static, lightweight artwork shown before (or instead of) the 3D scene. */
export function PosterFallback({ profile }: { profile: ProfileId }) {
  return (
    <svg viewBox="0 0 200 300" className="h-full w-full text-accent" aria-hidden="true">
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#glow)" />
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
        {profile === 'dev' && (
          <>
            <rect x="62" y="70" width="76" height="150" rx="14" />
            <rect x="72" y="88" width="56" height="104" rx="3" strokeOpacity="0.5" />
            <circle cx="100" cy="206" r="5" />
            <path d="M86 128l-10 10 10 10M114 128l10 10-10 10M104 122l-8 32" strokeOpacity="0.8" />
          </>
        )}
        {profile === 'security' && (
          <>
            <path d="M100 62l52 20v46c0 38-24 66-52 82-28-16-52-44-52-82V82z" />
            <path d="M78 140l16 16 30-34" strokeWidth="4" />
            <path d="M100 82v-20M48 104H30M170 104h-18" strokeOpacity="0.4" />
          </>
        )}
        {profile === 'audiovisual' && (
          <>
            <circle cx="100" cy="140" r="58" />
            <circle cx="100" cy="140" r="9" />
            {[0, 72, 144, 216, 288].map((a) => {
              const r = (a * Math.PI) / 180
              return (
                <circle
                  key={a}
                  cx={100 + Math.cos(r) * 32}
                  cy={140 + Math.sin(r) * 32}
                  r="12"
                  strokeOpacity="0.8"
                />
              )
            })}
            <path d="M40 228h120M52 228v22M148 228v22" strokeOpacity="0.5" />
          </>
        )}
      </g>
    </svg>
  )
}
