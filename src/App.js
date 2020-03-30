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
const NotFound = lazy(() => import("./components/not-found"));
const ProcstatTable = lazy(() => import("./components/procstat/table"));
const ProcdefTable = lazy(() => import("./components/procdef/table"));
const AutorunTable = lazy(() => import("./components/autorun/table"));
const AutorunDetails = lazy(() => import("./components/autorun/details"));
const Dashboard = lazy(() => import("./components/dashboard"));
const AsyncTable = lazy(() => import("./components/async/table"));
const AsyncDetails = lazy(() => import("./components/async/details"));
const EmaintAutoLogTable = lazy(() =>
  import("./components/emaintautolog/table")
);
const EmaintAutoLogDetails = lazy(() =>
  import("./components/emaintautolog/details")
);

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
