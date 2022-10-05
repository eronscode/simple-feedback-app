import * as React from 'react'
import classnames from 'classnames'
import Content from '../Content'
import Footer from '../Footer'
import Header from '../Header'
import styles from './mainLayout.module.css'
import { ThemeContext } from 'context/ThemeProvider'

type Props = {
  children: React.ReactNode
  loggedIn?: boolean
  className?: string
}

const MainLayout = ({ children, loggedIn, className }: Props) => {
  const theme = React.useContext(ThemeContext)

  return (
    <div
      className={classnames(styles.mainLayout, className, {
        [styles.loggedIn]: loggedIn,
        dark: theme === 'dark',
      })}
    >
      {loggedIn && <Header />}
      <Content>{children}</Content>
      <Footer />
    </div>
  )
}

export default MainLayout
