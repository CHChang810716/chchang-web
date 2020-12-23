import React from 'react'
class State {
  constructor(initial, after) {
    this.val = initial
    this.setters = []
    this.afters = []
    if(after) {
      this.afters.push(after)
    }
  }

  link = (setter) => {
    this.setters.push(setter)
  }
  set = (val) => {
    return Promise.all(this.setters.map(setter => setter(val)))
    .then(() => {
      this.val = val
    })
    .then(() => {
      return Promise.all(this.afters.map(after => after(val)))
    })
  }
}
const useState = (mcbinder) => {
  const [val, setter] = React.useState(mcbinder.val);
  const cbRef = React.useRef(null)
  const setThen = (val) => {
    return new Promise((resolve, reject) =>{
      cbRef.current = resolve;
      setter(val)
    })
  }
  React.useEffect(()=> {
    mcbinder.link(setThen)
  }, [])
  React.useEffect(()=> {
    if(cbRef.current) {
      cbRef.current(val);
      cbRef.current = null;
    }
  }, [val])
  return [val, mcbinder.set];
}

export { useState, State }