import { useDispatch } from "react-redux";
import { questionAnswered } from "./answersSlice";
import QuestionResponseOption from "./QuestionResponseOption";
import useStoredSelection from "./useStoredSelection";

function QuestionResponse({ id, text, options, next }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useStoredSelection(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(questionAnswered(id, selectedOption));
    setSelectedOption({});
    next(selectedOption.nextQuestionId);
  };

  const handleAnswerChange = (optionId, nextQuestionId) => {
    setSelectedOption({ optionId, nextQuestionId });
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      {text}
      {options.map((option) => (
        <QuestionResponseOption
          key={option.id}
          handleChange={handleAnswerChange}
          selectedId={selectedOption.optionId}
          {...option}
        />
      ))}
      <button type="submit" disabled={!selectedOption.optionId}>
        Continue
      </button>
    </form>
  );
}
export default QuestionResponse;
