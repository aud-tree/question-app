import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import StartPage from "./pages/StartPage";
import QuestionResponsePage from "./pages/QuestionResponsePage";
import CompletePage from "./pages/CompletePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Navigate } from "react-router";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <StartPage /> },
      { path: "questions/:id", element: <QuestionResponsePage /> },
      { path: "complete", element: <CompletePage /> },
    ],
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
  { path: "*", element: <Navigate to="/not-found" /> },
];

const router = createBrowserRouter(routes);

export default router;
