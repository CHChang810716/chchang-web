import EventEmitter from 'events'
class Article {
  constructor(api) {
    this.index = []
    this.articles = []
    this.currFetchedIter = 0;
    this.eventsCtrl = new EventEmitter();
  }
  onFetched = (handle) => {
    console.log('onFetched add event')
    this.eventsCtrl.on('fetched', handle);
  }
  fetchMore = (num) => {
    console.log(this)
    if(num === undefined) {
      num = 3;
    }
    console.log('fetchMore')
  }
  hasMore = () => {
    console.log('hasMore')
    return this.currFetchedIter < this.index.length
  }
  getIndex = () => {
    return this.index
  }
  onIterUpdate = (fun) => {
    this.eventsCtrl.on('article-iter-update', fun)
  }
}

export default Article;