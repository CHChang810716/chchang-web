import {useState, useEffect} from 'react'

const GeneralList = ({fetchList, regListUpdate, regIterUpdate}, styles, Item) => {
  const [list, setList] = useState([])
  useEffect(()=>{
    regListUpdate(l=>setList(l))
  }, [regListUpdate, fetchList])
  return <div className={styles.List}>
    <div></div>
    <div className={styles.ListBody}>{
      list.map((meta, i) => Item(meta, i, list.length))
    }</div>
  </div>
}
export default GeneralList