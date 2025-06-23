import { UseFontContext } from '../../../contexts/Font/Font'

const Loader = () => {
  const { handleFileChange } = UseFontContext()

  return (
    <div>
      <label className="material-symbols-outlined">upload</label>
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
