import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import { animated } from "react-spring";
import SlideToggle from "../SlideToggle";
import "./Navbar.scss";

const Navbar = ({
  animation,
  stage,
  auth: { isAuthenticated, loading },
  logout,
  noLinks,
}) => {
  // Mobile Nav
  const [navOpen, setNavOpen] = useState(false);

  const authLinks = (
    <ul className="nav__links">
      <li className="nav__link">
        <Link className="nav__link-text" to="/posts">
          Browse
        </Link>
      </li>
      <li className="nav__link">
        <Link className="nav__link-text" to="/profiles">
          Profiles
        </Link>
      </li>
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
  const authLinksMobile = (
    <ul className="mobile-nav__links">
      <li className="mobile-nav__link">
        <Link className="mobile-nav__link-text" to="/posts">
          Browse
        </Link>
      </li>
      <li className="mobile-nav__link">
        <Link className="mobile-nav__link-text" to="/profiles">
          Profiles
        </Link>
      </li>
      <li className="mobile-nav__link">
        <Link className="mobile-nav__link-text" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="mobile-nav__link">
        <a onClick={logout} className="mobile-nav__link-text" href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav__links">
      <li className="nav__link">
        <Link to="/posts" className="nav__link-text ">
          Browse
        </Link>
      </li>
      <li className="nav__link">
        <Link className="nav__link-text" to="/profiles">
          Profiles
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
  const guestLinksMobile = (
    <ul className="mobile-nav__links">
      <li className="mobile-nav__link">
        <Link to="/posts" className="mobile-nav__link-text ">
          Browse
        </Link>
      </li>
      <li className="mobile-nav__link">
        <Link className="mobile-nav__link-text" to="/profiles">
          Profiles
        </Link>
      </li>
      <li className="mobile-nav__link">
        <Link to="/register" className="mobile-nav__link-text ">
          Register
        </Link>
      </li>
      <li className="mobile-nav__link">
        <Link to="/login" className="mobile-nav__link-text ">
          Login
        </Link>
      </li>
    </ul>
  );

  useEffect(() => {
    // HANDLE OUTSIDE CLICK
    const handleClickOff = (e) => {
      if (menuElement.current) {
        if (menuElement.current.contains(e.target)) {
          //  exit if inside click
          return;
        }
        // outside click
        setNavOpen(false);
      }
    };
    // add when mounted
    document.addEventListener("mousedown", handleClickOff);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  });

  const menuElement = useRef();

  return (
    <div  ref={menuElement}>
      <animated.div
        style={animation}
        className={stage === "2" ? "nav" : "nav nav--light"}
        id="nav">
        <Link to="/" className="nav__logo-container">
          <img src="/imgs/logo.svg" alt="" className="nav__logo" />
        </Link>

        <nav className="nav__nav-element">
          {noLinks === true
            ? ""
            : !loading && (
                <Fragment>
                  {isAuthenticated ? authLinks : guestLinks}
                  <div className="nav-icon__container">
                    <button
                      onClick={() => setNavOpen(!navOpen)}
                      className={`nav-icon ${navOpen ? "open" : ""}`}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </Fragment>
              )}
        </nav>
      </animated.div>

      <nav className={`mobile-nav `}>
        <SlideToggle isVisible={navOpen}>
          {isAuthenticated ? authLinksMobile : guestLinksMobile}
        </SlideToggle>
      </nav>
    </div>
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
