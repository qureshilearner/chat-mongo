import React, { Component } from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import authService from "../services/authService";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  state = {
    name: "",
    status: ""
  };

  componentWillMount() {
    let get = authService.getUser();
    let user = get ? (
      get
    ) : (
      <span>
        You Are Not{" "}
        <a href="/" style={{ color: "blue" }}>
          Login
        </a>
      </span>
    );
    this.setState({ name: get, status: user });
  }

  render() {
    let {name, status} = this.state;
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="p-1"
        >
          <Navbar.Text className="p-0 ml-3">
            {name ? (
              <div
                className="rounded-circle activeUser m-0"
                style={{ float: "left" }}
              >
                <p className="text-uppercase alias">{name.charAt(0)}</p>
              </div>
            ) : (
              ""
            )}
            <b
              className="h-26 w-auto m-1 p-1 "
              style={{ fontSize: "20px", float: "left", color: "white" }}
            >
              {status}
            </b>
          </Navbar.Text>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          <Nav className="mr-auto"></Nav>
          <Form inline>
            {/* <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              /> */}
            <Button
              variant="outline-light"
              onClick={_ => {
                authService.signOut();
                this.props.history.push(`/`);
              }}
            >
              {name ? "Logout" : "Login"}
            </Button>
          </Form>
          {/* </Navbar.Collapse> */}
        </Navbar>
      </>
    );
  }
}

export default withRouter(NavBar);
