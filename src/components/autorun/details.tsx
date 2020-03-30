import React from "react";
import { EmaintAutoType } from "../../db/definitions";
import "../../env";
import { getStatusIcon, getInterval } from "./functions";
import { Record, PageMode } from "../../common/interfaces";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Date from "../../common/components/date";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row
} from "reactstrap";

import "./index.css";

interface AutorunDetailsProps {
  match: {
    params: {
      table: string;
      id: string;
    };
  };
}

type PropsType = AutorunDetailsProps & RouteComponentProps;

class AutorunDetails extends React.Component<
  PropsType,
  Record<EmaintAutoType>
> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: null,
      mode: "read"
    };
  }

  fetchData = (url: string) => {
    fetch(url)
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
  };

  componentWillUpdate(np) {
    const {
      match: { params }
    } = this.props;
    const prevId = params.id;
    const nextId = np.match.params.id;
    if (nextId && nextId !== prevId) {
      this.fetchData(
        `${process.env.REACT_APP_API_ROOT_PATH}/autorun/${params.table}/${nextId}`
      );
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.fetchData(
      `${process.env.REACT_APP_API_ROOT_PATH}/autorun/${params.table}/${params.id}`
    );
  }

  componentWillUnmount() {
    // clean up
  }

  restartProcess = () => {
    const {
      match: { params }
    } = this.props;
    this.fetchData(
      `${process.env.REACT_APP_API_ROOT_PATH}/autorun/${params.table}/${params.id}/start`
    );
  };

  viewErrorsLog = () => {
    const {
      match: { params }
    } = this.props;

    this.props.history.push(`/emaintautolog/${params.id}`);
  };

  renderFooter = (mode: string) => {
    return mode === "edit" ? (
      <CardFooter>
        <Button type="submit" size="sm" color="primary">
          <i className="fa fa-dot-circle-o"></i> Submit
        </Button>{" "}
        <Button type="reset" size="sm" color="danger">
          <i className="fa fa-ban"></i> Reset
        </Button>
      </CardFooter>
    ) : (
      <CardFooter>
        <Button type="submit" size="sm" color="warning">
          <i className="fa fa-pencil"></i> Edit
        </Button>{" "}
        <Button
          type="reset"
          size="sm"
          color="danger"
          onClick={() => this.viewErrorsLog()}
        >
          <i className="fa fa-ban"></i> View Errors Log
        </Button>{" "}
        <Button
          type="reset"
          size="sm"
          color="success"
          onClick={() => this.restartProcess()}
        >
          <i className="fa fa-nav"></i> Start Process Now
        </Button>
      </CardFooter>
    );
  };
  render() {
    const { error, isLoaded, item, mode } = this.state;
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
        <Row>
          <Col xs="12" md="12" lg="12">
            <Card>
              <CardHeader>
                <strong>{params.table}</strong> : {params.id}
              </CardHeader>
              <CardBody>
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <FormGroup row>
                    <Col md="3">
                      <Label>Status</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {getStatusIcon(item.status)}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Process ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.cautoid}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.cdescrip}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Last Run</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Date date={item.dlastrun} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Next Run</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Date date={item.dnextrun} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Running Interval</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {getInterval(item.nevery, item.cinterval)}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Command Line</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.ccode}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Message</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.message}
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              {this.renderFooter(mode)}
            </Card>
          </Col>
        </Row>
      );
    }
  }
}

export default withRouter(AutorunDetails);
