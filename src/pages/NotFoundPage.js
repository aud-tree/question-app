import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <p>
        This place is not a place of honor... no highly esteemed deed is
        commemorated here... nothing valued is here.
      </p>
      <Link to="/">Leave this place</Link>
    </>
  );
}
export default NotFoundPage;
