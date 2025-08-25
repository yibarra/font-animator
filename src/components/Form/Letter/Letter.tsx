import { useFontStore } from '../../../contexts/Font/store'

import { default as Main } from './'
import styles from './styles.module.scss'

const Letter = () => {
  const { font } = useFontStore()

  if (!font) {
    return null
  }

  return (
    <Main.Root font={font}>
      <div className={styles['form--letter']}>
        <Main.Letters font={font} />
      </div>
    </Main.Root>
  )
}

Letter.displayName = 'Form.Letter'
export default Letter
