import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ImageLoad from "../layout/ImageLoad";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { clearAlerts } from "../../actions/alert";
import Alert from "../layout/Alert";
import "./auth.scss";
import Navbar from "../layout/Navbar";

const Register = ({ clearAlerts, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    clearAlerts();
    register({ name, email, password, password2 });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Navbar  />
      <div className="login u-grid">
        <div className="login__left">
          <div className="login__form">
            <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
              <h1 className="auth-form__heading u-margin-bottom-medium">
                Sign Up
              </h1>
              <div className="auth-form__group u-margin-bottom-medium">
                <label className="form-label" htmlFor="email">
                  Name
                </label>
                <input
                  className="auth-form__input text-input"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => onChange(e)}
                  value={name}
                  // required
                />
                <Alert param="name" />
              </div>
              <div className="auth-form__group u-margin-bottom-medium">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="auth-form__input text-input"
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => onChange(e)}
                  value={email}
                  name="email"

                  // required
                />
                <Alert param="email" />
              </div>

              <div className="auth-form__group u-margin-bottom-medium">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="auth-form__input text-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  // minLength="6"
                  onChange={(e) => onChange(e)}
                  value={password}
                  // required
                />
                <Alert param="password" />
              </div>
              <div className="auth-form__group u-margin-bottom-medium">
                <label className="form-label" htmlFor="password">
                  Password Confirmation
                </label>
                <input
                  className="auth-form__input text-input"
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  // minLength="6"
                  onChange={(e) => onChange(e)}
                  value={password2}
                  // required
                />
                <Alert param="password2" />
              </div>
              <input
                type="submit"
                className="btn btn--full-width u-margin-bottom-medium"
                value="Sign Up"
              />
              <p className="auth-form__paragraph">
                Already have an account?{" "}
                <Link to={"/login"} className="auth-form__paragraph--link">
                  Log In here
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="login__right">
          <div className="login__carousel">
            <div className="carousel">
              <ImageLoad
                src="/imgs/AuthLarge.jpg"
                placeholder="/imgs/AuthSmall.jpg"
                className="carousel__image"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  clearAlerts: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { clearAlerts, register })(Register);
