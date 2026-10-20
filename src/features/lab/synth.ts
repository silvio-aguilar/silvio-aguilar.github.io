export type Voice = 'kick' | 'snare' | 'hat' | 'clap' | 'tom' | 'rim' | 'cowbell' | 'noise'

let ctx: AudioContext | null = null

function audio(): AudioContext {
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function noiseBuffer(ac: AudioContext, seconds: number) {
  const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * seconds), ac.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return buf
}

function envelope(ac: AudioContext, peak: number, decay: number, at = ac.currentTime) {
  const g = ac.createGain()
  g.gain.setValueAtTime(peak, at)
  g.gain.exponentialRampToValueAtTime(0.001, at + decay)
  g.connect(ac.destination)
  return g
}

function tone(type: OscillatorType, from: number, to: number, decay: number, peak = 0.8) {
  const ac = audio()
  const o = ac.createOscillator()
  o.type = type
  o.frequency.setValueAtTime(from, ac.currentTime)
  o.frequency.exponentialRampToValueAtTime(to, ac.currentTime + decay)
  o.connect(envelope(ac, peak, decay))
  o.start()
  o.stop(ac.currentTime + decay)
}

function noise(filter: BiquadFilterType, freq: number, decay: number, peak = 0.6, at?: number) {
  const ac = audio()
  const src = ac.createBufferSource()
  src.buffer = noiseBuffer(ac, decay)
  const f = ac.createBiquadFilter()
  f.type = filter
  f.frequency.value = freq
  src.connect(f).connect(envelope(ac, peak, decay, at))
  src.start(at)
}

export function play(voice: Voice) {
  switch (voice) {
    case 'kick':
      return tone('sine', 150, 40, 0.45, 1)
    case 'snare':
      tone('triangle', 220, 120, 0.12, 0.4)
      return noise('bandpass', 1800, 0.2)
    case 'hat':
      return noise('highpass', 7000, 0.06, 0.35)
    case 'clap': {
      const t0 = audio().currentTime
      for (const dt of [0, 0.012, 0.024]) noise('bandpass', 1200, 0.12, 0.5, t0 + dt)
      return
    }
    case 'tom':
      return tone('sine', 220, 90, 0.3, 0.8)
    case 'rim':
      return tone('square', 800, 600, 0.03, 0.25)
    case 'cowbell':
      tone('square', 540, 540, 0.25, 0.15)
      return tone('square', 800, 800, 0.25, 0.15)
    case 'noise':
      return noise('lowpass', 900, 0.6, 0.4)
  }
}
