import React from "react";
import * as R from "ramda";
import { ProcessInfo } from "../../common/types";
import "../../env";
import { DashboardCard } from "./card";
import { ListData } from "../../common/interfaces";
import api from "./api";
import { ProcmonDashboardCard } from "./procmon-card";

interface DashboardProps {
  serverId: string;
}
interface DashboardState {
  error: any;
  isLoaded: boolean;
  data: ListData<ProcessInfo>;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  handleInterval = 0;

  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {
        items: [],
        pageNumber: 1,
        totalPages: 0,
        totalRecords: 0,
      },
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

  procmonCardsElement = (items: ProcessInfo[]) => {
    const procmons = R.filter((i) => i.processid == "PROCMON", items);
    return (
      <ProcmonDashboardCard
        items={procmons}
        dateFormat={process.env.REACT_APP_dateTimeFormat}
      />
    );
  };

  cardsElements = (items: ProcessInfo[]) => {
    const nonProcmons = items.filter((i) => i.processid != "PROCMON");

    return nonProcmons.map((item, idx) => (
      <DashboardCard
        item={item}
        dateFormat={process.env.REACT_APP_dateTimeFormat}
        key={idx}
      />
    ));
  };

  fetchData = () => {
    const self = this;
    api()
      .get()
      .then(
        (result) => {
          self.setState({
            isLoaded: true,
            data: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const { error, isLoaded, data } = this.state;
    const { items } = data;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          {this.procmonCardsElement(items)}
          {this.cardsElements(items)}
        </React.Fragment>
      );
    }
  }
}

export default Dashboard;
