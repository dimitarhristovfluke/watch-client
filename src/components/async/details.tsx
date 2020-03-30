import React from "react";
import "../../env";
import { properCase } from "../../common/functions";
import { getStatusIcon } from "./functions";
import { Record } from "../../common/interfaces";
import { AsyncType } from "../../db/definitions";
import Date from "../../common/components/date";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  Row
} from "reactstrap";

interface AsyncDetailsProps {
  match: {
    params: {
      table: string;
      id: string;
    };
  };
}

class AsyncDetails extends React.Component<
  AsyncDetailsProps,
  Record<AsyncType>
> {
  constructor(props: AsyncDetailsProps) {
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
      .then<AsyncType>(res => res.json())
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
        `${process.env.REACT_APP_API_ROOT_PATH}/async/${params.table}/${nextId}`
      );
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.fetchData(
      `${process.env.REACT_APP_API_ROOT_PATH}/async/${params.table}/${params.id}`
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
                      <Label htmlFor="text-input">ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.id}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Title</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.title}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Username</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.username}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Submitted On</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Date date={item.submitted} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Started On</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Date date={item.started} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Completed On</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Date date={item.completed} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Compledted With Error?</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.lerror}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Canceled by User?</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.lcanceled}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Input Data</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.inputdata}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Return Data</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.returndata}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Properties</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {item.properties}
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    }
  }
}

export default AsyncDetails;
