import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { EmaintAutoType } from "../../db/definitions";
import "../../env";
import { properCase } from "../../common/functions";
import { Record, getStatusIcon, getInterval } from "./functions";

interface AutorunDetailsProps {
  match: {
    params: {
      table: string;
      id: string;
    };
  };
}

export class AutorunDetails extends React.Component<
  AutorunDetailsProps,
  Record<EmaintAutoType>
> {
  constructor(props: AutorunDetailsProps) {
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

    fetch(`${process.env.API_ROOT_PATH}/autorun/${params.table}/${params.id}`)
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
                {getStatusIcon(item.status)} {properCase(item.status)}{" "}
                <Button
                  type="button"
                  variant="primary"
                  block={false}
                  size="sm"
                  href={`${process.env.CLIENT_ROOT_PATH}/emaintautolog/${item.cautoid}`}
                >
                  View error log
                </Button>
              </td>
            </tr>
            <tr>
              <td>Process ID</td>
              <td>{item.cautoid}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{item.cdescrip}</td>
            </tr>
            <tr>
              <td>Last Run</td>
              <td>
                <Moment format={process.env.dateTimeFormat}>
                  {item.dlastrun}
                </Moment>
              </td>
            </tr>
            <tr>
              <td>Next Run</td>
              <td>
                <Moment format={process.env.dateTimeFormat}>
                  {item.dnextrun}
                </Moment>
              </td>
            </tr>
            <tr>
              <td>Run Interval</td>
              <td>{getInterval(item.nevery, item.cinterval)}</td>
            </tr>
            <tr>
              <td>Command Line</td>
              <td>{item.ccode}</td>
            </tr>
            <tr>
              <td>Message</td>
              <td>{item.message}</td>
            </tr>
          </Table>
        </React.Fragment>
      );
    }
  }
}
