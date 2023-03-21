import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducer";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "./router";

export function renderWithProviders({ state = {}, history = ["/"] }) {
  const store = createStore(rootReducer, state);
  const router = createMemoryRouter(routes, { initialEntries: history });
  return {
    store,
    result: render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    ),
  };
}
