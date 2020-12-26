import styles from './MainNav.module.scss'
import React from 'react'
import {useState} from '../puppet'
import {pad} from './screenDecl'
import {useMediaQuery} from 'react-responsive'
import {FiMenu} from 'react-icons/fi'

const MainNav = ({iterBinder, itemsBinder, lListBtnBinder}) => {
  const isPad = useMediaQuery(pad)
  const [iter, setIter] = useState(iterBinder, 'MainNav');
  const [items, setItems] = useState(itemsBinder, 'MainNav');
  const [lListBtn, setlListBtn] = useState(lListBtnBinder, 'MainNav');
  return (
    <div className={styles.MainNav}> 
      <div className={isPad ? styles.ItemListWithLLBtn : styles.ItemList}>
        {
          isPad ?
            <div className={lListBtn?
              styles.SelectedItem :
              styles.Item
            }>
              <FiMenu className={styles.LListBtn} 
                size={"100%"}
                onClick={() => setlListBtn(!lListBtn)}
              />
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