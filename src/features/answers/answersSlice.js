import { createSelector } from "reselect";

const initialState = [];

function answersReducer(state = initialState, action) {
  switch (action.type) {
    case "answers/questionAnswered": {
      const { questionId } = action.payload;
      const existingAnswerIndex = state.findIndex(
        (answer) => answer.questionId === questionId
      );
      const newState = state.slice(
        0,
        existingAnswerIndex > -1 ? existingAnswerIndex : state.length
      );
      newState.push({ ...action.payload });
      return newState;
    }
    case "answers/answersReset": {
      return [];
    }
    default:
      return state;
  }
}
export default answersReducer;

export const questionAnswered = (questionId, optionId, nextQuestionId) => {
  return {
    type: "answers/questionAnswered",
    payload: {
      questionId,
      optionId,
      nextQuestionId,
    },
  };
};

export const answersReset = () => {
  return {
    type: "answers/answersReset",
  };
};

const selectAnswers = (state) => state.answers;
const selectQuestions = (state) => state.questions;
const selectById = (state, id) => id;

export const selectAnswerByQuestionId = createSelector(
  [selectAnswers, selectById],
  (answers, id) => answers.find(({ questionId }) => questionId === id) || {},
  { memoizeOptions: { maxSize: 5 } }
);

export const selectIsQuestionReachable = createSelector(
  [selectAnswers, selectQuestions, selectById],
  (answers, questions, id) =>
    answers.some(({ nextQuestionId }) => nextQuestionId === id) ||
    questions[id]?.isRoot,
  { memoizeOptions: { maxSize: 5 } }
);

export const selectFinalAnswers = createSelector(
  [selectAnswers, selectQuestions],
  (answers, questions) =>
    answers.map((answer) => {
      const { questionId, optionId } = answer;
      const question = questions[questionId];
      const questionText = question.text;
      const answerText = question.options.find(
        ({ id }) => id === optionId
      ).text;
      return { questionId, questionText, answerText };
    })
);
