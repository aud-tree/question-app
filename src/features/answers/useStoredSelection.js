import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAnswerByQuestionId } from "./answersSlice";

function useStoredSelection(questionId) {
  const [selectedOption, setSelectedOption] = useState({});

  const { optionId, nextQuestionId } = useSelector((state) =>
    selectAnswerByQuestionId(state, questionId)
  );

  useEffect(() => {
    setSelectedOption({
      optionId,
      nextQuestionId,
    });
  }, [optionId, nextQuestionId]);

  return [selectedOption, setSelectedOption];
}
export default useStoredSelection;
