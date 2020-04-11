import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <nav class="nav-extended">
        <div className="nav-wrapper black">
          <a href="#" class="brand-logo center"><i class="material-icons">ac_unit</i>PESTO</a>
          <ul class="right hide-on-med-and-down">
            <li><a class="waves-effect waves-light btn-large" onClick={this.onLogoutClick}>Logout</a></li>
          </ul>
        </div>
        <div class="nav-content green">
          <ul class="tabs tabs-transparent">
            <li class="tab">
              <a>
                <Link to="/dashboard">Dashboard</Link>
              </a>
            </li>
            {/*<li class="tab">
              <a>
                <Link to="/Find-Friends">Find Friends</Link>
              </a>
            </li>*/}
            <li class="tab">
              <a>
                <Link to="/MyProf">My Profile</Link>
              </a>
            </li>
            <li class="tab">
              <a>
                <Link to="/AbtUs">About Us</Link>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
