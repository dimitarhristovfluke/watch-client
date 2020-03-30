import React from "react";

import { Switch, Route } from "react-router";

import { NotFound } from "../components/not-found";
import { ProcdefTable } from "../components/procdef/table";
import { ProcstatTable } from "../components/procstat/table";
import { AutorunTable } from "../components/autorun/table";
import { AutorunDetails } from "../components/autorun/details";
import { Dashboard } from "../components/dashboard";
import { AsyncTable } from "../components/async/table";
import { AsyncDetails } from "../components/async/details";
import { EmaintAutoLogTable } from "../components/emaintautolog/table";
import { EmaintAutoLogDetails } from "../components/emaintautolog/details";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

export default function Router() {
  return "";
  // return (
  //   <React.Suspense fallback={loading()}>
  //     <Switch>
  //       <Route exact path="/" component={Dashboard} />
  //       <Route exact path="/dashboard" component={Dashboard} />
  //       <Route exact path="/procdef" component={ProcdefTable} />
  //       <Route exact path="/procdef/:serverId" component={ProcdefTable} />
  //       <Route exact path="/procstat" component={ProcstatTable} />
  //       <Route exact path="/procstat/:serverId" component={ProcstatTable} />
  //       <Route exact path="/autorun/:table" component={AutorunTable} />
  //       <Route exact path="/autorun/:table/:id" component={AutorunDetails} />
  //       <Route exact path="/async/:table" component={AsyncTable} />
  //       <Route exact path="/async/:table/:id" component={AsyncDetails} />
  //       <Route exact path="/pubsub/:table" component={AsyncTable} />
  //       <Route exact path="/pubsub/:table/:id" component={AsyncDetails} />
  //       <Route exact path="/emaintautolog" component={EmaintAutoLogTable} />
  //       <Route
  //         exact
  //         path="/emaintautolog/:cautoid"
  //         component={EmaintAutoLogDetails}
  //       />
  //       <Route component={NotFound} />
  //     </Switch>
  //   </React.Suspense>
  // );
}
