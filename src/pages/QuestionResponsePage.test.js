import { renderWithProviders } from "../testUtils";
import { fireEvent, screen } from "@testing-library/react";

const questions = {
  1: {
    id: 1,
    text: "A question?",
    options: [
      { id: 1, text: "option 1", nextQuestionId: 2 },
      { id: 2, text: "option 2", nextQuestionId: 3 },
    ],
    isRoot: true,
  },
  2: {
    id: 2,
    text: "Another question",
    options: [],
  },
  3: {
    id: 3,
    text: "Yet another question",
    options: [{ id: 3, text: "option 3" }],
  },
};

test("renders a question", () => {
  renderWithProviders({ state: { questions }, history: ["/questions/1"] });

  const questionText = screen.getByText("A question?");
  const option1 = screen.getByLabelText("option 1");
  const option2 = screen.getByLabelText("option 2");
  expect(questionText).toBeInTheDocument();
  expect(option1).toBeInTheDocument();
  expect(option2).toBeInTheDocument();
});

test("navigates to /not-found when question does not exist", () => {
  renderWithProviders({ state: { questions }, history: ["/questions/4"] });

  const notFound = screen.getByText("404");
  expect(notFound).toBeInTheDocument();
});

test("navigates to /not-found when question exists but is unreachable", () => {
  renderWithProviders({ state: { questions }, history: ["/questions/2"] });

  const notFound = screen.getByText("404");
  expect(notFound).toBeInTheDocument();
});

test("renders already selected option as checked if present", () => {
  const answers = [{ questionId: 1, optionId: 2, nextQuestionId: 3 }];
  renderWithProviders({
    state: { questions, answers },
    history: ["/questions/1"],
  });

  const option1 = screen.getByLabelText("option 1");
  const option2 = screen.getByLabelText("option 2");
  expect(option1).not.toBeChecked();
  expect(option2).toBeChecked();
});

test("adds an answer and navigates to the next question when the form is submitted", () => {
  const { store } = renderWithProviders({
    state: { questions },
    history: ["/questions/1"],
  });
  const option = screen.getByLabelText("option 2");
  const submit = screen.getByRole("button");
  fireEvent.click(option);
  fireEvent.click(submit);

  const answers = store.getState().answers;
  expect(answers).toHaveLength(1);
  expect(answers[0]).toStrictEqual({
    questionId: 1,
    optionId: 2,
    nextQuestionId: 3,
  });
  const newQuestion = screen.getByText("Yet another question");
  expect(newQuestion).toBeInTheDocument();
});

test("navigates to /complete and displays answers when there are no remaining questions", () => {
  const answers = [{ questionId: 1, optionId: 2, nextQuestionId: 3 }];
  renderWithProviders({
    state: { questions, answers },
    history: ["/questions/3"],
  });
  const option = screen.getByLabelText("option 3");
  const submit = screen.getByRole("button");
  fireEvent.click(option);
  fireEvent.click(submit);

  expect(screen.getByText("Done!")).toBeInTheDocument();
  expect(screen.getByText("A question?")).toBeInTheDocument();
  expect(screen.getByText("option 2")).toBeInTheDocument();
  expect(screen.getByText("Yet another question")).toBeInTheDocument();
  expect(screen.getByText("option 3")).toBeInTheDocument();
});
