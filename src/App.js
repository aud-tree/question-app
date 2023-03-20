import styles from "./App.module.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}

export default App;
