import { create } from 'zustand'


export type AnswerMap = Record<string, string>


type State = {
seed: string
durationSec: number
startedAt?: number
answers: AnswerMap
}


type Actions = {
start: (seed: string, durationSec: number) => void
answer: (qid: string, optionId: string) => void
reset: () => void
}


export const useQuizStore = create<State & Actions>((set) => ({
seed: 'default',
durationSec: 1800,
answers: {},
start: (seed, durationSec) => set({ seed, durationSec, startedAt: Date.now(), answers: {} }),
answer: (qid, optionId) => set((s) => ({ answers: { ...s.answers, [qid]: optionId } })),
reset: () => set({ seed: 'default', durationSec: 1800, startedAt: undefined, answers: {} })
}))