import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'
import Progress from '../../../Progress'
import styles from './styles.module.scss'

interface IRotation {
  rotation: IGlyph['frames'][0]['properties']['rotation']
}

const Rotation = ({ rotation }: IRotation) => {
  const clamp = Math.max(0, Math.min(360, Number(rotation)))
  const percent = (clamp / 360) * 100

  return (
    <div className={styles['rotation']}>
      <div className={styles['rotation--grid']}></div>
      
      <div className={styles['rotation--progress']}>
        <Progress.Bar strokeWidth={2} size={38} percentage={percent} />
        <Progress.Pie size={30}  percentage={percent} />
      </div>

      <div className={styles['rotation--glyph']} style={{ transform: `rotate(${rotation}deg) translate3d(-50%, -50%, 0px)`}}></div>
    </div>
  )
}

Rotation.displayName = 'Glyph.Form.Rotation'
export default Rotation