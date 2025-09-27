import { useEffect, useState } from 'react'
import type { Question } from '../utils/scoring'

export default function Review() {
  const raw = sessionStorage.getItem('lastResult')
  const [bank, setBank] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const [syllabus, setSyllabus] = useState('')

  useEffect(() => {
    if (!raw) return
    const r = JSON.parse(raw)
    setAnswers(r.answers)
    setSyllabus(r.syllabus)
    import(`../data/tae-${r.syllabus}.json`).then(mod => setBank(mod.default))
  }, [raw])

  if (!raw) return <div className="page">Sem dados</div>

  return (
    <div className="page">
      <h1>Revisão — Capítulo {syllabus}</h1>
      {bank.filter(q => answers[q.id]).map(q => {
        const correct = q.options.find(o => o.correct)?.id
        const picked = answers[q.id]
        const ok = picked === correct
        return (
          <details key={q.id} className={`rev ${ok ? 'ok' : 'bad'}`}>
            <summary>{q.stem} — {ok ? '✔️' : '❌'} (sua: {picked}, correta: {correct})</summary>
            <ul>
              {q.options.map(o => (
                <li key={o.id}>
                  {o.id}) {o.text} {o.correct ? '✅' : ''}
                </li>
              ))}
            </ul>
            {q.explanation && (<p className="explain">💡 {q.explanation}</p>)}
          </details>
        )
      })}
      <a className="btn" href="/">Voltar</a>
    </div>
  )
}
