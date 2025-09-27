import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [syllabus, setSyllabus] = useState('3.2')
  const [count, setCount] = useState(10)
  const [minutes, setMinutes] = useState(15)
  const [seed, setSeed] = useState('demo')

  useEffect(() => {
    document.title = 'CT-TAE Simulados'
  }, [])

  const to = `/quiz?syllabus=${encodeURIComponent(syllabus)}&n=${count}&m=${minutes}&seed=${seed}`

  return (
    <div className="page">
      <h1>CT-TAE Simulados</h1>
      <div className="grid">
        <label>
          Capítulo (syllabus)
          <select value={syllabus} onChange={(e) => setSyllabus(e.target.value)}>
            <option value="3.2">3.2 — Projetar TAA</option>
            <option value="3.1">3.1 — Visão Geral TAA</option>
          </select>
        </label>
        <label>
          Questões
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          />
        </label>
        <label>
          Tempo (min)
          <input
            type="number"
            min={5}
            max={180}
            value={minutes}
            onChange={(e) => setMinutes(+e.target.value)}
          />
        </label>
        <label>
          Seed
          <input value={seed} onChange={(e) => setSeed(e.target.value)} />
        </label>
      </div>

      <Link className="btn" to={to}>
        Iniciar simulado
      </Link>
    </div>
  )
}
