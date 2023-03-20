import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>
        This place is not a place of honor... no highly esteemed deed is
        commemorated here... nothing valued is here.
      </p>
      <Link className="button" to="/">
        Leave this place
      </Link>
    </div>
  );
}
export default NotFoundPage;
