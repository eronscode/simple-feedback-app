import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { AccountContext } from 'context/AccountProvider'
import { FeedbackContext } from 'context/FeedbackProvider'
import { UserContext } from 'context/UserProvider'
import MainLayout from 'layouts/MainLayout'
import styles from './feedbackSuccess.module.css'
import User from 'components/User'
import Button from 'components/Button'
import Routes from 'common/routes'

const FeedbackSuccess = () => {
  const currentUser = React.useContext(AccountContext)
  const feedbacks = React.useContext(FeedbackContext)
  const users = React.useContext(UserContext)
  const history = useHistory()

  // shows first 3 users without feedback
  const usersWithoutFeedback = users
    ? users
        .filter((user) => {
          const feedback = feedbacks?.find(
            (feedback) =>
              feedback.from.id === currentUser?.id &&
              feedback.to.id === user.id,
          )
          return !feedback && user.id !== currentUser?.id
        })
        .slice(0, 3)
    : []

  return (
    <MainLayout loggedIn>
      <section className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Thank you for sharing your feedback!</h1>
          <span aria-label="Continue to give feedback to other team members">
            Continue to give feedback to other team members.{' '}
          </span>
        </div>
        <ul className={styles.users}>
          {usersWithoutFeedback &&
            usersWithoutFeedback.length !== 0 &&
            usersWithoutFeedback.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                <Button
                  onClick={() => {
                    history.push(Routes.SubmitFeedBack(user.id))
                  }}
                >
                  Fill out
                </Button>
              </li>
            ))}
        </ul>
      </section>
    </MainLayout>
  )
}

export default FeedbackSuccess
