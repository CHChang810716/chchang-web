import styles from './App.module.scss'
import ArticleView from './App/ArticleView'
import ModelCtrl from './ModelCtrl'
import MainNav from './App/MainNav'
import ArticleList from './App/ArticleList'
import React, {useState, useEffect} from 'react'

const modelCtrl = new ModelCtrl();
const AppContent = ({viewTarget, modelCtrl}) => {
  switch (viewTarget) {
    case 'Articles': 
      return <ArticleView 
        regOnFetched ={modelCtrl.article.onFetched}
        fetch        ={modelCtrl.article.fetchMore}
        hasMore      ={modelCtrl.article.hasMore}
      />
    case 'Dev log':
    case 'About':
    default:
      return <div></div>
  }
}
const AppLSidebar = ({viewTarget, modelCtrl}) => {
  console.log(modelCtrl)
  switch (viewTarget) {
    case 'Articles': 
      return <ArticleList
        getList={modelCtrl.article.getIndex}
        regOnIterUpdate={modelCtrl.article.onIterUpdate}
      />
    case 'Dev log':
    case 'About':
    default:
      return <div></div>
  }
}
const App = () => {
  const [viewTarget, setViewTarget] = useState(
    modelCtrl.defaultViewTarget()
  );
  useEffect(()=>{
    modelCtrl.onSwitchView((i, vt)=>{
      console.log(vt)
      setViewTarget(vt)
    })
  }, [])
  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <MainNav 
          items={modelCtrl.viewTargets()}
          defaultIter={modelCtrl.defaultViewTargeti()}
          onSwitch={modelCtrl.switchView}
        />
      </div>
      <div className={styles.LSidebar}>
        <AppLSidebar 
          viewTarget={viewTarget}
          modelCtrl={modelCtrl}
        />
      </div>
      <div className={styles.Content}> 
        <AppContent 
          viewTarget={viewTarget} 
          modelCtrl={modelCtrl} 
        />
      </div>
      <div className={styles.RSidebar}>
      </div>
      <div className={styles.Footer}>
      </div>
    </div>
  );
}

export default App;
