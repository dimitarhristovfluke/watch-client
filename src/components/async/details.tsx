import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import "../../env";
import { properCase } from "../../common/functions";
import { Record, getStatusIcon } from "./functions";
import { AsyncType } from "../../db/definitions";

interface AsyncDetailsProps {
  match: {
    params: {
      table: string;
      id: string;
    };
  };
}

export class AsyncDetails extends React.Component<
  AsyncDetailsProps,
  Record<AsyncType>
> {
  constructor(props: AsyncDetailsProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: null
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    fetch(`${process.env.API_ROOT_PATH}/async/${params.table}/${params.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            item: result
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
    const { error, isLoaded, item } = this.state;
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
          <Table striped bordered hover responsive>
            <colgroup>
              <col width="300px"></col>
              <col width="*"></col>
            </colgroup>
            <tr>
              <td>Status</td>
              <td>
                {getStatusIcon(item.status)} {properCase(item.status)}
              </td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{item.id}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{item.title}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{item.username}</td>
            </tr>
            <tr>
              <td>Submitted On</td>
              <td>
                <Moment format={process.env.dateTimeFormat}>
                  {item.submitted}
                </Moment>
              </td>
            </tr>
            <tr>
              <td>Started On</td>
              <td>
                <Moment format={process.env.dateTimeFormat}>
                  {item.started}
                </Moment>
              </td>
            </tr>
            <tr>
              <td>Completed On</td>
              <td>
                <Moment format={process.env.dateTimeFormat}>
                  {item.completed}
                </Moment>
              </td>
            </tr>
          </Table>
        </React.Fragment>
      );
    }
  }
}
