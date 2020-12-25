import {useEffect} from 'react'
import {useState} from '../puppet'

const GeneralList = ({listBinder}, styles, Item, debug_context) => {
  const [list, setList] = useState(listBinder, debug_context)
  return <div className={styles.List}>
    <div></div>
    <div className={styles.ListBody}>{
      list.map((meta, i) => Item(meta, i, list.length))
    }</div>
  </div>
}
export default GeneralList