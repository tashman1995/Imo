import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import { animated } from "react-spring";
import "./Navbar.scss";

const Navbar = ({
  animation,
  stage,
  auth: { isAuthenticated, loading },
  logout,
  noLinks,
}) => {
  const authLinks = (
    <ul className="nav__links">
      <li className="nav__link">
        <Link className="nav__link-text" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav__link">
        <a onClick={logout} className="nav__link-text" href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav__links">
      <li className="nav__link">
        <Link to="#!" className="nav__link-text ">
          Browse
        </Link>
      </li>
      <li className="nav__link">
        <Link to="/register" className="nav__link-text ">
          Register
        </Link>
      </li>
      <li className="nav__link">
        <Link to="/login" className="nav__link-text ">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <animated.div
      style={animation}
      className={stage === "2" ? "nav nav--dark" : "nav"}
      id="nav"
    >
      <Link to="/" className="nav__logo" >
      <img src="/imgs/logo.svg" alt="" className="nav__logo" />
      </Link>
      

      <nav className="nav__nav-element">
        {noLinks === true
          ? ""
          : !loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
      </nav>
    </animated.div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
