import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import * as R from "ramda";
import { Link } from "react-router-dom";

import { AsyncType } from "../../db/definitions";
import "../../env";
import { List, getStatusIcon } from "./functions";
import { properCase } from "../../common/functions";

interface AsyncTableProps {
  match: {
    params: {
      table: string;
    };
  };
}

export class AsyncTable extends React.Component<
  AsyncTableProps,
  List<AsyncType>
> {
  constructor(props: AsyncTableProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    fetch(`${process.env.API_ROOT_PATH}/async/${params.table}`)
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
                <td>
                  {getStatusIcon(item.status)} {properCase(item.status)}
                </td>
                <td>
                  <Link to={`/async/${params.table}/${item.id}`}>
                    {item.id}
                  </Link>
                </td>
                <td>{item.title}</td>
                <td>{item.username}</td>
                <td>
                  <Moment format={process.env.dateTimeFormat}>
                    {item.submitted}
                  </Moment>
                </td>
                <td>
                  <Moment format={process.env.dateTimeFormat}>
                    {item.started}
                  </Moment>
                </td>
                <td>
                  <Moment format={process.env.dateTimeFormat}>
                    {item.completed}
                  </Moment>
                </td>
              </tr>
            ))}
          </Table>
        </React.Fragment>
      );
    }
  }
}