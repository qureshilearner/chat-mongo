import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getOnlineUsers } from "../socket-io/events";
import authService from "../services/authService";

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: []
    };

    getOnlineUsers(user => {
      console.log(user, authService.getUser());
      // user.splice(user.indexOf(authService.getUser()), 1);
      this.setState({ onlineUsers: user });
    });
  }

  render() {
    let { onlineUsers } = this.state;
    onlineUsers.includes(authService.getUser())
      ? (onlineUsers.splice(onlineUsers.indexOf(authService.getUser()), 1))
      : console.log("Not Contains");
    // onlineUsers.splice(onlineUsers.indexOf(authService.getUser()), 1);
    console.log(onlineUsers);
    return (
      <div className="col-xl-3 col-3 bg-info h-auto overflow-auto">
        {onlineUsers.map((users, i) => (
          <div
            key={i}
            className="col-xl-12 col-sm-12 animated fadeIn m-2 p-0"
            style={{ height: "4rem" }}
          >
            <div
              className="rounded-circle activeUser m-0"
              style={{ float: "left" }}
            >
              <p className="text-uppercase alias">{users.charAt(0)}</p>
            </div>
            <b
              // hidden={true}
              className="h-26 w-auto mt-2 p-1 "
              style={{ fontSize: "17px", float: "left" }}
            >
              {users}
            </b>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(LeftSideBar);
