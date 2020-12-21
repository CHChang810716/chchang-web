import Article from './ModelCtrl/Article'
import EventEmitter from 'events'
import Devlog from './ModelCtrl/Devlog'
import About from './ModelCtrl/About'
class ModelCtrl {
  constructor() {
    this.about    = new About();
    this.article  = new Article();
    this.devlog   = new Devlog();
    this.events = new EventEmitter();
    this._viewTargets = [
      this.about,
      this.article,
      this.devlog
    ]
    // this.currTarget = this.about
  }
  viewTargets = () => {
    return this._viewTargets.map(target => target.label)
  }
  defaultViewTargeti = () => {
    return 0;
  }
  defaultViewTarget = () => {
    return this._viewTargets[this.defaultViewTargeti()].label
  }
  switchView = (i) => {
    this.events.emit('switch-view', i, this._viewTargets[i].label)
  }
  onSwitchView = (fun) => {
    this.events.on('switch-view', fun)
    this.events.on('switch-view', (i, label) => {
      this._viewTargets[i].init();
    })
  }
}
export default ModelCtrl