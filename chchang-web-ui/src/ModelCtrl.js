import Article from './ModelCtrl/Article'
import EventEmitter from 'events'
class ModelCtrl {
  constructor() {
    this.article = new Article({});
    this.events = new EventEmitter();
    this._viewTargets = [
      'About',
      'Articles',
      'Dev log'
    ]
  }
  viewTargets = () => {
    return this._viewTargets
  }
  defaultViewTargeti = () => {
    return 0;
  }
  defaultViewTarget = () => {
    return this.viewTargets[this.defaultViewTargeti()]
  }
  switchView = (i) => {
    this.events.emit('switch-view', i, this._viewTargets[i])
  }
  onSwitchView = (fun) => {
    this.events.on('switch-view', fun)
  }
}
export default ModelCtrl