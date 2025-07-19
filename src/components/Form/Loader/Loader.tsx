import { UseFontContext } from '../../../contexts/Font/Font'
import styles from '../styles.module.scss'

const Loader = () => {
  const { handleFileChange } = UseFontContext()

  return (
    <div className={styles['form--loader']}>
      <label className="material-symbols-outlined" htmlFor="file-upload">file_open</label>
      
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
      />
    </div>
  )
}

Loader.displayName = 'Components.Form.Loader'
export default Loader
