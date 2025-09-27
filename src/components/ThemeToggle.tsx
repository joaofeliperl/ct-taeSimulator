import { useEffect, useState } from 'react'


export default function ThemeToggle() {
const [dark, setDark] = useState<boolean>(() => {
const saved = localStorage.getItem('cttae/theme')
if (saved) return saved === 'dark'
return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
})


useEffect(() => {
document.documentElement.dataset.theme = dark ? 'dark' : 'light'
localStorage.setItem('cttae/theme', dark ? 'dark' : 'light')
}, [dark])


return (
<button className="btn small" onClick={() => setDark(d => !d)} aria-label="Alternar tema">
{dark ? '🌙 Dark' : '☀️ Light'}
</button>
)
}