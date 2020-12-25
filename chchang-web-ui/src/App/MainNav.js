import styles from './MainNav.module.scss'
import React from 'react'
import {useState} from '../puppet'
import {pad} from './screenDecl'
import {useMediaQuery} from 'react-responsive'

const MainNav = ({iterBinder, itemsBinder, lListBtnBinder}) => {
  const isPad = useMediaQuery(pad)
  const [iter, setIter] = useState(iterBinder);
  const [items, setItems] = useState(itemsBinder);
  const [lListBtn, setlListBtn] = useState(lListBtnBinder);
  return (
    <div className={styles.MainNav}> 
      <div className={isPad ? styles.ItemListWithLLBtn : styles.ItemList}>
        {
          isPad ?
            <div className={styles.Item}>
              <div className={lListBtn ? 
                  styles.LListBtnActive : 
                  styles.LListBtn
                }
                onClick={() => setlListBtn(!lListBtn)}
              ></div> 
            </div> : 
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
                <div className={styles.ItemText}>
                  {it.label}
                </div>
              </div>
          ) 
        }
      </div>
    </div>
  )
}

export default MainNav