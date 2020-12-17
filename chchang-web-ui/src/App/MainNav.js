import styles from './MainNav.module.scss'
import React, {useState, useEffect} from 'react'

const MainNav = ({items, defaultIter, onSwitch}) => {
  const [iter, setIter] = useState(defaultIter);
  return (<div className={styles.MainNav}> {
    items.map( 
      (it, i) => 
        <div 
          key={i} 
          className={(
            i === iter ? 
              styles.SelectedItem :
              styles.Item
          )}
          onClick={() => {
            setIter(i)
            onSwitch(i)
          }}
        >
          {it}
        </div>
    ) 
  } </div>)
}

export default MainNav