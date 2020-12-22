import styles from './DevLogList.module.scss'
import GeneralList from './GeneralList.js'

const DevLogList = (props) => {
  return GeneralList(props, styles, (meta, i, length) => <div key={i} className={styles.Item}>
    <div>Day {length - i}</div>
    <div>{meta.label.split('-').slice(1).join(' ')}</div>
  </div>)
}

export default DevLogList