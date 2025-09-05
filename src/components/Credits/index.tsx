import styles from './styles.module.scss'

import eu from '../../assets/eu.png'

const Credits = () => {
  return (
    <div className={styles['credits']}>
      <a href="https://github.com/yibarra" target="_blank">
        <p>
          &copy; 2025 Julian Ibarra
        </p>
      </a>

      <div className={styles['credits--me']}>
        <img src={eu} alt="eu" />
      </div>
    </div>
  )
}

Credits.displayName = 'Component.Credits'
export default Credits
