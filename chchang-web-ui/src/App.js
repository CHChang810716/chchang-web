import screen1080 from './App-1080.module.scss'
import screen0 from './App-0.module.scss'
import ArticleView from './App/ArticleView'
import ModelCtrl from './ModelCtrl'
import MainNav from './App/MainNav'
import ArticleList from './App/ArticleList'
import React, {useEffect} from 'react'
import {useState} from './puppet'
import DevLogList from './App/DevLogList'
import {pad} from './App/screenDecl'
import {useMediaQuery} from 'react-responsive'

screen1080.label = 1080
screen0.label = 0

const modelCtrl = new ModelCtrl();
const AppContent = ({}) => {
  const [feature] = useState(modelCtrl.currFeature, 'AppContent')
  switch (feature) {
    // case modelCtrl.article: 
    //   return <ArticleView 
    //     articlesBinder   = {modelCtrl.article.articles}
    //     focusIndexBinder = {modelCtrl.article.focusIndex}
    //     fetchMore        = {modelCtrl.article.fetchMore}
    //     hasMore          = {modelCtrl.article.hasMore}
    //   />
    case modelCtrl.devlog:
      return <ArticleView 
        articlesBinder   = {modelCtrl.devlog.articles}
        focusIndexBinder = {modelCtrl.devlog.focusIndex}
        fetchMore        = {modelCtrl.devlog.fetchMore}
        hasMore          = {modelCtrl.devlog.hasMore}
        refContainer     = {modelCtrl.devlog.articleDomRef}
      />
    case modelCtrl.about:
    default:
      return <div></div>
  }
}
const AppLSidebar = ({...args}) => {
  const [feature] = useState(modelCtrl.currFeature, 'AppLSidebar')
  
  switch (feature) {
    case modelCtrl.article: 
      return <ArticleList
        fetchList     ={modelCtrl.article.fetchIndex}
        regListUpdate ={modelCtrl.article.onIndexUpdate}
        regIterUpdate ={modelCtrl.article.onIterUpdate}
      />
    case modelCtrl.devlog:
      return <DevLogList 
        listBinder        = {modelCtrl.devlog.index}
        focusIndexBinder  = {modelCtrl.devlog.focusIndex}
        articleRefs       = {modelCtrl.devlog.articleDomRef}
      />
    case modelCtrl.about:
    default:
      return <div></div>
  }
}
const App = () => {
  const isPad = useMediaQuery(pad);
  const styles = isPad ? screen0 : screen1080; 
  useEffect(()=>{
    modelCtrl.init();
  }, [])
  const [showLSidebar] = useState(modelCtrl.mainNavLListBtnBinder, 'App')
  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <MainNav 
          iterBinder={modelCtrl.mainNavIterBinder}
          itemsBinder={modelCtrl.mainNavItemsBinder}
          lListBtnBinder={modelCtrl.mainNavLListBtnBinder}
        />
      </div>
      {
        showLSidebar || !isPad ? <div className={`${styles.LSidebar}`}> 
          <AppLSidebar />
        </div> : null
      }
      {
        !showLSidebar || !isPad ? <div className={`${styles.Content}`}> 
          <AppContent />
        </div> : null
      }
      <div className={styles.Footer}>
      </div>
    </div>
  );
}

export default App;
