import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import { EmaintAutoLogType } from "../../db/definitions";
import "../../env";
import { getStatusIcon } from "./functions";
import { List } from "../../common/interfaces";

interface EmaintAutoLogTableProps {}

class EmaintAutoLogTable extends React.Component<
  EmaintAutoLogTableProps,
  List<EmaintAutoLogType>
> {
  constructor(props: EmaintAutoLogTableProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      pageNumber: 1,
      pageSize: 10
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_ROOT_PATH}/emaintautolog`)
      .then<EmaintAutoLogType[]>(res => res.json())
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
              <th>Date/Time</th>
              <th>Process ID</th>
              <th>Command</th>
              <th>Program Executed</th>
              <th>Line No</th>
              <th>Error Message</th>
              <th>Run ID</th>
            </tr>
            {items.map(item => (
              <tr>
                <td>{getStatusIcon(item)}</td>
                <td>
                  <Moment format={process.env.REACT_APP_dateTimeFormat}>
                    {item.timestamp}
                  </Moment>
                </td>
                <td>{item.cautoid}</td>
                <td>{item.cautodesc}</td>
                <td>{item.cprogram}</td>
                <td>{item.nlineno}</td>
                <td>{item.cerrormsg}</td>
                <td>{item.crunid}</td>
              </tr>
            ))}
          </Table>
        </React.Fragment>
      );
    }
  }
}

export default EmaintAutoLogTable;
