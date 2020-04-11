import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import rss from "../layout/rss"
import AusLanding from "../layout/AusLanding";

class AbtUs extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
  <div>
    <Route exact path="/AbtUs" component={Navbar} />
    <Route exact path = "/AbtUs" component = {rss} />
    <Route exact path="/AbtUs" component={AusLanding} />
  </div>
);
  }
}
AbtUs.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(AbtUs);