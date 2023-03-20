import { useDispatch, useSelector } from "react-redux";
import { selectRootQuestion } from "../features/questions/questionsSlice";
import { Link } from "react-router-dom";
import { answersReset } from "../features/answers/answersSlice";
import { useEffect } from "react";

function StartPage() {
  const { id } = useSelector(selectRootQuestion);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(answersReset());
  });

  return (
    <>
      <h2>Answer Some Questions!</h2>
      <Link className="button" to={`questions/${id}`}>
        Start
      </Link>
    </>
  );
}
export default StartPage;
