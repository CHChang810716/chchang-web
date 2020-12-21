import styles from './SiteTree.module.scss'
import React from 'react'
import makeid from '../makeid'

class SiteTree extends React.Component {
  state = {
    items: [
      {
        gid: makeid(8),
        label: 'about'
      },
      {
        gid: makeid(8),
        label: 'articles'
      },
      {
        gid: makeid(8),
        label: 'work log'
      }
    ],
    selectedIter: 0
  }
  onClickItem = (i) => {
    const { modelCtrl } = this.props
    this.setState({selectedIter: i})
  }
  render() {
    const {items, selectedIter} = this.state
    return (<div className={styles.SiteTree}> 
      <div></div>
      <div> {
        items.map((it, i) => (
          <div className={styles.Item} key={i}>
            {
              i === selectedIter ? 
                <div>&#8594;</div> : 
                <div></div>
            }
            <div>{it.label}</div>
          </div>)
        )
      } </div>
    </div>)
  }
}

export default SiteTree;