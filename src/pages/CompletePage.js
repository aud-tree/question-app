import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFinalAnswers } from "../features/answers/answersSlice";

function CompletePage() {
  const answers = useSelector(selectFinalAnswers);

  return (
    <div>
      <h3>Done!</h3>
      <h4>Your Answers:</h4>
      <ul>
        {answers.map((answer) => {
          const { questionId, questionText, answerText } = answer;
          return (
            <li key={questionId}>
              {questionText}: {answerText}
            </li>
          );
        })}
      </ul>
      <Link to="/">Reset</Link>
    </div>
  );
}
export default CompletePage;
