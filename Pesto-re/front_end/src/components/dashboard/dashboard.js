import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import dbLanding from "../layout/dbLanding";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
  <div>
    <Route exact path="/dashboard" component={Navbar} />
    <Route exact path="/dashboard" component={dbLanding} />
  </div>
);
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);