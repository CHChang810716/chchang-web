import EventEmitter from 'events'
import makeid from '../makeid'
const fakeArticle = (i) => {
  const str =  `
# Article${i}

## h2 is this

### h3 is this

#### h4 is this

* markdown viewer
* canvas
* dialog

## h2 is this

## h2 is this

## h2 is this

## h2 is this

## h2 is this

## h2 is this

## h2 is this

`;
  return str;
}
class Article {
  constructor(api) {
    this.index = []
    this.articles = []
    for(let i = 0; i < 30; i ++) {
      this.index.push({
        gid: makeid(8),
        label: `Article ${i}`
      })
    }
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
    setTimeout(()=>{
      for(let i = 0; i < num && this.currFetchedIter < this.index.length; i ++) {
        const str = fakeArticle(this.currFetchedIter);
        this.currFetchedIter++;
        this.articles.push({content: str})
      }
      console.log('emit onFetch')
      this.eventsCtrl.emit('fetched', this.articles);
    })
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