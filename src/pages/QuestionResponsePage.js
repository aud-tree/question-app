import { Navigate, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectQuestionById } from "../features/questions/questionsSlice";
import { selectIsQuestionReachable } from "../features/answers/answersSlice";
import QuestionResponse from "../features/answers/QuestionResponse";

function QuestionResponsePage() {
  let { id } = useParams();
  id = parseInt(id);
  const question = useSelector((state) => selectQuestionById(state, id));
  const isQuestionReachable = useSelector((state) =>
    selectIsQuestionReachable(state, id)
  );
  const navigate = useNavigate();

  const next = (nextQuestionId) => {
    const nextPath = nextQuestionId
      ? `/questions/${nextQuestionId}`
      : "/complete";
    navigate(nextPath);
  };

  return question && isQuestionReachable ? (
    <QuestionResponse {...question} next={next} />
  ) : (
    <Navigate to="/not-found" />
  );
}

export default QuestionResponsePage;
