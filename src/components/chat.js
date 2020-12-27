import React, { Component } from "react";
import NavBar from "./NavBar";
import PageVisibility from "react-page-visibility";
import Footer from "./footer";
import LeftSideBar from "./leftSideBar";
import { _isActive } from "../socket-io/events";
import RightSideBar from "./rightSideBar";

class ChatBox extends Component {
  state = {
    isVisible: false,
  };

  handleVisibilityChange = (isVisible) => {
    this.setState({ isVisible }, () => !isVisible && _isActive());
    console.log(this.state.isVisible, new Date().toUTCString());
  };
  render() {
    return (
      <>
        <PageVisibility onChange={this.handleVisibilityChange} />
        <NavBar />
        <div className="row col-sm-12 p-0 m-0" style={{ height: "91%" }}>
          <LeftSideBar />
          <div className="col-xl-9 col-9 border border-white p-0">
            <RightSideBar />
            <Footer />
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}

export default ChatBox;
