import styles from './styles.module.scss'
import type { ITabProps } from './interfaces'

const TabHead = ({ callback, isActive, items }: ITabProps) => {
  return (
    <div className={styles['tabs--list']} role="tablist">
      {Array.isArray(items) && items.map((_, index) => (
        <button
          className={styles['tabs--head']}
          data-active={isActive}
          onClick={() => typeof callback === 'function' && callback(index)}
          role="tab"
          aria-selected={isActive}
          id={`tab-${index}`}
          key={index}
          aria-controls={`panel-${index}`}
        >
          {_.label}
        </button>
      ))}
    </div>
  )
}

TabHead.displayName = 'Components.Glyph.Form.Frame.TabHead'
export default TabHead