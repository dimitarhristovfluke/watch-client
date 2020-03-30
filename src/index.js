import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// import React from "react";
// import ReactDOM from "react-dom";

// import { BrowserRouter } from "react-router-dom";
// import { createBrowserHistory } from "history";

// import App from "./App";

// import "bootstrap/dist/css/bootstrap.css";

// const history = createBrowserHistory();

// // "/appwatcher/client"

// ReactDOM.render(
//   <BrowserRouter
//     history={history}
//     basename={process.env.REACT_APP_CLIENT_ROOT_PATH}
//   >
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );
