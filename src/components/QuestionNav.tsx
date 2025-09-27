type NavItem = { id: string; answered: boolean }


type Props = {
items: NavItem[]
current: string | null
onJump: (id: string) => void
}


export default function QuestionNav({ items, current, onJump }: Props) {
return (
<div className="qnav" role="navigation" aria-label="Navegador de questões">
{items.map((it, idx) => (
<button
key={it.id}
className={`qnav__item ${it.answered ? 'ok' : 'pending'} ${current===it.id ? 'cur' : ''}`}
onClick={() => onJump(it.id)}
title={`Questão ${idx+1}`}
>{idx+1}</button>
))}
</div>
)
}