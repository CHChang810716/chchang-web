import EventEmitter from 'events'
import axios from 'axios'
import config from './config'
// import makeid from '../makeid'
class Devlog {
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
    if(num === undefined) {
      num = 3;
    }
    console.log('fetchMore')
    let pmList = []
    for(let i = 0; i < num && this.currFetchedIter + i < this.index.length; i ++) {
      const name = this.index[this.currFetchedIter + i].label;
      pmList.push(
        axios.get(
          `http://${config.url}/api/v1/devlog/article?name=${name}`
        )
      )
    }
    this.currFetchedIter += num;
    Promise.all(pmList).then(articleList => {
      this.articles = this.articles.concat(
        articleList.map(rep => ({content: rep.data}))
      )
      this.eventsCtrl.emit('fetched', this.articles)
    })
  }
  hasMore = () => {
    console.log('hasMore')
    return this.currFetchedIter < this.index.length
  }
  fetchIndex = () => {
    console.log('fetchIndex')
    axios.get(`http://${config.url}/api/v1/devlog/index`).then(
      (rep)=>{
        this.index = rep.data.map(label => ({label: label}))
        this.eventsCtrl.emit('index-update', this.index)
      }
    )
  }
  onIndexUpdate = (fun) => {
    this.eventsCtrl.on('index-update', fun)
  }
  onIterUpdate = (fun) => {
    this.eventsCtrl.on('article-iter-update', fun)
  }
}

export default Devlog