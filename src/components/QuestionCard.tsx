import type { Option } from '../utils/scoring'


type Props = {
qid: string
stem: string
options: Option[]
chosen?: string
onChoose: (optId: string) => void
}


export default function QuestionCard({ qid, stem, options, chosen, onChoose }: Props) {
return (
<fieldset className="card" aria-labelledby={`q-${qid}`}>
<legend id={`q-${qid}`}>{stem}</legend>
{options.map(o => (
<label key={o.id} className={`opt ${chosen===o.id ? 'opt--sel' : ''}`}>
<input
type="radio"
name={qid}
checked={chosen === o.id}
onChange={() => onChoose(o.id)}
/>
<span>{o.id}) {o.text}</span>
</label>
))}
</fieldset>
)
}