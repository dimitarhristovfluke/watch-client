import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AsyncType } from "../../db/definitions";
import "../../env";
import { getStatusIcon } from "./functions";
import { List } from "../../common/interfaces";
import Date from "../../common/components/date";

interface AsyncTableProps {
  match: {
    params: {
      table: string;
      status: string;
    };
  };
}

class AsyncTable extends React.Component<AsyncTableProps, List<AsyncType>> {
  constructor(props: AsyncTableProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      pageNumber: 1,
      pageSize: 10
    };
  }

  fetchData = (url: string) => {
    const {
      match: { params }
    } = this.props;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `status=${params.status || ""}`
    };
    fetch(url, options)
      .then<AsyncType[]>(res => res.json())
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
      `${process.env.REACT_APP_API_ROOT_PATH}/async/${params.table}`
    );
  }

  componentWillUpdate(np) {
    const {
      match: { params }
    } = this.props;
    const prevTable = params.table;
    const nextTable = np.match.params.table;
    if (nextTable && nextTable !== prevTable) {
      this.setState({ isLoaded: false });
      this.fetchData(
        `${process.env.REACT_APP_API_ROOT_PATH}/async/${nextTable}`
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
          <Table bordered hover responsive>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Username</th>
              <th>Submitted</th>
              <th>Started</th>
              <th>Completed</th>
            </tr>
            {items.map(item => (
              <tr>
                <td>{getStatusIcon(item.status)}</td>
                <td>
                  <Link to={`/async/${params.table}/${item.id}`}>
                    {item.id}
                  </Link>
                </td>
                <td>{item.title}</td>
                <td>{item.username}</td>
                <td>
                  <Date date={item.submitted} />
                </td>
                <td>
                  <Date date={item.started} />
                </td>
                <td>
                  <Date date={item.completed} />
                </td>
              </tr>
            ))}
          </Table>
        </React.Fragment>
      );
    }
  }
}

export default AsyncTable;
