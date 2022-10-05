import MainLayout from 'layouts/MainLayout'
import styles from './notFound.module.css'

const NotFound = () => {
  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Page not found</h1>
        <p>Sorry, the URL you have used may be incorrect.</p>
        <p>Check the spelling or navigate using the menu above.</p>
      </div>
    </MainLayout>
  )
}

export default NotFound
