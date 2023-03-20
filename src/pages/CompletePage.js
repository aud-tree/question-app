import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFinalAnswers } from "../features/answers/answersSlice";
import styles from "./CompletePage.module.css";

function CompletePage() {
  const answers = useSelector(selectFinalAnswers);

  return (
    <div className={styles.container}>
      <h2>Done!</h2>
      <h4>Your Answers:</h4>
      <ol className={styles.answerList}>
        {answers.map((answer) => {
          const { questionId, questionText, answerText } = answer;
          return (
            <li className={styles.answerItem} key={questionId}>
              <div className={styles.questionText}>{questionText}</div>
              <div className={styles.answerText}>{answerText}</div>
            </li>
          );
        })}
      </ol>
      <Link className="button" to="/">
        Reset
      </Link>
    </div>
  );
}
export default CompletePage;
