import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { lazy } from "./lazy";

import "./App.scss";

const history = createBrowserHistory();

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers;
const DefaultLayout = lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login/Login"));

class App extends Component {
  render() {
    return (
      <BrowserRouter
        history={history}
        basename={process.env.REACT_APP_CLIENT_ROOT_PATH}
      >
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={props => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
