import axios from 'axios'
import config from './config'
import {State} from '../puppet'
// import makeid from '../makeid'
class Devlog {
  label = 'Dev Log'
  constructor(api) {
    // this.index = []
    // this.articles = []
    this.currFetchedIter = -1;
    // this.eventsCtrl = new EventEmitter();
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
  index = new State([], () => {
    this.currFetchedIter = 0;
    
    this.fetchMore(1)
  }, 'devlog-index')
  articles = new State([], (arts) => {
    this.articleNum.set(arts.length)
  }, 'devlog-articles')
  articleNum = new State(0, null, 'devlog-articlenum')
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
    Promise.all(pmList).then(articleList => {
      this.articles.set(this.articles.val.concat(
        articleList.map(rep => ({content: rep.data}))
      ))
    })
  }
  hasMore = () => {
    
    if(this.currFetchedIter < 0) return false;
    return this.currFetchedIter < this.index.val.length
  }
  // onIndexUpdate = (fun) => {
  //   
  //   this.eventsCtrl.on('index-update', fun)
  //   // this.eventsCtrl.emit('index-update', this.index)
  //   
  //   fun(this.index)
  // }
  // onIterUpdate = (fun) => {
  //   this.eventsCtrl.on('article-iter-update', fun)
  // }
}

export default Devlog