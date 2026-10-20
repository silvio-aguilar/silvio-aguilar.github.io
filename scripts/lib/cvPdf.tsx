import { Document, Link, Page, StyleSheet, Text, View, renderToFile } from '@react-pdf/renderer'

interface Item {
  id: string
  org: string
  start?: string
  end?: string
  current?: boolean
  text?: { title: string; detail?: string }
}

export interface CvPdfInput {
  lang: string
  labels: Record<
    'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'languages',
    string
  >
  now: string
  headline: string
  summary: string
  experience: Item[]
  education: Item[]
  projects: { slug: string; stack: string[]; text?: { title: string; logline: string } }[]
  skills: { label: string; items: string[] }[]
  languages: { name: string; level: string }[]
  links: { label: string; url: string }[]
}

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 9.5, fontFamily: 'Helvetica', color: '#16150f', lineHeight: 1.35 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' },
  headline: { fontSize: 11, marginTop: 2 },
  meta: { color: '#5d5a50', marginTop: 4 },
  links: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, gap: 8 },
  link: { color: '#8a5f00', textDecoration: 'none' },
  h2: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#8a5f00',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 14,
    marginBottom: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#d9d4c7',
    paddingTop: 6,
  },
  row: { flexDirection: 'row', marginBottom: 4 },
  when: { width: 90, color: '#5d5a50' },
  body: { flex: 1 },
  bold: { fontFamily: 'Helvetica-Bold' },
  muted: { color: '#5d5a50' },
})

const part = (v?: string) => (v ? v.split('-').reverse().join('/') : '')
const period = (i: Item, now: string) => {
  const a = part(i.start)
  const b = i.current ? now : part(i.end)
  return a && b ? `${a} – ${b}` : a || b
}

function Entries({ items, now }: { items: Item[]; now: string }) {
  return (
    <>
      {items.map((i) => (
        <View key={i.id} style={s.row} wrap={false}>
          <Text style={s.when}>{period(i, now)}</Text>
          <View style={s.body}>
            <Text>
              <Text style={s.bold}>{i.text?.title}</Text>
              {i.org !== i.text?.title ? ` — ${i.org}` : ''}
            </Text>
            {i.text?.detail ? <Text style={s.muted}>{i.text.detail}</Text> : null}
          </View>
        </View>
      ))}
    </>
  )
}

export async function writeCvPdf(file: string, d: CvPdfInput) {
  const doc = (
    <Document
      title={`CV · Silvio Aguilar (@kurzerhand)`}
      author="Silvio Aguilar"
      subject={d.headline}
      keywords="Silvio Aguilar, kurzerhand, Flutter, React Native, React, TypeScript, ciberseguridad"
      creator="Silvio Aguilar"
      producer="Silvio Aguilar"
      language={d.lang}
    >
      <Page size="A4" style={s.page}>
        <Text style={s.name}>Silvio Aguilar</Text>
        <Text style={s.headline}>{d.headline}</Text>
        <Text style={s.meta}>@kurzerhand · Madrid · «We hack to protect»</Text>
        <View style={s.links}>
          {d.links.map((l) => (
            <Link key={l.url} src={l.url} style={s.link}>
              {l.label}
            </Link>
          ))}
        </View>

        <Text style={s.h2}>{d.labels.summary}</Text>
        <Text>{d.summary}</Text>

        <Text style={s.h2}>{d.labels.experience}</Text>
        <Entries items={d.experience} now={d.now} />

        <Text style={s.h2}>{d.labels.education}</Text>
        <Entries items={d.education} now={d.now} />

        <Text style={s.h2}>{d.labels.projects}</Text>
        {d.projects.map((p) => (
          <View key={p.slug} style={{ marginBottom: 3 }} wrap={false}>
            <Text>
              <Text style={s.bold}>{p.text?.title}</Text>
              {p.stack.length ? <Text style={s.muted}> · {p.stack.join(', ')}</Text> : null}
            </Text>
            <Text style={s.muted}>{p.text?.logline}</Text>
          </View>
        ))}

        <Text style={s.h2}>{d.labels.skills}</Text>
        {d.skills.map((g) => (
          <Text key={g.label} style={{ marginBottom: 2 }}>
            <Text style={s.bold}>{g.label}: </Text>
            {g.items.join(', ')}
          </Text>
        ))}

        <Text style={s.h2}>{d.labels.languages}</Text>
        <Text>{d.languages.map((l) => `${l.name}: ${l.level}`).join(' · ')}</Text>
      </Page>
    </Document>
  )
  await renderToFile(doc, file)
}
