import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'
import styles from './styles.module.scss'

interface IRotation {
  rotation: IGlyph['frames'][0]['properties']['rotation']
}

const Rotation = ({ rotation }: IRotation) => {
  console.info(rotation, 'rotation')

  const clamp = Math.max(0, Math.min(360, Number(rotation)))
  const percent = (clamp / 360) * 100

  console.info(percent)

  return (
    <div className={styles['rotation']}>
      <div className={styles['rotation--grid']}></div>
      


      <div className={styles['rotation--progress--pie']}>
        <div
          className={styles['rotation--progress--pie--bg']}
          data-pie={percent <= 50 ? 'right' : 'left'}
          style={{
            transform: percent <= 50 ? `rotate(calc(${(100 - (50 - percent)) / 100} * 360deg * -1))` : `rotate(calc(${(100 - percent) / 100} * 360deg))`
          }}
        ></div>
      </div>

      <div className={styles['rotation--glyph']} style={{ transform: `rotate(${rotation}deg) translate3d(-50%, -50%, 0px)`}}></div>
    </div>
  )
}

Rotation.displayName = 'Glyph.Form.Rotation'
export default Rotation