import { selectQuestionById, selectRootQuestion } from "./questionsSlice";

let state = { questions: { 1: { text: "1" }, 2: { text: "2", isRoot: true } } };

describe("selectQuestionById", () => {
  test("selects a question by id", () => {
    const result = selectQuestionById(state, 1);
    expect(result.text).toBe("1");
  });
});

describe("selectRootQuestion", () => {
  test("selects the root question", () => {
    const result = selectRootQuestion(state);
    expect(result.text).toBe("2");
  });
});
