import { UseFontContext } from '../../../contexts/Font/Font'
import styles from '../styles.module.scss'

const Loader = () => {
  const { handleFileChange } = UseFontContext()

  return (
    <div className={styles['form--loader']}>
      <label htmlFor="file-upload">
        <span className="material-symbols-outlined">
          upload_file
        </span>
      </label>
      
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
