import screen1080 from './App-1080.module.scss'
import screen0 from './App-0.module.scss'
import ArticleView from './App/ArticleView'
import ModelCtrl from './ModelCtrl'
import MainNav from './App/MainNav'
import ArticleList from './App/ArticleList'
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import {useMediaQuery} from 'react-responsive'

screen1080.label = 1080
screen0.label = 0

const modelCtrl = new ModelCtrl();
const AppContent = ({viewTarget, modelCtrl}) => {
  console.log(viewTarget)
  switch (viewTarget) {
    case modelCtrl.article.label: 
      return <ArticleView 
        regIndexUpdate = {modelCtrl.article.onIndexUpdate}
        regFetched     = {modelCtrl.article.onFetched}
        fetch          = {modelCtrl.article.fetchMore}
        hasMore        = {modelCtrl.article.hasMore}
      />
    case modelCtrl.devlog.label:
      return <ArticleView 
        regIndexUpdate = {modelCtrl.devlog.onIndexUpdate}
        regFetched     = {modelCtrl.devlog.onFetched}
        fetch          = {modelCtrl.devlog.fetchMore}
        hasMore        = {modelCtrl.devlog.hasMore}
      />
    case modelCtrl.about.label:
    default:
      return <div></div>
  }
}
const AppLSidebar = ({viewTarget, modelCtrl, ...args}) => {
  console.log(modelCtrl)
  console.log(args)
  switch (viewTarget) {
    case modelCtrl.article.label: 
      return <ArticleList
        fetchList     ={modelCtrl.article.fetchIndex}
        regListUpdate ={modelCtrl.article.onIndexUpdate}
        regIterUpdate ={modelCtrl.article.onIterUpdate}
      />
    case modelCtrl.devlog.label:
      return <ArticleList
        fetchList     ={modelCtrl.devlog.fetchIndex}
        regListUpdate ={modelCtrl.devlog.onIndexUpdate}
        regIterUpdate ={modelCtrl.devlog.onIterUpdate}
      />
    case modelCtrl.about.label:
    default:
      return <div></div>
  }
}
const App = () => {
  const [viewTarget, setViewTarget] = useState(
    modelCtrl.defaultViewTarget()
  );
  const isPad = useMediaQuery({ query: `(max-width: 1080px)` });
  const styles = isPad ? screen0 : screen1080; 
  useEffect(()=>{
    modelCtrl.onSwitchView((i, vt)=>{
      console.log(vt)
      setViewTarget(vt)
    })
  }, [])
  const [showSideBar, setShowSideBar] = useState(!isPad)
  const app = useRef();
  return (
    <div ref={app} className={styles.App}>
      <div className={styles.Header}>
        <MainNav 
          items={modelCtrl.viewTargets()}
          defaultIter={modelCtrl.defaultViewTargeti()}
          onSwitch={modelCtrl.switchView}
          showLListBtn={isPad}
          onLListBtnActive={setShowSideBar}
        />
      </div>
      {
        showSideBar || !isPad ? <div className={styles.LSidebar} disabled={isPad}>
          <AppLSidebar 
            viewTarget={viewTarget}
            modelCtrl={modelCtrl}
          />
        </div> : null
      }
      <div className={styles.Content}> 
        <AppContent 
          viewTarget={viewTarget} 
          modelCtrl={modelCtrl} 
        />
      </div>
      {
        showSideBar || !isPad ? <div className={styles.RSidebar}>
        </div> : null
      }
      <div className={styles.Footer}>
      </div>
    </div>
  );
}

export default App;
