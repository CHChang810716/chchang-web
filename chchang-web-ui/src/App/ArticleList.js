import styles from './ArticleList.module.scss'
import GeneralList from './GeneralList.js'

const ArticleList = (props) => {
  return GeneralList(props, styles, (meta, i) => <div key={i} className={styles.Item}>
    <div>{meta.label}</div>
  </div>, 'ArticleList')
}

export default ArticleList