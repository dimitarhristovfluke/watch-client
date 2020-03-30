import React from "react";
import Table from "react-bootstrap/Table";

import { ProcDefType } from "../../db/definitions";
import { getInterval } from "./function";
import { List } from "../../common/interfaces";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";

interface ProcdefProps {
  match: {
    params: {
      serverId: string;
    };
  };
}

type PropsType = ProcdefProps & RouteComponentProps;

class ProcdefTable extends React.Component<PropsType, List<ProcDefType>> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      pageNumber: 1,
      pageSize: 10
    };
  }

  loadProcesses = () => {
    const {
      match: { params }
    } = this.props;

    this.props.history.push(`/procstat/${params.serverId}`);
  };

  fetchData = (url: string) => {
    fetch(url)
      .then<ProcDefType[]>(res => res.json())
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
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.fetchData(
      `${process.env.REACT_APP_API_ROOT_PATH}/procdef/${params.serverId}`
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
        `${process.env.REACT_APP_API_ROOT_PATH}/procdef/${nextServer}`
      );
    }
  }

  componentWillUnmount() {
    // clean up
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const {
      match: { params }
    } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col lg={12}>
              <button
                className="btn btn-success btn-sm"
                onClick={() => this.loadProcesses()}
              >
                View Running Processes
              </button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Table bordered hover responsive>
                <tr>
                  <th>Id</th>
                  <th>Process Name</th>
                  <th>Description</th>
                  <th>Command Line</th>
                  <th>Watched by ProcMon?</th>
                  <th>Controlled by ProcMon?</th>
                  <th>Running / Required</th>
                  <th>Recycle Period</th>
                </tr>
                {items.map(item => (
                  <tr>
                    <td>{item.procdefid}</td>
                    <td>{item.procname}</td>
                    <td>{item.taskdesc}</td>
                    <td>{item.proccmdlin}</td>
                    <td>{item.procmon}</td>
                    <td>{item.procctrol}</td>
                    <td>{`${item.proccount} / ${item.procmin}`}</td>
                    <td>
                      {item.lrecycle
                        ? getInterval(item.nrecevery, item.crecintrvl)
                        : undefined}
                    </td>
                    <td>{item.cserverid}</td>
                  </tr>
                ))}
              </Table>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(ProcdefTable);
