import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { generateUniqueId, getEntityById } from 'common/methods'
import Routes from 'common/routes'
import Button from 'components/Button'
import TextArea from 'components/Input/TextArea'
import MultiChoiceSelect from 'components/MultiChoiceSelect'
import ScaleRating from 'components/ScaleRating'
import { BackIcon } from 'components/SvgIcons'
import { AccountContext } from 'context/AccountProvider'
import {
  DispatchFeedbackContext,
  FeedbackContext,
} from 'context/FeedbackProvider'
import { QuestionContext } from 'context/QuestionProvider'
import { QuestionT, UserT } from 'context/types'
import { UserContext } from 'context/UserProvider'
import MainLayout from 'layouts/MainLayout'
import styles from './submitFeedback.module.css'
import { AnswerTypeE } from 'common/enums'

type FeedBackRouteT = {
  id: string
}

type AnswerT = string | number | null

const SubmitFeedback = () => {
  const questions = React.useContext(QuestionContext)
  const currentUser = React.useContext(AccountContext)
  const feedbackDispatch = React.useContext(DispatchFeedbackContext)
  const feedbacks = React.useContext(FeedbackContext)
  const users = React.useContext(UserContext)
  const { id } = useParams<FeedBackRouteT>()
  const history = useHistory()

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Array<AnswerT>>([])

  function goBack() {
    history.goBack()
  }

  function onValueChange(value: AnswerT) {
    const copyAnswers = [...answers]
    copyAnswers[currentQuestionIndex] = value
    setAnswers(copyAnswers)
  }

  function handleSubmit() {
    const payload = {
      id: generateUniqueId(),
      from: currentUser,
      to: selectedUser,
      questionAnswers: questions?.map((question, index) => {
        return {
          question: question,
          answer: answers[index] || null,
        }
      }),
    }
    feedbackDispatch({ action: 'add', payload })
    history.push(Routes.FeedbackSuccess)
  }

  const selectedUser = getEntityById(id, users)
  const selectedUserHaveFeedback =
    feedbacks &&
    feedbacks.find(
      (feedback) =>
        feedback.from.id === currentUser?.id &&
        feedback.to.id === selectedUser?.id,
    )
  // Prevent user with feedback from submitting
  if (selectedUserHaveFeedback) history.push(Routes.ShareFeedBack)

  // if userId from url doesn'd exist, redirect to not found
  // Alternatively, render specific component for Not found feedback
  if (!selectedUser) history.push(Routes.NotFound)

  return (
    <MainLayout loggedIn>
      <section className={styles.wrapper}>
        <button className={styles.back} onClick={goBack}>
          <span>
            <BackIcon />
          </span>
          Back
        </button>
        {questions && questions?.length !== 0 && (
          <>
            {renderHeader(questions[currentQuestionIndex].label, selectedUser)}
            <div className={styles.body}>
              <div className={styles.questionContainer}>
                {renderQuestionType(
                  currentQuestionIndex,
                  questions[currentQuestionIndex],
                  onValueChange,
                  answers,
                )}
              </div>
              {renderActions(
                currentQuestionIndex,
                questions[currentQuestionIndex],
                setCurrentQuestionIndex,
                questions.length,
                answers,
                onValueChange,
                handleSubmit,
              )}
              {renderProgressBar(currentQuestionIndex, questions.length)}
            </div>
          </>
        )}
      </section>
    </MainLayout>
  )
}

function renderHeader(label: string, selectedUser?: UserT | null) {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <h1>{label}</h1>
        {selectedUser && (
          <span aria-label={`share your feedback for ${selectedUser.name}`}>
            share your feedback for {selectedUser.name}
          </span>
        )}
      </div>
      {selectedUser && (
        <img
          className={styles.headerImage}
          src={selectedUser.avatarUrl}
          alt={selectedUser.name}
        />
      )}
    </div>
  )
}

function renderQuestionType(
  index: number,
  question: QuestionT,
  onValueChange: (value: string | number | null) => void,
  answers: AnswerT[],
) {
  switch (question.type) {
    case AnswerTypeE.multipleChoice:
      return (
        question.options && (
          <MultiChoiceSelect
            options={question.options}
            onValueChange={onValueChange}
            defaultValue={answers[index] as string}
          />
        )
      )
    case AnswerTypeE.scale:
      return (
        <section style={{ margin: '5rem 0 3rem 0' }}>
          <ScaleRating
            defaultValue={answers[index] as number}
            size={75}
            onValueChange={onValueChange}
          />
        </section>
      )
    case AnswerTypeE.text:
      return (
        <TextArea
          defaultValue={answers[index] as string}
          onValueChange={onValueChange}
        />
      )

    default:
      return <p>Invalid Question Type</p>
  }
}

function renderActions(
  index: number,
  currentQuestion: QuestionT,
  setIndex: (value: number) => void,
  totalQuestion: number,
  answers: AnswerT[],
  setAnswer: (value: AnswerT) => void,
  handleSubmit: () => void,
) {
  const questionIndex = index + 1
  const isPreviousDisabled = questionIndex === 1
  const isNextDisabled = !answers[index]
  const isLastQuestion = questionIndex === totalQuestion

  function handleNextQuestion() {
    isLastQuestion ? handleSubmit() : setIndex(index + 1)
  }

  function handlePreviousQuestion() {
    questionIndex !== 1 && setIndex(index - 1)
  }

  function skipQuestion() {
    setAnswer(null)
    isLastQuestion ? handleSubmit() : handleNextQuestion()
  }

  return (
    <section className={styles.questionActions}>
      <Button
        disabled={isPreviousDisabled}
        secondary
        onClick={handlePreviousQuestion}
      >
        Previous
      </Button>
      {!currentQuestion?.required && (
        <Button secondary onClick={skipQuestion}>
          Skip
        </Button>
      )}
      <Button disabled={isNextDisabled} onClick={handleNextQuestion}>
        {isLastQuestion ? 'Submit' : 'Next'}
      </Button>
    </section>
  )
}

function renderProgressBar(index: number, totalQuestion: number) {
  return (
    <section className={styles.questionProgessStatus}>
      <progress className={styles.bar} value={index + 1} max={totalQuestion} />
      <span aria-label="Questions Completed">Questions Completed</span>
      <span>
        {index + 1}/{totalQuestion}
      </span>
    </section>
  )
}

export default SubmitFeedback
