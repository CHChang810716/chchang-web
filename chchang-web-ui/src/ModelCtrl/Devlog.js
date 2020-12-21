import EventEmitter from 'events'
import axios from 'axios'
import config from './config'
// import makeid from '../makeid'
class Devlog {
  label = 'Dev Log'
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
    console.log('onFetched add event')
    this.eventsCtrl.on('fetched', handle);
  }
  fetchMore = (num) => {
    if(num === undefined) {
      num = 3;
    }
    console.log('fetchMore')
    let pmList = []
    console.log(this.index)
    let i = 0;
    for(i = 0; i < num && this.currFetchedIter + i < this.index.length; i ++) {
      console.log('fetch')
      const name = this.index[this.currFetchedIter + i].label;
      console.log(config.url)
      pmList.push(
        axios.get(
          `${config.url}/api/v1/devlog/article?name=${name}`
        )
      )
    }
    this.currFetchedIter += i;
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
    console.log(config.url)
    axios.get(`${config.url}/api/v1/devlog/index`).then(
      (rep)=>{
        console.log('index-update')
        this.index = rep.data.map(label => ({label: label}))
        console.log(this.index)
        this.eventsCtrl.emit('index-update', this.index)
      }
    )
  }
  onIndexUpdate = (fun) => {
    console.log('onIndexUpdate')
    this.eventsCtrl.on('index-update', fun)
    // this.eventsCtrl.emit('index-update', this.index)
    console.log(this.index)
    fun(this.index)
  }
  onIterUpdate = (fun) => {
    this.eventsCtrl.on('article-iter-update', fun)
  }
}

export default Devlog