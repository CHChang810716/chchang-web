import styles from './ArticleList.module.scss'
const ArticleList = ({getList, regOnIterUpdate}) => {
  const list = getList()
  return <div className={styles.ArticleList}>
    <div></div>
    <div className={styles.ArticleListBody}>{
      list.map(meta => <div className={styles.Item}>
        <div></div>
        <div>{meta.label}</div>
      </div>)
    }</div>
  </div>
}

export default ArticleList