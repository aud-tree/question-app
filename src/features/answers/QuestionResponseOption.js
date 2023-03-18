function QuestionResponseOption({
  selectedOption,
  id,
  text,
  nextQuestionId,
  handleChange,
}) {
  return (
    <div key={id} className="question-option">
      <input
        type="radio"
        name="question"
        id={`option${id}`}
        value={id}
        checked={selectedOption === id}
        onChange={() => handleChange(id, nextQuestionId)}
      />
      <label htmlFor={`option${id}`}>{text}</label>
    </div>
  );
}
export default QuestionResponseOption;
