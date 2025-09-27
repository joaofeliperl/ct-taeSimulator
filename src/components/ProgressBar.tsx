type Props = { value: number; max: number }
export default function ProgressBar({ value, max }: Props) {
const pct = Math.round((value / max) * 100)
return (
<div className="pb">
<div className="pb__track"><div className="pb__fill" style={{ width: `${pct}%` }} /></div>
<span className="pb__label">{pct}%</span>
</div>
)
}