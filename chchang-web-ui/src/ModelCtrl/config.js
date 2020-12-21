
const dev = {
  url: 'http://localhost:8060'
}
const prod = {
  url: ''
}

export default process.env.NODE_ENV === 'production' ? prod : dev