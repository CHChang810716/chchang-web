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
      <div className={styles.ItemList}>
        {
          showLListBtn ? 
            <div className={lListBtnActive ? 
                styles.LListBtnActive : 
                styles.LListBtn
              }
              onClick={() => {
                setLListBtnActive(!lListBtnActive)
                onLListBtnActive(!lListBtnActive)
              }}
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
                  onSwitch(i)
                }}
              >
                {it}
              </div>
          ) 
        }
      </div>
    </div>
  )
}

export default MainNav