import styles from './styles.module.scss'

const Credits = () => {
  return (
    <div className={styles['credits']}>
      <p>
        &copy; 2025 Julian Ibarra
      </p>
      <p>
        <a href="https://github.com/yibarra" target="_blank">yibarra</a>
      </p>
    </div>
  )
}

Credits.displayName = 'Component.Credits'
export default Credits
