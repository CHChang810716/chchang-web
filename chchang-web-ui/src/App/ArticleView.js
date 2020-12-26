import styles         from './ArticleView.module.scss'
import ReactMarkdown  from 'react-markdown'
import InfiniteScroll from "react-infinite-scroll-component";
import React          from 'react';
import { useState }   from '../puppet'
import { InView }     from 'react-intersection-observer';

const ArticleView = ({
  articlesBinder, 
  focusIndexBinder, 
  fetchMore, hasMore,
  refContainer
}) => {
  const [articles] = useState(articlesBinder, 'ArticleView');
  const [focusIndex, setFocusIndex] = useState(focusIndexBinder, 'ArticleView')
  
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
            <InView ref={r => refContainer.add(i, r)} as="div" onChange={(inView, entry) => {
                if(inView && !focusIndex.has(i)) {
                  let index = new Set(focusIndex)
                  index.add(i)
                  setFocusIndex(index)
                }
                if(!inView && focusIndex.has(i)) {
                  let index = new Set(focusIndex)
                  index.delete(i)
                  setFocusIndex(index)
                }
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