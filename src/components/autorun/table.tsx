import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import * as R from "ramda";
import { Link } from "react-router-dom";

import { EmaintAutoType } from "../../db/definitions";
import G from "../../config/globals";
import { List, getStatusIcon, getInterval } from "./functions";

interface AutorunTableProps {
  match: {
    params: {
      table: string;
    };
  };
}

export class AutorunTable extends React.Component<
  AutorunTableProps,
  List<EmaintAutoType>
> {
  constructor(props: AutorunTableProps) {
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

    fetch(`/api/autorun/${params.table}`)
      .then<EmaintAutoType[]>(res => res.json())
      .then(
        result => {
          const sortedResults = R.sortBy(item => item.DNEXTRUN, result);

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
              <th>Process ID</th>
              <th>Description</th>
              <th>Last Run</th>
              <th>Next Run</th>
              <th>Run Inteval</th>
              <th>Status</th>
            </tr>
            {items.map(item => (
              <tr>
                <td>{getStatusIcon(item.STATUS)}</td>
                <td>
                  <Link to={`/autorun/${params.table}/${item.CAUTOID}`}>
                    {item.CAUTOID}
                  </Link>
                </td>
                <td>{item.CDESCRIP}</td>
                <td>
                  <Moment format={G.dateTimeFormat}>{item.DLASTRUN}</Moment>
                </td>
                <td>
                  <Moment format={G.dateTimeFormat}>{item.DNEXTRUN}</Moment>
                </td>
                <td>{getInterval(item.NEVERY, item.CINTERVAL)}</td>
                <td>{item.STATUS}</td>
              </tr>
            ))}
          </Table>
        </React.Fragment>
      );
    }
  }
}
