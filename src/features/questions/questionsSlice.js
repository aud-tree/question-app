import { createSelector } from "reselect";

const initialState = {
  1: {
    id: 1,
    text: "1?",
    options: [
      { id: 1, text: "option 1", nextQuestionId: 2 },
      { id: 2, text: "option 2", nextQuestionId: 3 },
      { id: 3, text: "option 3", nextQuestionId: 4 },
    ],
    isRoot: true,
  },
  2: {
    id: 2,
    text: "2?",
    options: [
      { id: 4, text: "option 4", nextQuestionId: 5 },
      { id: 5, text: "option 5" },
    ],
  },
  3: {
    id: 3,
    text: "3?",
    options: [
      { id: 6, text: "option 6" },
      { id: 7, text: "option 7" },
      { id: 8, text: "option 8" },
    ],
  },
  4: {
    id: 4,
    text: "4?",
    options: [
      { id: 9, text: "option 9" },
      { id: 10, text: "option 10" },
      { id: 11, text: "option 11" },
    ],
  },
  5: {
    id: 5,
    text: "5?",
    options: [
      { id: 12, text: "option 12" },
      { id: 13, text: "option 13" },
    ],
  },
};

function questionsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
export default questionsReducer;

export const selectQuestionById = (state, id) => state.questions[id];

export const selectRootQuestion = createSelector(
  [(state) => state.questions],
  (questions) => Object.values(questions).find((question) => question.isRoot)
);
