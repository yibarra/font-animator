import type { ITabs } from './interfaces'
import styles from './styles.module.scss'

const Tabs = ({ children }: ITabs) => {
  return (
    <div className={styles['tabs']}>
      {children}
    </div>
  )
}

Tabs.displayName = 'Components.Glyph.Form.Frame.Tabs'
export default Tabs