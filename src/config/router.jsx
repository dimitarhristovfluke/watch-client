import React from "react";

import { Switch, Route } from "react-router";

import { NotFound } from "../components/not-found";
import { Procmon } from "../components/procmon";
import { AutorunTable } from "../components/autorun/table";
import { AutorunDetails } from "../components/autorun/details";
import { Dashboard } from "../components/dashboard";
import { AsyncTable } from "../components/async/table";
import { AsyncDetails } from "../components/async/details";
import { EmaintAutoLogTable } from "../components/emaintautolog/table";
import { EmaintAutoLogDetails } from "../components/emaintautolog/details";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/procmon" component={Procmon} />
      <Route exact path="/autorun/:table" component={AutorunTable} />
      <Route exact path="/autorun/:table/:id" component={AutorunDetails} />
      <Route exact path="/async/:table" component={AsyncTable} />
      <Route exact path="/async/:table/:id" component={AsyncDetails} />
      <Route exact path="/pubsub/:table" component={AsyncTable} />
      <Route exact path="/pubsub/:table/:id" component={AsyncDetails} />
      <Route exact path="/emaintautolog" component={EmaintAutoLogTable} />
      <Route
        exact
        path="/emaintautolog/:cautoid"
        component={EmaintAutoLogDetails}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
