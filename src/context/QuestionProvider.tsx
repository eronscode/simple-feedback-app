import * as React from 'react'
import { QuestionT } from './types'

type DispatchQuestionContextT = any

export const DispatchQuestionContext =
  React.createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = React.createContext<QuestionT[] | null>(null)

type SetQuestionsT = {
  action: 'set'
  payload: Array<QuestionT>
}

const reducer = (
  state: QuestionT[] | null,
  update: SetQuestionsT,
): QuestionT[] | null => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>
        {children}
      </QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
