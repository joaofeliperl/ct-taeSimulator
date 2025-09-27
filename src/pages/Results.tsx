export default function Results() {
const raw = sessionStorage.getItem('lastResult')
if (!raw) return <div className="page">Sem resultado</div>
const r = JSON.parse(raw) as { s:number; total:number; seed:string; syllabus:string; n:number; m:number; at:number }
const pct = Math.round((r.s / r.total) * 100)
return (
<div className="page">
<h1>Resultados</h1>
<p>Score: <b>{r.s}</b> / {r.total} ({pct}%)</p>
<p>Seed: <code>{r.seed}</code> • Capítulo: {r.syllabus} • Questões: {r.n} • Tempo: {r.m} min</p>
<a className="btn" href="/review">Revisar questões</a>
<a className="btn btn--ghost" href="/">Novo simulado</a>
</div>
)
}