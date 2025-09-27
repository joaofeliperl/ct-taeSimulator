import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { shuffle } from '../utils/shuffle'
import { score } from '../utils/scoring'
import type { Question } from '../utils/scoring'
import { BANKS } from '../data'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'
import ProgressBar from '../components/ProgressBar'
import QuestionNav from '../components/QuestionNav'
import { useQuizStore } from '../store/useQuizStore'

export default function Quiz() {
  const [params] = useSearchParams()
  const nav = useNavigate()

  const syllabus = params.get('syllabus') ?? '3.2'
  const n = Number(params.get('n') ?? 10)
  const m = Number(params.get('m') ?? 15)
  const seed = params.get('seed') ?? 'demo'

  const { answers, answer, start } = useQuizStore()
  const [bank, setBank] = useState<Question[]>([])
  const [current, setCurrent] = useState<string | null>(null)
  const orderRef = useRef<string[]>([])

  // carrega banco e inicializa a sessão (import estático)
  useEffect(() => {
    start(seed, m * 60)
    const all = (BANKS[syllabus] as Question[]) ?? []
    const chosen = shuffle(all, seed).slice(0, n).map(q => ({
      ...q,
      options: shuffle(q.options, seed + q.id),
    }))
    setBank(chosen)
    orderRef.current = chosen.map(q => q.id)
    setCurrent(chosen[0]?.id ?? null)
  }, [seed, syllabus, n, m, start])

  const done = useMemo(() => bank.length > 0 && bank.every(q => answers[q.id]), [bank, answers])
  const answeredCount = Object.keys(answers).filter(k => answers[k]).length

  function finish() {
    const s = score(answers, bank)
    const payload = {
      s,
      total: bank.reduce((a, b) => a + (b.points ?? 1), 0),
      seed, syllabus, n, m, at: Date.now(), answers,
    }
    sessionStorage.setItem('lastResult', JSON.stringify(payload))
    nav('/results')
  }

  function jumpTo(id: string) {
    setCurrent(id)
    const el = document.getElementById(`q-${id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // atalhos de teclado
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!bank.length || !current) return
      const idx = orderRef.current.indexOf(current)

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = orderRef.current[Math.min(idx + 1, orderRef.current.length - 1)]
        if (next) jumpTo(next)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = orderRef.current[Math.max(idx - 1, 0)]
        if (prev) jumpTo(prev)
      } else if (/^[1-9]$/.test(e.key)) {
        const q = bank.find(q => q.id === current)
        const opt = q?.options[Number(e.key) - 1]
        if (opt) answer(current, opt.id)
      } else if (/^[a-dA-D]$/.test(e.key)) {
        const map: Record<string, number> = { a:0, b:1, c:2, d:3, A:0, B:1, C:2, D:3 }
        const q = bank.find(q => q.id === current)
        const opt = q?.options[map[e.key]]
        if (opt) answer(current, opt.id)
      } else if (e.key === 'Enter' && done) {
        finish()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [bank, current, answer, done])

  if (!bank.length) return <div className="page">Carregando…</div>

  return (
    <div className="page">
      <div className="quiz__top sticky">
        <Timer seconds={m * 60} onExpire={finish} />
        <ProgressBar value={answeredCount} max={bank.length} />
        <QuestionNav
          items={bank.map(q => ({ id: q.id, answered: Boolean(answers[q.id]) }))}
          current={current}
          onJump={jumpTo}
        />
      </div>

      {bank.map((q, i) => (
        <section key={q.id} id={`q-${q.id}`} className="qwrap">
          <QuestionCard
            qid={q.id}
            stem={`${i + 1}. ${q.stem}`}
            options={q.options}
            chosen={answers[q.id]}
            onChoose={(opt) => { answer(q.id, opt); setCurrent(q.id) }}
          />
        </section>
      ))}

      <div className="footer sticky">
        <button className="btn" disabled={!done} onClick={finish}>Finalizar</button>
      </div>
    </div>
  )
}
