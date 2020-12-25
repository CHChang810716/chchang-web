import EventEmitter from 'events'
class Article {
  label = 'Article'
  constructor(api) {
    this.index = []
    this.articles = []
    this.currFetchedIter = 0;
    this.eventsCtrl = new EventEmitter();
  }
  init = () => {
    this.fetchIndex()
  }
  onFetched = (handle) => {
    
    this.eventsCtrl.on('fetched', handle);
  }
  fetchMore = (num) => {
    
    if(num === undefined) {
      num = 3;
    }
    
  }
  hasMore = () => {
    
    return this.currFetchedIter < this.index.length
  }
  fetchIndex = () => {
    // return this.index
  }
  onIndexUpdate = (fun) => {

  }
  onIterUpdate = (fun) => {
    this.eventsCtrl.on('article-iter-update', fun)
  }
}

export default Article;