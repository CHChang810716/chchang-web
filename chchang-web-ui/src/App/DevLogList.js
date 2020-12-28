import styles from './DevLogList.module.scss'
import GeneralList from './GeneralList.js'
import {useState} from '../puppet'
const DevLogList = ({lListBtnBinder, focusIndexBinder, articleRefs, ...props}) => {
  const [focusIndex] = useState(focusIndexBinder)
  const [lListBtn, setlListBtn] = useState(lListBtnBinder)
  return GeneralList(props, styles, (meta, i, length) => 
    <div key={i} 
      className={focusIndex.has(i) ? 
        styles.FocusedItem : 
        styles.Item}
      onClick={() => {
        const ref = articleRefs.get(i)
        if(ref) {
          setlListBtn(false)
          ref.node.scrollIntoView(true)
        }
      }}
    >
      <div>Day {length - i}</div>
      <div>{meta.label.split('-').slice(1).join(' ')}</div>
    </div>, 
    'DevLogList'
  )
}

export default DevLogList