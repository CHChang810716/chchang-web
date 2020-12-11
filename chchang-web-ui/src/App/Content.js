import styles from './Content.module.scss'
import ReactMarkdown from 'react-markdown'
const Content = () => {
  const str =  `

hn is this
===

hn is this
---

# h1 is this

## h2 is this

### h3 is this

#### h4 is this

* markdown viewer
* canvas
* dialog
`;
  return (
    <div className={styles.Content}>
      <ReactMarkdown 
        children={str} 
        className={styles.markdown}
      />
    </div>
  );
}

export default Content;