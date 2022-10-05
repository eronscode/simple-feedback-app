import { useLocation } from 'react-router-dom'
import { AccountContext } from 'context/AccountProvider'
import { FeedbackContext } from 'context/FeedbackProvider'
import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './myFeedback.module.css'
import { FeedBackT } from 'context/types'
import FeedbackReview from 'components/FeedbackReview'
import NoFeedback from 'components/EmptyStateUI/NoFeedback'

const ReviewFeedback = () => {
  const location = useLocation()
  const currentUser = React.useContext(AccountContext)
  const feedbacks = React.useContext(FeedbackContext)
  const queryParam = new URLSearchParams(location.search)
  const userId = queryParam.get('userId')

  const [selectedFeedback, setSelectedFeedback] =
    React.useState<FeedBackT | null>(null)

  const givenFeedbacks = React.useMemo(
    () =>
      feedbacks
        ? feedbacks.filter((feedback) => feedback.from.id === currentUser?.id)
        : [],
    [currentUser?.id, feedbacks],
  )

  React.useEffect(() => {
    if (userId) {
      // set selected feedback when userID param exist
      const userFeedback = feedbacks
        ? feedbacks.find(
            (feedback) =>
              feedback.to.id === userId && feedback.from.id === currentUser?.id,
          )
        : []
      setSelectedFeedback(userFeedback as FeedBackT)
    } else {
      setSelectedFeedback(givenFeedbacks[0] || null)
    }
  }, [userId, givenFeedbacks, feedbacks, currentUser?.id])

  return (
    <MainLayout loggedIn>
      <div role="region" aria-label="My Feedback" className={styles.wrapper}>
        {givenFeedbacks && givenFeedbacks.length === 0 ? (
          <NoFeedback />
        ) : (
          <>
            <h1>My Feedback</h1>
            <FeedbackReview
              feedbacks={givenFeedbacks}
              onSelect={setSelectedFeedback}
              selectedFeedback={selectedFeedback}
              variant="to"
            />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default ReviewFeedback
