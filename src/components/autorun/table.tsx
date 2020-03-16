import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import * as R from "ramda";
import { Link } from "react-router-dom";

import { EmaintAutoType } from "../../db/definitions";
import { List, getStatusIcon, getInterval } from "./functions";
import { properCase } from "../../common/functions";

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

    fetch(`${process.env.API_ROOT_PATH}/autorun/${params.table}`)
      .then<EmaintAutoType[]>(res => res.json())
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
              <th>Status</th>
              <th>Process ID</th>
              <th>Description</th>
              <th>Last Run</th>
              <th>Next Run</th>
              <th>Run Inteval</th>
              <th>Last Error Message</th>
            </tr>
            {items.map(item => (
              <tr>
                <td>
                  {getStatusIcon(item.status)} {properCase(item.status)}
                </td>
                <td>
                  <Link to={`/autorun/${params.table}/${item.cautoid}`}>
                    {item.cautoid}
                  </Link>
                </td>
                <td>{item.cdescrip}</td>
                <td>
                  <Moment format={process.env.dateTimeFormat}>
                    {item.dlastrun}
                  </Moment>
                </td>
                <td>
                  <Moment format={process.env.dateTimeFormat}>
                    {item.dnextrun}
                  </Moment>
                </td>
                <td>{getInterval(item.nevery, item.cinterval)}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </Table>
        </React.Fragment>
      );
    }
  }
}
