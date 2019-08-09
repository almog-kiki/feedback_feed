import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

import  Home  from './components/views/Home/Home'
class App extends Component {
  render() {
    return (
        <Router>
            <Switch>            
              <Route  path="/" name="Home" component={withRouter(Home)} />
            </Switch>
        </Router>
    );
  }
}

export default App;
