import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Navbar from '../layout/Navbar'
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // This passes that message to actions, which generates ID and dispatches the alert
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
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
              <h1 className="auth-form__heading u-margin-bottom-medium">
                Sign Up
              </h1>
              <div className="auth-form__group u-margin-bottom-medium">
                <label className="auth-form__label" htmlFor="email">
                  Name
                </label>
                <input
                  className="auth-form__input"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => onChange(e)}
                  value={name}
                  // required
                />
              </div>
              <div className="auth-form__group u-margin-bottom-medium">
                <label className="auth-form__label" htmlFor="email">
                  Email
                </label>
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
                <label className="auth-form__label" htmlFor="password">
                  Password
                </label>
                <input
                  className="auth-form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  // minLength="6"
                  onChange={(e) => onChange(e)}
                  value={password}
                  // required
                />
              </div>
              <div className="auth-form__group u-margin-bottom-medium">
                <label className="auth-form__label" htmlFor="password">
                  Password Confirmation
                </label>
                <input
                  className="auth-form__input"
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  // minLength="6"
                  onChange={(e) => onChange(e)}
                  value={password2}
                  // required
                />
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
              <img
                src="/imgs/slider12.jpg"
                alt=""
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
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

