import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import "./profile-form.scss";

const AddEducation = ({ addEducation, history, closeAddEduModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { title, location, description, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <div className="modal">
        <div className="modal__container modal__container--50">
          <div className="modal__close">
            <button
              onClick={closeAddEduModal}
              className="modal__close-icon fa fa-times"
              aria-hidden="true"
            ></button>
          </div>
          <div className="modal__headings">
            <h2 className="heading-secondary u-margin-bottom-xsmall">
              Add Education
            </h2>
            <h3 className="heading-tertiary u-margin-bottom-xsmall">
              Add any school, course, etc that you have attended
            </h3>
            <p className="subtext">* = required field</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addEducation(formData, history);
            }}
            className="input-form"
          >
            <div className="input-form__row">
              <div className="input-form__group u-margin-bottom-medium">
                <label className="input-form__label" htmlFor="title">
                  Course Title
                </label>
                <input
                  className="input-form__input"
                  type="text"
                  placeholder="Course Name"
                  onChange={(e) => onChange(e)}
                  value={title}
                  name="title"
                  required
                />
              </div>
              <div className="input-form__group u-margin-bottom-medium">
                <label className="input-form__label" htmlFor="location">
                  University or School Attended
                </label>
                <input
                  className="input-form__input"
                  type="text"
                  placeholder="University or School Name"
                  onChange={(e) => onChange(e)}
                  value={location}
                  name="location"
                  required
                />
              </div>
            </div>
            <div className="input-form__row">
              <div className="input-form__group input-form__group--start-date u-margin-bottom-medium">
                <label className="input-form__label" htmlFor="from">
                  Start Date
                </label>
                <input
                  className="input-form__input"
                  type="date"
                  placeholder="University or School name"
                  onChange={(e) => onChange(e)}
                  value={from}
                  name="from"
                  required
                />
              </div>

              <div
                className={`input-form__group u-margin-bottom-medium ${
                  toDateDisabled && "input-form__group--disabled"
                }`}
              >
                <label className="input-form__label" htmlFor="email">
                  End Date
                </label>
                <input
                  className="input-form__input"
                  type="date"
                  placeholder="University or School name"
                  onChange={(e) => onChange(e)}
                  disabled={toDateDisabled ? "disabled" : ""}
                  value={to}
                  name="to"
                  required
                />
              </div>

              <div className="input-form__group input-form__group--checkbox u-margin-bottom-medium checkbox">
                <div className="input-form__label">Current?</div>
                <label
                  htmlFor="current"
                  className="checkbox-label checkbox__label"
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    name="current"
                    id="current"
                    value={current}
                    checked={current}
                    onChange={(e) => {
                      setFormData({ ...formData, current: !current });
                      toggleDisabled(!toDateDisabled);
                    }}
                  />
                  <span className="checkbox__custom checkbox-custom"></span>
                </label>
              </div>
            </div>

            <div className="input-form__group u-margin-bottom-medium ">
              <label className="input-form__label" htmlFor="email">
                Description
              </label>
              <textarea
                className="input-form__input input-form__input--text-area"
                placeholder="University or School name"
                onChange={(e) => onChange(e)}
                value={description}
                name="description"
                rows="6"
                cols="50"
                required
              ></textarea>
            </div>
            <input type="submit" className="btn btn--full-width" />
          </form>
        </div>
      </div>
      <div 
        className="modal__backdrop"
        onClick={closeAddEduModal}
        >

        </div>
     
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
