import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import "../styles/Css.css";
// import { Picker } from "emoji-mart";
// import { getCurrentUser } from "../socket-io/events";
import authService from "../services/authService";
import Emoji from "./emoji";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      from: "",
      isLoading: false,
    };
  }
  render() {
    let { body, isLoading } = this.state;

    return (
      <>
        <footer className="page-footer font-small stylish-color-dark">
          <InputGroup size="sm" style={{ top: "9px" }}>
            <Emoji onSelect={this.addEmoji} />
            <FormControl
              as="input"
              aria-label="With textarea"
              value={body}
              id="text"
              placeholder="Type your message..."
              onChange={(e) => this.setState({ body: e.target.value })}
              onKeyPress={(e) => e.which === 13 && body !== "" && this.send()}
            />
            <InputGroup.Prepend>
              <InputGroup>
                {body !== "" && (
                  <Button
                    size="lg"
                    variant="primary"
                    disabled={isLoading}
                    onClick={this.send}
                    style={{ marginTop: "-3px" }}
                  >
                    {!isLoading ? (
                      "Send"
                    ) : (
                      <span className="spinner-border spinner-border-lg"></span>
                    )}
                  </Button>
                )}
              </InputGroup>
            </InputGroup.Prepend>
          </InputGroup>
        </footer>
      </>
    );
  }

  addEmoji = (e) => {
    console.log(e);
    // let emoji = e;
    // this.setState({ body: this.state.body + emoji });
  };

  send = (_) => {
    this.setState({ showEmoji: 0 });
    let from = authService.getUser();
    console.log(from);
    let { body } = this.state;

    this.setState({ isLoading: 1 });
    const daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date =
      daylist[new Date().getDay()] +
      new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    from
      ? axios
          .post("/msg", {
            from,
            date,
            body,
          })
          .then((res) =>
            res.data.success
              ? this.setState({ isLoading: 0, body: "" })
              : console.log("false")
          )
          .catch((e) => console.log("Error When Post"))
      : this.props.history.push(`/`);
  };
}

export default withRouter(Footer);
