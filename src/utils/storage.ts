const NS = 'cttae/sim'


export function save<T>(key: string, value: T) {
localStorage.setItem(`${NS}/${key}`, JSON.stringify(value))
}


export function load<T>(key: string, fallback: T): T {
const raw = localStorage.getItem(`${NS}/${key}`)
return raw ? (JSON.parse(raw) as T) : fallback
}