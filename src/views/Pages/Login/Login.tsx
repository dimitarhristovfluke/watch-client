import React, { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import localStorageImpl from "../../../common/utils/local-storage";
import Token from "../../../common/utils/token";
import { Alert } from "react-bootstrap";

interface LoginState {
  username: string;
  password: string;
  loginFailed: boolean;
}

interface LoginResponse {
  token: string;
}

type PropTypes = RouteComponentProps;

class Login extends React.Component<PropTypes, LoginState> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginFailed: false,
    };

    const localStorage = localStorageImpl("test", "HELPDESK");
    Token(localStorage).set("");
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  login = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        USERNAME: this.state.username,
        PASSWORD: this.state.password,
        "XT-UserAgent": "HEALTH_DASH",
      },
    };

    fetch("/wc.dll?x3~api~&q=GetLoginToken", options)
      .then<LoginResponse>((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          case 401: // unauhtorized
            //this.props.history.push(`/login`);
            this.setState({ loginFailed: true });
            break;
          case 403: // forbidden
            break;
        }
      })
      .then(
        (result) => {
          const localStorage = localStorageImpl("test", "HELPDESK");
          Token(localStorage).set(result.token);
          this.props.history.push(`${process.env.REACT_APP_API_ROOT_PATH}`);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {});
  };
  render() {
    const { username, password, loginFailed } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {loginFailed ? (
                        <Alert variant={"danger"}>Login failed.</Alert>
                      ) : undefined}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={username}
                          onChange={this.handleUsernameChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={this.handlePasswordChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            type="button"
                            onClick={() => this.login()}
                          >
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
