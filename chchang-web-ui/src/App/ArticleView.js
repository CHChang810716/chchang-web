import styles from './ArticleView.module.scss'
import ReactMarkdown from 'react-markdown'
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useState, useEffect}from 'react';

const ArticleView = ({regOnFetched, fetch, hasMore}) => {
  const [articles, setArticles] = useState([]);
  const [articleNum, setArticleNum] = useState(0);
  useEffect(()=>{
    regOnFetched((arts) => {
      setArticles(arts)
      setArticleNum(arts.length)
    })
    fetch(10)
  }, [regOnFetched, fetch])
  return (
    <div className={styles.ArticleView}>
      <div className={styles.Header}>
      </div>
      <div className={styles.Body} id="article-view">
        <InfiniteScroll 
          dataLength={articleNum}
          next={fetch}
          hasMore={hasMore()}
          loader={<h4>Loading...</h4>}
          scrollableTarget="article-view"
        >{
          articles.map((art, i) => (<div>
            <div 
              key={i} 
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