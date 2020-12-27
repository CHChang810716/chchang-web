import axios from 'axios'
import config from './config'
import {State} from '../puppet'
// import makeid from '../makeid'
class RefSet {
  add = (i, ref) => {
    this._data[i] = ref
  }
  get = (i) => {
    return this._data[i]
  }
  _data = []
}
class Devlog {
  
  constructor(api) {
    // this.index = []
    // this.articles = []
    this.currFetchedIter = -1;
    // this.eventsCtrl = new EventEmitter();
  }
  fetchMore = (num) => {
    if(this.currFetchedIter < 0) return;
    
    if(num === undefined) {
      num = 3;
    }
    let pmList = []
    let i = 0;
    for(i = 0; i < num && this.currFetchedIter + i < this.index.val.length; i ++) {
      
      const name = this.index.val[this.currFetchedIter + i].label;
      
      pmList.push(
        axios.get(
          `${config.url}/api/v1/devlog/article?name=${name}`
        )
      )
    }
    this.currFetchedIter += i;
    return Promise.all(pmList).then(articleList => {
      this.articles.set(this.articles.val.concat(
        articleList.map(rep => ({content: rep.data}))
      ))
    })
  }
  init = async () => {
    let rep = await axios.get(`${config.url}/api/v1/devlog/index`)
    return this.index.set(
      rep.data
        .sort()
        .reverse()
        .map(label => ({label: label}))
    ).then(() => {
    })
  }
  hasMore = () => {
    if(this.currFetchedIter < 0) return false;
    return this.currFetchedIter < this.index.val.length
  }
  label           = 'Dev Log'
  currFetchedIter = -1
  index           = new State([], () => {
    this.currFetchedIter = 0;
    this.fetchMore(3)
  }, 'devlog-index')
  articles        = new State([], (arts) => {
    this.articleNum.set(arts.length)
  }, 'devlog-articles')
  articleNum      = new State(0, null, 'devlog-articlenum')
  focusIndex      = new State(new Set(), null, 'devlog-focusindex')
  articleDomRef   = new RefSet();
}

export default Devlog