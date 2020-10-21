import React from "react";
import Table from "react-bootstrap/Table";
import { ProcDefType } from "../../db/definitions";
import { getInterval } from "./function";
import { List } from "../../common/interfaces";
import { Row, Col} from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";
import api from "./api";
import { merge2 } from "../../common/merge";

interface ProcdefProps {
  match: {
    params: {
      serverid: string;
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
      data: {
        items: [],
        pageNumber: 1,
        totalPages: 0,
        totalRecords: 0
      }
    };
  }

  loadProcesses = () => {
    const {
      match: { params }
    } = this.props;

    this.props.history.push(`/procdef/${params.serverid}`);
  };

  onPage = (page: number) => {
    const { data } = this.state;
    switch (page) {
      case -1:
        this.setState(
          merge2("data", "pageNumber", data.pageNumber - 1, this.state)
        );
        break;
      case 0:
        this.setState(
          merge2("data", "pageNumber", data.pageNumber + 1, this.state)
        );
        break;
      default:
        if (page > 0)
          this.setState(merge2("data", "pageNumber", page, this.state));
        break;
    }
  };

  onOrder = (field: string) => {
    if (this.state.orderBy?.field !== field)
      this.setState({ orderBy: { field, dest: "asc" } });
    else
      this.setState({
        orderBy: {
          field,
          dest: this.state.orderBy?.dest === "asc" ? "desc" : "asc",
        },
      });
  };

  onStatusChange = (status: string) =>
    this.setState({ filter: { field: "status", op: "eq", value: status } });
  fetchData = (page: number = 1) => {
    const {
      match: { params },
    } = this.props;

    const body = `status=${this.state.filter?.value || ""}&page=${page}&sort=${
      this.state.orderBy?.field || ""
    }&dest=${this.state.orderBy?.dest || ""}`;

    api()
      .list(params.serverid, body)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidMount() {
    this.fetchData();
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
                  <th>Server Id</th>
                </tr>
                {items.map(item => (
                  <tr>
                    <td>{item.procdefid}</td>
                    <td>{item.procname}</td>
                    <td>{item.taskdesc}</td>
                    <td>{item.proccmdlin}</td>
                    <td>{item.procmon.toString()}</td>
                    <td>{item.procctrl.toString()}</td>
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
