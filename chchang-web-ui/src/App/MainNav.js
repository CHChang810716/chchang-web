import styles from './MainNav.module.scss'
import React from 'react'
import {useState} from '@chchang810716/react-sss'
import {pad} from './screenDecl'
import {useMediaQuery} from 'react-responsive'
import {FiMenu} from 'react-icons/fi'

const MainNav = ({iterBinder, itemsBinder, lListBtnBinder}) => {
  const isPad = useMediaQuery(pad)
  const iter = useState(iterBinder, 'MainNav');
  const items = useState(itemsBinder, 'MainNav');
  const lListBtn = useState(lListBtnBinder, 'MainNav');
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
                onClick={() => lListBtnBinder.set(!lListBtn)}
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
                  iterBinder.set(i)
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