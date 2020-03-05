import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import * as R from "ramda";
import { Link } from "react-router-dom";

import { AsyncType } from "../../db/definitions";
import G from "../../config/globals";
import { List, getStatusIcon } from "./functions";

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

    fetch(`/api/async/${params.table}`)
      .then<AsyncType[]>(res => res.json())
      .then(
        result => {
          const sortedResults = R.reverse(
            R.sortBy(item => item.SUBMITTED, result)
          );

          this.setState({
            isLoaded: true,
            items: sortedResults
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
                <td>{getStatusIcon(item.STATUS)}</td>
                <td>
                  <Link to={`/async/${params.table}/${item.ID}`}>
                    {item.ID}
                  </Link>
                </td>
                <td>{item.TITLE}</td>
                <td>{item.USERNAME}</td>
                <td>
                  <Moment format={G.dateTimeFormat}>{item.SUBMITTED}</Moment>
                </td>
                <td>
                  <Moment format={G.dateTimeFormat}>{item.STARTED}</Moment>
                </td>
                <td>
                  <Moment format={G.dateTimeFormat}>{item.COMPLETED}</Moment>
                </td>
                <td>{item.STATUS}</td>
              </tr>
            ))}
          </Table>
        </React.Fragment>
      );
    }
  }
}
