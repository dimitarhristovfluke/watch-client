import React from "react";
import { ProcessInfo } from "../../common/types";
import G from "../../config/globals";
import { DashboardCard } from "./card";

interface DashboardProps {
  serverId: string;
}
interface DashboardState {
  error: any;
  isLoaded: boolean;
  refreshHandler: number;
  items: ProcessInfo[];
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      refreshHandler: undefined,
      items: []
    };
  }

  componentDidMount() {
    this.fetchData();
    const refreshHandler = window.setInterval(this.fetchData, 60000);
    this.setState({ refreshHandler });
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshHandler);
  }

  cardsElements = (items: ProcessInfo[]) => {
    return items.map((item, idx) => (
      <DashboardCard item={item} dateFormat={G.dateTimeFormat} key={idx} />
    ));
  };

  fetchData() {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return this.cardsElements(items);
    }
  }
}
