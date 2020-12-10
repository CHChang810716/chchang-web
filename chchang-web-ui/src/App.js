import styles from './App.module.scss';


const App = () => {
  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        home, login
      </div>
      <div className={styles.LSidebar}>
        tree view
      </div>
      <div className={styles.Content}>
        content view: markdown viewer, canvas, dialog
      </div>
      <div className={styles.RSidebar}>
        content index
      </div>
      <div className={styles.Footer}>
        copyright, status, info
      </div>
    </div>
  );
}

export default App;
