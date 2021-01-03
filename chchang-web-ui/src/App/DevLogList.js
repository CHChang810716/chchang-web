import styles from './DevLogList.module.scss'
import GeneralList from './GeneralList.js'
import {useState} from '@chchang810716/react-sss'
const DevLogList = ({lListBtnBinder, focusIndexBinder, articleRefs, ...props}) => {
  const focusIndex = useState(focusIndexBinder)
  const lListBtn = useState(lListBtnBinder)
  return GeneralList(props, styles, (meta, i, length) => 
    <div key={i} 
      className={focusIndex.has(i) ? 
        styles.FocusedItem : 
        styles.Item}
      onClick={() => {
        const ref = articleRefs.get(i)
        if(ref) {
          lListBtnBinder.set(false)
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