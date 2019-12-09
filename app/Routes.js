import React, { Component } from "react";

import { Router, Stack, Scene } from "react-native-router-flux";

import Home from "./Screen/Home";
import Login from "./Screen/Login";
import Register from "./Screen/Register"

export default class Routes extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" initial={true} />
          
          <Scene key="register" component={Register} title="Register" />
    
          <Scene key="home" component={Home} title="Home" />

        </Stack>
      </Router>
    );
  }
}
