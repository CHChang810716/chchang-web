import styles from './MainNav.module.scss'
import React from 'react'
import {useState} from '../puppet'
import {isPad} from './screenLevel'

const MainNav = ({iterBinder, itemsBinder, lListBtnBinder}) => {
  const [iter, setIter] = useState(iterBinder);
  const [items, setItems] = useState(itemsBinder);
  const [lListBtn, setlListBtn] = useState(lListBtnBinder);
  const showLListBtn = isPad()
  return (
    <div className={styles.MainNav}> 
      <div className={styles.ItemList}>
        {
          showLListBtn ? 
            <div className={lListBtn ? 
                styles.LListBtnActive : 
                styles.LListBtn
              }
              onClick={() => setlListBtn(!lListBtn)}
            ></div> : 
            null
        }
        {
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
                }}
              >
                {it.label}
              </div>
          ) 
        }
      </div>
    </div>
  )
}

export default MainNav