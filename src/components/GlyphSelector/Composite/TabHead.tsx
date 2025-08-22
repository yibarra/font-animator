import styles from './styles.module.scss'
import type { ITabProps } from './interfaces'

const TabHead = ({ callback, isActive, items }: ITabProps) => (
  <div className={styles['tabs--list']} role="tablist">
    {Array.isArray(items) && items.map((_, index) => (
      <button
        aria-controls={`panel-${index}`}
        className={styles['tabs--head']}
        data-active={isActive === index}
        id={`tab-${index}`}
        key={index}
        onClick={() => typeof callback === 'function' && callback(index)}
        role="tab"
      >
        {_.label}
      </button>
    ))}
  </div>
)

TabHead.displayName = 'Components.Glyph.Form.Frame.TabHead'
export default TabHead