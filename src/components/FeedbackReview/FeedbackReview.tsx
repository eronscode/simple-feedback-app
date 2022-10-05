import React from 'react'
import classnames from 'classnames'
import styles from './feedbackReview.module.css'
import { FeedBackT, QuestionT } from 'context/types'
import { parseOptionValue } from 'common/methods'
import ScaleRating from 'components/ScaleRating'
import { AnswerTypeE } from 'common/enums'

type Props = {
  onSelect: (value: FeedBackT) => void
  feedbacks: FeedBackT[]
  selectedFeedback: FeedBackT | null
  variant: 'from' | 'to'
}

const FeedbackReview = (props: Props) => {
  const { feedbacks = [], onSelect, selectedFeedback, variant = 'to' } = props

  return (
    <div
      role="region"
      aria-label="Review Feedbacks"
      className={styles.feedbackContainer}
    >
      <ul className={styles.users}>
        <li>
          <h2>Feedback given</h2>
        </li>
        {feedbacks &&
          feedbacks.length > 0 &&
          feedbacks.map((feedback) => (
            <li
              className={classnames({
                [styles.active]:
                  selectedFeedback &&
                  selectedFeedback[variant].id === feedback[variant].id,
              })}
              onClick={() => onSelect(feedback)}
            >
              <img
                src={feedback[variant].avatarUrl}
                alt={feedback[variant].name}
              />
              <p>{feedback[variant].name} </p>
            </li>
          ))}
      </ul>
      {selectedFeedback && renderView(selectedFeedback, variant)}
    </div>
  )
}

function renderView(feedback: FeedBackT, variant: 'from' | 'to') {
  if (!feedback) return null

  return (
    <ul className={styles.feedback}>
      <li>
        <h2>
          {feedback[variant].name ? `${feedback[variant].name}'s Feedback` : ''}
        </h2>
      </li>
      {feedback.questionAnswers &&
        feedback.questionAnswers.length !== 0 &&
        feedback.questionAnswers.map((questionAnswer) => (
          <li key={questionAnswer.question.id}>
            <div className={styles.questionWrapper}>
              <p>{questionAnswer.question.label}</p>
            </div>
            <div className={styles.answerWrapper}>
              {!questionAnswer.answer ? (
                <span className={styles.skipped}>Skipped</span>
              ) : (
                renderAnswerType(
                  questionAnswer.question.type,
                  questionAnswer.question,
                  questionAnswer.answer,
                )
              )}
            </div>
          </li>
        ))}
    </ul>
  )
}

function renderAnswerType(
  type: string,
  question: QuestionT,
  answer: string | number | null,
) {
  switch (type) {
    case AnswerTypeE.scale:
      return (
        answer && (
          <ScaleRating defaultValue={answer as number} size={30} readOnly />
        )
      )
    case AnswerTypeE.text:
      return answer && <p>{answer}</p>
    case AnswerTypeE.multipleChoice:
      return (
        <p>
          {question.options &&
            parseOptionValue(answer as number, question.options)}
        </p>
      )

    default:
      return <p>Invalid Answer</p>
  }
}

export default FeedbackReview
