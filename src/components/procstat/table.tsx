import React from "react";
import Table from "react-bootstrap/Table";
import { ProcStatType } from "../../db/definitions";
import Date from "../../common/components/date";
import Elapsed from "../../common/components/elapsed";
import { List, ListData } from "../../common/interfaces";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ProctypeProps {
  match: {
    params: {
      serverId: string;
    };
  };
}

type PropsType = ProctypeProps & RouteComponentProps;

class ProcstatTable extends React.Component<PropsType, List<ProcStatType>> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {
        items: [],
        pageNumber: 1,
        totalPages: 0,
        totalRecords: 0
      }
    };
  }

  loadDefinitions = () => {
    const {
      match: { params }
    } = this.props;
    this.props.history.push(`/procdef/${params.serverId}`);
  };

  fetchData = (url: string) => {
    fetch(url)
      .then<ListData<ProcStatType>>(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            data: result
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

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.fetchData(
      `${process.env.REACT_APP_API_ROOT_PATH}/procstat/${params.serverId}`
    );
  }

  componentWillUpdate(np) {
    const {
      match: { params }
    } = this.props;
    const prevServer = params.serverId;
    const nextServer = np.match.params.serverId;
    if (nextServer && prevServer !== nextServer) {
      this.fetchData(
        `${process.env.REACT_APP_API_ROOT_PATH}/procstat/${nextServer}`
      );
    }
  }

  componentWillUnmount() {
    // clean up
  }

  render() {
    const { error, isLoaded, data } = this.state;
    const { items } = data;
    const {
      match: { params }
    } = this.props;
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <button
            className="btn btn-success btn-sm"
            onClick={() => this.loadDefinitions()}
          >
            Back to Procmon definitions
          </button>
          <Table bordered hover responsive>
            <tr>
              <th>Id</th>
              <th>Process Name</th>
              <th>Command Line</th>
              <th>Starte On</th>
              <th>Status</th>
              <th>Running since</th>
              <th>Killed?</th>
              <th>Server ID</th>
            </tr>
            {items.map(item => (
              <tr>
                <td>{item.pid}</td>
                <td>{item.pname}</td>
                <td>{item.cmdline}</td>
                <td>
                  <Date date={item.start} />
                </td>
                <td>{item.status}</td>
                <td>
                  <Elapsed seconds={item.pelapsed}></Elapsed>
                </td>
                <td>{item.pkilled}</td>
                <td>{item.cserverid}</td>
              </tr>
            ))}
          </Table>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(ProcstatTable);
