import styles from './ArticleView.module.scss'
import ReactMarkdown from 'react-markdown'
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect}from 'react';
import {useState} from '../puppet'

const ArticleView = ({articlesBinder, fetchMore, hasMore}) => {
  const [articles] = useState(articlesBinder);
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
            <div 
              className={styles.Article}>
                <ReactMarkdown 
                  className={styles.Markdown}
                >
                  {art.content}
                </ReactMarkdown>
            </div>
            <div className={styles.Splitter}></div>
          </div>))
        }</InfiniteScroll>
      </div>
    </div>
  );

}

export default ArticleView;