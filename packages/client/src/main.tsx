import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootSaga from "./saga.ts";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { rootReducer } from "./root-reducer.ts";
import { composeWithDevTools } from 'redux-devtools-extension';

const SagaMW = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(SagaMW)));

SagaMW.run(rootSaga);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
