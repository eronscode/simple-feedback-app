import * as React from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

type DispatchThemeContextT = any

export const DispatchThemeContext =
  React.createContext<DispatchThemeContextT | null>(null)
export const ThemeContext = React.createContext<string | null>(null)

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [storedTheme, setStoredTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light',
  )
  const [state, dispatch] = React.useState<string | null>(null)

  React.useEffect(() => {
    storedTheme ? dispatch(storedTheme) : dispatch('light')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleTheme = (value: string) => {
    dispatch(value)
    setStoredTheme(value)
  }

  return (
    <DispatchThemeContext.Provider value={toggleTheme}>
      <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
    </DispatchThemeContext.Provider>
  )
}

export default UIProvider
