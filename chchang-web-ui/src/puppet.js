import React from 'react'
class State {
  constructor(initial, after, debug_id) {
    this.val = initial
    this.setters = new Set()
    this.afters = []
    this.debug_id = debug_id
    if(after) {
      this.afters.push(after)
    }
  }

  link = (setter) => {
    this.setters.add(setter)
  }
  unlink = (setter) => {
    this.setters.delete(setter)
  }
  set = (val) => {
    // console.log(`set ${this.debug_id}`)
    return Promise.all(Array.from(this.setters.values()).map(setter => {
      return setter(val)
    }))
    .then(() => {
      this.val = val
    })
    .then(() => {
      return Promise.all(this.afters.map(after => after(val)))
    })
  }
}
const useState = (mcbinder, debug_context) => {
  const [val, setter] = React.useState(mcbinder.val);
  const cbRef = React.useRef(null)
  const setThen = (val) => {
    return new Promise((resolve, reject) =>{
      cbRef.current = resolve;
      setter(val)
    })
  }
  React.useEffect(()=> {
    // console.log(`${debug_context} ${mcbinder.debug_id} link`)
    mcbinder.link(setThen)
    return () => {
      // console.log(`${debug_context} ${mcbinder.debug_id} release`)
      mcbinder.unlink(setThen)
    }
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