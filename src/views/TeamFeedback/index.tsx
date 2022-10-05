import * as React from 'react'
import { AccountContext } from 'context/AccountProvider'
import { FeedbackContext } from 'context/FeedbackProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './teamFeedback.module.css'
import { FeedBackT } from 'context/types'
import FeedbackReview from 'components/FeedbackReview'
import NoFeedback from 'components/EmptyStateUI/NoFeedback'

const TeamFeedback = () => {
  const currentUser = React.useContext(AccountContext)
  const feedbacks = React.useContext(FeedbackContext)

  const [selectedFeedback, setSelectedFeedback] =
    React.useState<FeedBackT | null>(null)

  const receivedFeedbacks = React.useMemo(
    () =>
      feedbacks
        ? feedbacks.filter((feedback) => feedback.to.id === currentUser?.id)
        : [],
    [currentUser?.id, feedbacks],
  )

  React.useEffect(() => {
    setSelectedFeedback(receivedFeedbacks[0] || null)
  }, [receivedFeedbacks])

  return (
    <MainLayout loggedIn>
      <div role="region" aria-label="Team Feedback" className={styles.wrapper}>
        {receivedFeedbacks && receivedFeedbacks.length === 0 ? (
          <NoFeedback />
        ) : (
          <>
            <h1>Team Feedback</h1>
            <FeedbackReview
              feedbacks={receivedFeedbacks}
              onSelect={setSelectedFeedback}
              selectedFeedback={selectedFeedback}
              variant="from"
            />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default TeamFeedback
