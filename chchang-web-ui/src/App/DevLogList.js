import styles from './DevLogList.module.scss'
import GeneralList from './GeneralList.js'
import {useState} from '../puppet'
const DevLogList = ({focusIndexBinder, ...props}) => {
  const [focusIndex] = useState(focusIndexBinder)
  console.log(focusIndex)
  return GeneralList(props, styles, (meta, i, length) => 
    <div key={i} className={focusIndex.has(i) ? styles.FocusedItem : styles.Item}>
      <div>Day {length - i}</div>
      <div>{meta.label.split('-').slice(1).join(' ')}</div>
    </div>, 
    'DevLogList'
  )
}

export default DevLogList