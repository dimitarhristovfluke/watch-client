import React from "react";

const NotFound = React.lazy(() => import("./components/not-found"));
const ProcdefTable = React.lazy(() => import("./components/procdef/table"));
const ProcstatTable = React.lazy(() => import("./components/procstat/table"));
const AutorunTable = React.lazy(() => import("./components/autorun/table"));
const AutorunDetails = React.lazy(() => import("./components/autorun/details"));
const Dashboard = React.lazy(() => import("./components/dashboard"));
const AsyncTable = React.lazy(() => import("./components/async/table"));
const AsyncDetails = React.lazy(() => import("./components/async/details"));
const EmaintAutoLogTable = React.lazy(() =>
  import("./components/emaintautolog/table")
);
const EmaintAutoLogDetails = React.lazy(() =>
  import("./components/emaintautolog/details")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    render: props => <Dashboard {...props} />
  },
  {
    path: "/autorun/:table/status/:status",
    exact: true,
    name: "Autorun",
    render: props => <AutorunTable {...props} />
  },
  {
    path: "/autorun/:table",
    exact: true,
    name: "Autorun",
    render: props => <AutorunTable {...props} />
  },
  {
    path: "/autorun/:table/:id",
    exact: true,
    name: "Process Details",
    render: props => <AutorunDetails {...props} />
  },
  {
    path: "/async/:table/status/:status",
    exact: true,
    name: "",
    render: props => <AsyncTable {...props} />
  },
  {
    path: "/async/:table",
    exact: true,
    name: "Tasks",
    render: props => <AsyncTable {...props} />
  },
  {
    path: "/async/:table/:id",
    exact: true,
    name: "Task Details",
    render: props => <AsyncDetails {...props} />
  },
  {
    path: "/procdef",
    exact: true,
    name: "ProcMon",
    render: props => <ProcdefTable {...props} />
  },
  {
    path: "/procdef/:serverId",
    exact: true,
    name: ":serverId",
    render: props => <ProcdefTable {...props} />
  },
  {
    path: "/procstat",
    exact: true,
    name: "Running Processes",
    render: props => <ProcstatTable {...props} />
  },
  {
    path: "/procstat/:serverId",
    exact: true,
    name: ":serverId",
    render: props => <ProcstatTable {...props} />
  },
  {
    path: "/emaintautolog",
    exact: true,
    name: "Log",
    render: props => <EmaintAutoLogTable {...props} />
  },
  {
    path: "/emaintautolog/:cautoid",
    exact: true,
    name: ":cautoid",
    render: props => <EmaintAutoLogDetails {...props} />
  }
];

export default routes;
