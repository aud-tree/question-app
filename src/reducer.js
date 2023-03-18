import { combineReducers } from "redux";
import questionsReducer from "./features/questions/questionsSlice";
import answersReducer from "./features/answers/answersSlice";

const rootReducer = combineReducers({
  questions: questionsReducer,
  answers: answersReducer,
});
export default rootReducer;
