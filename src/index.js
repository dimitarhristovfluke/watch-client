import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "./App";

const history = createBrowserHistory();

// "/appwatcher/client"

ReactDOM.render(
  <BrowserRouter history={history} basename={process.env.CLIENT_ROOT_PATH}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
