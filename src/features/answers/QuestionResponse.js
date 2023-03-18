import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionAnswered, selectAnswerByQuestionId } from "./answersSlice";
import QuestionResponseOption from "./QuestionResponseOption";

function QuestionResponse({ id, text, options, next }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [nextQuestionId, setNextQuestionId] = useState(null);
  const dispatch = useDispatch();
  const {
    optionId: previouslySelectedAnswerId,
    nextQuestionId: previouslySelectedNextQuestionId,
  } = useSelector((state) => selectAnswerByQuestionId(state, id));

  useEffect(() => {
    setSelectedOption(previouslySelectedAnswerId);
    setNextQuestionId(previouslySelectedNextQuestionId);
  }, [previouslySelectedAnswerId, previouslySelectedNextQuestionId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(questionAnswered(id, selectedOption, nextQuestionId));
    setSelectedOption(null);
    setNextQuestionId(null);
    next(nextQuestionId);
  };

  const handleAnswerChange = (optionId, nextQuestionId) => {
    setSelectedOption(optionId);
    setNextQuestionId(nextQuestionId);
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      {text}
      {options.map((option) => (
        <QuestionResponseOption
          key={option.id}
          handleChange={handleAnswerChange}
          selectedOption={selectedOption}
          {...option}
        />
      ))}
      <button type="submit" disabled={!selectedOption}>
        Continue
      </button>
    </form>
  );
}
export default QuestionResponse;
