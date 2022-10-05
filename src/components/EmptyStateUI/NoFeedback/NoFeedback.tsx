import styles from './noFeedback.module.css'

const NoFeedback = () => {
  return (
    <div className={styles.wrapper}>
      <h1>No feedback to display 🔮</h1>
      <p>
        There is no feedback to display at this time – check back in a bit!{' '}
      </p>
    </div>
  )
}

export default NoFeedback
