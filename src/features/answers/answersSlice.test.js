import answersReducer, {
  answersReset,
  questionAnswered,
  selectAnswerByQuestionId,
  selectFinalAnswers,
  selectIsQuestionReachable,
} from "./answersSlice";

describe("answersReducer", () => {
  test("answersReset resets all answers", () => {
    const state = [1, 2, 3];
    const result = answersReducer(state, answersReset());
    expect(result).toStrictEqual([]);
  });

  describe("questionAnswered", () => {
    test("appends a new answer when question has not been answered", () => {
      const state = [{ questionId: 2, optionId: 3, nextQuestionId: 1 }];
      const result = answersReducer(
        state,
        questionAnswered(1, { optionId: 2, nextQuestionId: 3 })
      );
      expect(result).toStrictEqual([
        ...state,
        { questionId: 1, optionId: 2, nextQuestionId: 3 },
      ]);
    });

    test("replaces an existing answer and removes all subsequent answers", () => {
      const state = [
        { questionId: 1, optionId: 2, nextQuestionId: 2 },
        { questionId: 2, optionId: 3, nextQuestionId: 3 },
        { questionId: 3, optionId: 5, nextQuestionId: 5 },
      ];
      const result = answersReducer(
        state,
        questionAnswered(1, { optionId: 4, nextQuestionId: 4 })
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toStrictEqual({
        questionId: 1,
        optionId: 4,
        nextQuestionId: 4,
      });
    });
  });
});

describe("selectAnswerByQuestionId", () => {
  test("selects an answer by question ID", () => {
    const state = {
      answers: [
        { questionId: 1, optionId: 2 },
        { questionId: 2, optionId: 3 },
      ],
    };
    const result = selectAnswerByQuestionId(state, 2);
    expect(result.optionId).toBe(3);
  });
});

describe("selectIsQuestionReachable", () => {
  const state = {
    questions: {
      1: { text: "1", isRoot: true },
      2: { text: "2" },
      3: { text: "3" },
    },
    answers: [{ nextQuestionId: 2 }],
  };

  test("returns true if the question is the root question", () => {
    const result = selectIsQuestionReachable(state, 1);
    expect(result).toBeTruthy();
  });

  test("returns true if any answers lead to the given non-root question", () => {
    const result = selectIsQuestionReachable(state, 2);
    expect(result).toBeTruthy();
  });

  test("returns false if no answers lead to the given non-root question", () => {
    const result = selectIsQuestionReachable(state, 3);
    expect(result).toBeFalsy();
  });
});

describe("selectFinalAnswers", () => {
  test("returns the question ID and text of all answered questions and answers", () => {
    const state = {
      questions: {
        1: {
          text: "1",
          options: [
            { id: 1, text: "option 1" },
            { id: 2, text: "option 2" },
          ],
        },
        2: { text: "2" },
        3: { text: "3", options: [{ id: 4, text: "option 4" }] },
      },
      answers: [
        { questionId: 1, optionId: 2 },
        { questionId: 3, optionId: 4 },
      ],
    };
    const result = selectFinalAnswers(state);
    expect(result).toStrictEqual([
      { questionId: 1, questionText: "1", answerText: "option 2" },
      { questionId: 3, questionText: "3", answerText: "option 4" },
    ]);
  });
});
