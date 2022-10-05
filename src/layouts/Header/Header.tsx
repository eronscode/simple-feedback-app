import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import Routes from 'common/routes'
import { FeedbackContext } from 'context/FeedbackProvider'
import { DispatchThemeContext, ThemeContext } from 'context/ThemeProvider'
import { UserContext } from 'context/UserProvider'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  const feedbacks = React.useContext(FeedbackContext)
  const users = React.useContext(UserContext)
  const theme = React.useContext(ThemeContext)
  const dispatchTheme = React.useContext(DispatchThemeContext)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }
  const givenFeedbacksCount = React.useMemo(
    () =>
      feedbacks
        ? feedbacks.filter((feedback) => feedback.from.id === currentUser?.id)
            .length
        : 0,
    [currentUser?.id, feedbacks],
  )

  const usersWithoutFeedbackCount = React.useMemo(
    () =>
      users
        ? users.filter((user) => {
            const feedback = feedbacks?.find(
              (feedback) =>
                feedback.from.id === currentUser?.id &&
                feedback.to.id === user.id,
            )
            return !feedback && user.id !== currentUser?.id
          }).length
        : [],
    [currentUser?.id, feedbacks, users],
  )

  return (
    <nav aria-label="Main Menu" className={styles.header}>
      <h1>Honesto</h1>
      <NavLink
        to={Routes.ShareFeedBack}
        activeClassName={styles.active}
        className={styles.navlink}
      >
        Share Feedback
        {!!usersWithoutFeedbackCount && (
          <span className={styles.badge}>{usersWithoutFeedbackCount}</span>
        )}
      </NavLink>
      <NavLink
        to={Routes.MyFeedBack}
        activeClassName={styles.active}
        className={styles.navlink}
      >
        My Feedback
        {!!givenFeedbacksCount && (
          <span className={styles.badge}>{givenFeedbacksCount}</span>
        )}
      </NavLink>
      <NavLink
        to={Routes.TeamFeedBack}
        activeClassName={styles.active}
        className={styles.navlink}
      >
        Team Feedback
      </NavLink>
      <span className={styles.spacer} />
      <button
        className={styles.themeToggle}
        onClick={() => dispatchTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' ? '🌘' : '🌙'}
      </button>

      <div className={styles.userWidget}>
        {currentUser && (
          <img src={currentUser.avatarUrl} alt={currentUser.name} />
        )}
        <div className={styles.userWidgetText}>
          <span>{currentUser && `${currentUser.name}`}</span>
          <NavLink exact to="/" onClick={handleLogout}>
            LOGOUT
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Header
