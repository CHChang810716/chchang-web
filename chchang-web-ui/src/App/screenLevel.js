import {useMediaQuery} from 'react-responsive'
const isPad = () => {
  return useMediaQuery({ query: `(max-width: 1080px)` });
}
export {isPad}