const appServersList = process.env.REACT_APP_SERVER_LIST.split(",");
const nav = { items: [] };

nav.items.push(
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  {
    title: true,
    name: "procmon",
    url: "/procdef",
    icon: "icon-star"
  }
);

appServersList.map(s => {
  nav.items.push({
    name: s,
    url: `/procdef/${s}`,
    icon: "icon-screen-desktop"
  });
});

nav.items.push(
  {
    divider: true
  },
  {
    title: true,
    name: "AUTORUN",
    wrapper: {
      element: "",
      attributes: {}
    }
  },
  {
    name: "Reports",
    url: "/autorun/autox4reports",
    icon: "icon-chart"
  },
  {
    name: "Scheduler",
    url: "/autorun/autosched",
    icon: "icon-clock"
  },
  {
    name: "Maintenance",
    url: "/autorun/emaintauto",
    icon: "icon-shield"
  },
  {
    name: "Back Ups",
    url: "/autorun/backups",
    icon: "icon-anchor"
  },
  {
    name: "Logs",
    url: "/emaintautolog",
    icon: "icon-layers"
  },
  {
    divider: true
  },
  {
    title: true,
    name: "Tasks"
  },
  {
    name: "Async Events",
    url: "/async/x3asyncwebrequest",
    icon: "icon-energy"
  },
  {
    name: "Pub/Sub Events",
    url: "/async/x3publishchannelevents",
    icon: "icon-event"
  }
);
export default nav;
