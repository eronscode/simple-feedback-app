import { AnswerTypeE } from 'common/enums'

export type UserT = {
  avatarUrl: string
  id: string
  name: string
}

export type QuestionT = {
  id: string
  type: AnswerTypeE
  required: boolean
  label: string
  options?: {
    label: string
    value: number
  }[]
}

export type QuestionAnswerT = {
  question: QuestionT
  answer: string | number | null
}

export type FeedBackT = {
  id: string
  from: UserT
  to: UserT
  questionAnswers: QuestionAnswerT[]
}
