import React, { Component } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    userName: "",
    password: "",
    email: "",
    loading: false,
    errMsg: null,
  };

  render() {
    return (
      <>
        <Form method="post" className="offset-md-4 col-md-6 mt-5">
          <Form.Row className="col-lg-8">
            <Col sm="12">
              {this.state.errMsg ? (
                <Alert
                  show={true}
                  variant="danger"
                  className="p-1 m-0 text-center"
                >
                  {this.state.errMsg}
                </Alert>
              ) : (
                ""
              )}
            </Col>
          </Form.Row>
          <br />
          <Form.Row className="col-lg-8">
            <Col sm="12">
              <Form.Control
                placeholder="E-Mail"
                name="email"
                type="email"
                onChange={this.handleInput}
                onKeyPress={this.handleEnter}
                autoFocus
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row className="col-lg-8">
            <Col sm="12">
              <Form.Control
                placeholder="User Name"
                name="userName"
                onChange={this.handleInput}
                onKeyPress={this.handleEnter}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row className="col-lg-8">
            <Col sm="12">
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleInput}
                onKeyPress={this.handleEnter}
              />
            </Col>
          </Form.Row>
          <Form.Row className="col-lg-8 mt-2 mb-2">
            <Col sm="12">
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={(_) => this.props.history.push(`/`)}
              >
                Login
              </span>
            </Col>
          </Form.Row>
          <Form.Row className="col-lg-8">
            <Col sm="12">
              {this.state.loading ? (
                <div className="loading">
                  <div className="spinner-border bg-white"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <Button
                  variant="outline-primary"
                  block
                  onClick={this.handleSubmit}
                >
                  Register
                </Button>
              )}
            </Col>
          </Form.Row>
        </Form>
      </>
    );
  }

  handleInput = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleEnter = (e) =>
    e.which === 13 && !this.state.loading && this.handleSubmit();

  handleSubmit = (_) => {
    let { email, userName, password } = this.state;
    this.setState({ loading: true });
    email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
    userName &&
    password !== ""
      ? axios
          .post("/create-user", {
            email,
            userName,
            password,
          })
          .then((res) =>
            res.data.success
              ? this.props.history.push(`/`)
              : this.setState({
                  errMsg: "This User Name Is Already In Use",
                  loading: 0,
                })
          )
          .catch((err) =>
            this.setState({ errMsg: "Oops! Server Not Responding", loading: 0 })
          )
      : userName && password !== ""
      ? this.setState({
          errMsg: "Invalid E-Mail (e.g. abc@anydomain.com)",
          loading: 0,
        })
      : this.setState({ errMsg: "All Fields Are Required", loading: 0 });
  };
}

export default withRouter(Register);
