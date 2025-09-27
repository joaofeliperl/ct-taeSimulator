import { useEffect, useState } from 'react'


type Props = { seconds: number; onExpire?: () => void }
export default function Timer({ seconds, onExpire }: Props) {
const [left, setLeft] = useState(seconds)
useEffect(() => {
setLeft(seconds)
const id = setInterval(() => {
setLeft((s) => {
if (s <= 1) { clearInterval(id); onExpire?.(); return 0 };
return s - 1
})
}, 1000)
return () => clearInterval(id)
}, [seconds, onExpire])


const mm = String(Math.floor(left / 60)).padStart(2, '0')
const ss = String(left % 60).padStart(2, '0')
return <div aria-live="polite" className="timer">⏱️ {mm}:{ss}</div>
}