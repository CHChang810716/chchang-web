import styles from './MainNav.module.scss'
import React, {useState, useEffect} from 'react'

const MainNav = ({
  items, defaultIter, onSwitch, 
  showLListBtn, onLListBtnActive
}) => {
  const [iter, setIter] = useState(defaultIter);
  const [lListBtnActive, setLListBtnActive] = useState(false);
  console.log(showLListBtn)
  return (
    <div className={styles.MainNav}> 
      <div className={showLListBtn ? styles.ItemListWithLLBtn : styles.ItemList}>
        {
          showLListBtn ? 
            <div className={styles.Item}>
              <div className={lListBtnActive ? 
                  styles.LListBtnActive : 
                  styles.LListBtn
                }
                onClick={() => {
                  setLListBtnActive(!lListBtnActive)
                  onLListBtnActive(!lListBtnActive)
                }}
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
                  onSwitch(i)
                }}
              >
                <div className={styles.ItemText}>
                  {it}

                </div>
              </div>
          ) 
        }
      </div>
    </div>
  )
}

export default MainNav