import styles from './MainNav.module.scss'
import React from 'react'
import {useState} from '@chchang810716/react-sss'
import {pad} from './screenDecl'
import {useMediaQuery} from 'react-responsive'
import {FiMenu} from 'react-icons/fi'
import Modal from 'react-modal'

const MainNav = ({iterBinder, itemsBinder, lListBtnBinder}) => {
  const isPad = useMediaQuery(pad)
  const iter = useState(iterBinder, 'MainNav');
  const items = useState(itemsBinder, 'MainNav');
  const lListBtn = useState(lListBtnBinder, 'MainNav');
  const [regMdl, setRegMdl] = React.useState(false);
  const [logMdl, setLogMdl] = React.useState(false);
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
      <div className={styles.ProfileWrapper}>
        <div className={styles.Profile}>
          <div className={styles.Login} onClick={e => {
            
          }}>
            L
          </div>
          <div className={styles.Register} onClick={e => setRegMdl(true)}>
            R
          </div>
        </div>
      </div>
      <Modal
        isOpen={regMdl}
        contentLabel="register"
      >
        <h2>Register</h2>
        <button onClick={() => setRegMdl(false)}>x</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  )
}

export default MainNav