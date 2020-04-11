import React, { Component } from "react";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import authHandler from "./Utils/authHandler";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import './App.css';

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/dashboard";
import AbtUs from "./components/dashboard/AbtUs";
import findFriends from "./components/dashboard/findFriends";
import myProf from "./components/dashboard/myProf";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  authHandler(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/*<Route exact path="/" component={Navbar} />*/}
            <Route exact path="/" component={Landing} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Login"  component={Login} />
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/AbtUs" component={AbtUs} />
                {/*<PrivateRoute exact path="/Find-Friends" component={findFriends} />*/}
                <PrivateRoute exact path="/MyProf" component={myProf} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;