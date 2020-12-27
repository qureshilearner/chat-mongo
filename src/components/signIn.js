import React, { Component } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { setOnlineUser } from "../socket-io/events";
import authService from "../services/authService";

class SignIn extends Component {
  state = {
    userName: "",
    password: "",
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
                placeholder="User Name"
                name="userName"
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
                onClick={(_) => this.props.history.push(`/register`)}
              >
                froget password
              </span>
              <b className="col-sm-4" style={{ color: "white" }}>
                {" OR "}
              </b>
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={(_) => this.props.history.push(`/register`)}
              >
                Register
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
                  Login
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
    let { userName, password } = this.state;
    this.setState({ loading: true });
    userName && password !== ""
      ? axios
          .post("/authenticate", {
            userName,
            password,
          })
          .then((res) =>
            res.data.success
              ? (authService.signIn(userName),
                setOnlineUser(authService.getUser()),
                this.props.history.push(`letsChat`))
              : this.setState({
                  errMsg: "Incorrect User Name OR Password",
                  loading: false,
                })
          )
          .catch((err) =>
            this.setState({
              errMsg: "Oops! Server Not Responding",
              loading: false,
            })
          )
      : this.setState({
          errMsg: "Incorrect User Name OR Password",
          loading: false,
        });
  };
}

export default withRouter(SignIn);
