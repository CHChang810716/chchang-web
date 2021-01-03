import Article from './ModelCtrl/Article'
import Devlog from './ModelCtrl/Devlog'
import About from './ModelCtrl/About'
import {State} from '@chchang810716/react-sss'

class ModelCtrl {
  constructor() {
    this.about    = new About();
    this.article  = new Article();
    this.devlog   = new Devlog();
  }
  mainNavIterBinder     = new State(-1, i => {
    this.currFeature.set(
      this.mainNavItemsBinder.read()[i]
    )
  }, 'mainNavIter')
  mainNavItemsBinder    = new State([], () => {
    this.mainNavIterBinder.set(0)
  }, 'mainNavItems')
  mainNavLListBtnBinder = new State(false, null, 'mainNavLListBtn')
  currFeature           = new State(null, s => {
    this.currFeature.read().init()
  }, 'currFeature')


  init = async () => {
    this.mainNavItemsBinder.set(
      [
        // this.about,
        // this.article,
        this.devlog
      ]
    )
  }
}
export default ModelCtrl