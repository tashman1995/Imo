import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import NavBar from '../layout/Navbar'

import "./auth.scss";
import Navbar from "../layout/Navbar";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Navbar stage="2" noLinks={true}/>
      <div className="login">
        <div className="login__left">
          <div className="login__form">
            <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
              <h1 className="auth-form__heading u-margin-bottom-medium">Login</h1>
              <div className="auth-form__group u-margin-bottom-medium">
              <label className="auth-form__label" htmlFor="email">Email</label>
                <input
                className="auth-form__input"
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => onChange(e)}
                  value={email}
                  name="email"
                  required
                />
              </div>
              <div className="auth-form__group u-margin-bottom-medium">
                <label  className="auth-form__label" htmlFor="password">Password</label>
                <input
                className="auth-form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  onChange={(e) => onChange(e)}
                  value={password}
                  required
                />
              </div>
              <input type="submit" className="btn btn--full-width u-margin-bottom-medium" value="Login" />
              <p className="auth-form__paragraph">Don't have an account?                 <Link to={"/register"} className="auth-form__paragraph--link">
                  Sign Up Here
                </Link></p>
            </form>
          </div>
        </div>
        <div className="login__right">
          <div className="login__carousel">
            <div className="carousel">
              <img src="/imgs/slider12.jpg" alt="" className="carousel__image"/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);


