import React from "react";
import { ProcessInfo } from "../../common/types";
import "../../env";
import { DashboardCard } from "./card";

interface DashboardProps {
  serverId: string;
}
interface DashboardState {
  error: any;
  isLoaded: boolean;
  items: ProcessInfo[];
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  handleInterval = 0;

  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    this.handleInterval = undefined;
  }

  componentDidMount() {
    this.fetchData();
    this.handleInterval = window.setInterval(
      this.fetchData,
      parseInt(process.env.REACT_APP_RefreshInterval) * 1000 || 60
    );
  }

  componentWillUnmount() {
    clearInterval(this.handleInterval);
  }

  cardsElements = (items: ProcessInfo[]) => {
    return items.map((item, idx) => (
      <DashboardCard
        item={item}
        dateFormat={process.env.REACT_APP_dateTimeFormat}
        key={idx}
      />
    ));
  };

  fetchData = () => {
    const self = this;
    fetch(`${process.env.REACT_APP_API_ROOT_PATH}/dashboard`, {
      cache: "no-store"
    })
      .then(res => res.json())
      .then(
        result => {
          self.setState({
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
  };

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

export default Dashboard;
