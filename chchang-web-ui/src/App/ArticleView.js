import styles from './ArticleView.module.scss'
import ReactMarkdown from 'react-markdown'
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect}from 'react';
import {useState} from '../puppet'
import { InView } from 'react-intersection-observer';

const ArticleView = ({
  articlesBinder, 
  focusIndexBinder, 
  fetchMore, hasMore
}) => {
  console.log(focusIndexBinder)
  const [articles] = useState(articlesBinder, 'ArticleView');
  return (
    <div className={styles.ArticleView}>
      <div className={styles.Header}>
      </div>
      <div className={styles.Body} id="article-view">
        <InfiniteScroll 
          dataLength={articles.length}
          next={fetchMore}
          hasMore={hasMore()}
          loader={<h4>Loading...</h4>}
          scrollableTarget="article-view"
        >{
          articles.map((art, i) => (<div key={i}>
            <InView as="div" onChange={(inView, entry) => {
              if(inView && !focusIndexBinder.val.has(i)) {
                let index = new Set(focusIndexBinder.val)
                index.add(i)
                focusIndexBinder.set(index)
              }
              if(!inView && focusIndexBinder.val.has(i)) {
                let index = new Set(focusIndexBinder.val)
                index.delete(i)
                focusIndexBinder.set(index)
              }
              console.log(`view: ${i}, in: ${inView}`)
            }}
              className={styles.Article}>
                <ReactMarkdown 
                  className={styles.Markdown}
                >
                  {art.content}
                </ReactMarkdown>
            </InView>
            <div className={styles.Splitter}></div>
          </div>))
        }</InfiniteScroll>
      </div>
    </div>
  );

}

export default ArticleView;