import styles from './ArticleList.module.scss'
import {useState, useEffect} from 'react'
const ArticleList = ({fetchList, regListUpdate, regIterUpdate}) => {
  const [list, setList] = useState([])
  useEffect(()=>{
    regListUpdate(l=>setList(l))
    // fetchList()
  }, [regListUpdate, fetchList])
  return <div className={styles.ArticleList}>
    <div></div>
    <div className={styles.ArticleListBody}>{
      list.map((meta, i) => <div key={i} className={styles.Item}>
        <div>{meta.label}</div>
      </div>)
    }</div>
  </div>
}

export default ArticleList