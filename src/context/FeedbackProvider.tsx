import * as React from 'react'
import { FeedBackT } from './types'

type DispatchFeedBackContextT = any

export const DispatchFeedbackContext =
  React.createContext<DispatchFeedBackContextT | null>(null)
export const FeedbackContext = React.createContext<FeedBackT[] | null>(null)

type SetFeedBackT = {
  action: 'add'
  payload: FeedBackT
}

const reducer = (
  state: FeedBackT[] | null,
  update: SetFeedBackT,
): FeedBackT[] | null => {
  if (update.action === 'add') {
    return state ? [...state, update.payload] : [update.payload]
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbackContext.Provider value={state}>
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
