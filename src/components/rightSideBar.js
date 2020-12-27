import React, { Component } from "react";
import axios from "axios";
import { getMsgs } from "../socket-io/events";
// import load from "../Images/";
import authService from "../services/authService";

class RightSideBar extends Component {
  constructor() {
    super();
    getMsgs(res => {
      this.setState({
        messages: [...this.state.messages, res],
        noMessages: []
      });
    });
  }

  state = {
    currentUser: "",
    messages: [],
    noMessages: []
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount = _ => {
    axios
      .get("/m")
      .then(res =>
        res.data.success
          ? (this.setState({
              messages: res.data.messages,
              currentUser: authService.getUser(),
              noMessages: null
            }),
            this.scrollToBottom)
          : this.setState({
              currentUser: res.data.currentUser,
              noMessages: [
                { from: "Let's Chat Now", date: "", body: "No Message Yet..." }
              ]
            })
      )
      .catch(e => console.log("Error When Post"));
  };

  render() {
    let { messages, noMessages } = this.state;
    return (
      <>
        {messages.length > 0 ? (
          ""
        ) : noMessages.length > 0 ? (
          ((messages = noMessages), "")
        ) : (
          <div className="col-sm-12 p-0 msgLoad">
            <div
              className="card-img-overlay spinner-grow m-auto"
              style={{ width: "7rem", height: "7rem" }}
              role="status"
            ></div>
            <div
              className="card-img-overlay m-auto"
              style={{ width: "7rem", height: "7rem" }}
              role="status"
            >
              {/* <img src={load} alt="Percent" className="mt-3" /> */}
            </div>
          </div>
        )}

        <div
          ref={el => {
            this.setToBottom = el;
          }}
          className="col-lg-12 col-sm-12 p-0 overflow-auto"
          style={{ height: "91%", float: "left" }}
        >
          <div id="chatmessages">
            {messages.map(({ from, date, body }, i) => (
              <div
                key={i}
                className="col-xl-12 col-sm-12 w-100 float-right my-2"
              >
                <div
                  id={this.getId(from)}
                  className="animated fadeIn col-10 col-lg-8 text-wrap mw-50 w-auto"
                >
                  {this.getId(from) === "send" ? (
                    <b>From You</b>
                  ) : (
                    <b>{from}</b>
                  )}
                  <span> at {date}</span>
                  <p className="m-1">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  getId = user => {
    // console.log(this.state.currentUser);
    if (user === this.state.currentUser) return "send";
    else return "recieve";
  };

  scrollToBottom = () => {
    this.setToBottom.scrollTop = this.setToBottom.scrollHeight;
  };
}

export default RightSideBar;
