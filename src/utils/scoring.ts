export type Option = { id: string; text: string; correct?: boolean }
export type Question = {
  id: string
  stem: string            
  options: Option[]
  points?: number
  explanation?: string      
  kLevel?: string
  syllabus?: string
  tags?: string[]
}

export function score(
answers: Record<string, string>,
bank: Question[]
): number {
return bank.reduce((acc, q) => {
const chosen = answers[q.id]
const correct = q.options.find(o => o.correct)?.id
return acc + (chosen === correct ? (q.points ?? 1) : 0)
}, 0)
}