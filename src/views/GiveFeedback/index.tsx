import * as React from 'react'
import { UserContext } from 'context/UserProvider'
import MainLayout from 'layouts/MainLayout'
import User from 'components/User'
import Button from 'components/Button'
import styles from './giveFeedback.module.css'
import { AccountContext } from 'context/AccountProvider'
import { FeedbackContext } from 'context/FeedbackProvider'
import { useHistory } from 'react-router-dom'
import Routes from 'common/routes'
import { FeedBackT } from 'context/types'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const currentUser = React.useContext(AccountContext)
  const feedbacks = React.useContext(FeedbackContext)

  const notCurrentUsers = users?.filter((user) => user.id !== currentUser?.id)
  const feedbacksByCurrentUser = feedbacks
    ? feedbacks?.filter((feedback) => feedback.from.id === currentUser?.id)
    : []

  return (
    <MainLayout loggedIn>
      <div role="region" aria-label="Share Feedback" className={styles.wrapper}>
        <h1>Share Feedback</h1>
        {notCurrentUsers && notCurrentUsers.length > 0 && (
          <ul className={styles.users}>
            {notCurrentUsers.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                <GiveFeedBackAction
                  feedbacks={feedbacksByCurrentUser}
                  userId={user.id}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

function GiveFeedBackAction({
  feedbacks,
  userId,
}: {
  feedbacks: FeedBackT[]
  userId: string
}) {
  const history = useHistory()
  const isFilled = feedbacks.find((feedback) => feedback.to.id === userId)

  return isFilled ? (
    <Button
      secondary
      onClick={() => {
        history.push(Routes.ViewSubmissions(userId))
      }}
    >
      View Submissions
    </Button>
  ) : (
    <Button
      onClick={() => {
        history.push(Routes.SubmitFeedBack(userId))
      }}
    >
      Fill out
    </Button>
  )
}

export default GiveFeedback
