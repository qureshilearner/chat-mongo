import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import icon from "./Images/typing-indicator.gif";
// import PrivateRoute from "./secure/PrivateRoute";
import ChatBox from "./components/chat";
import SignIn from "./components/signIn";
import Register from "./components/register";
import "./styles/Css.css";
import "./styles/animate.css";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/letsChat" component={ChatBox} />{" "}
          <Route path="/register" component={Register} />{" "}
          <Route path="/" component={SignIn} />{" "}
        </Switch>{" "}
      </Router>
    );
  }
}

export default App;
