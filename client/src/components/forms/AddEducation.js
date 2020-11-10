import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import "./forms.scss";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const AddEducation = ({
  addEducation,
  history,
  closeAddEduModal,
  clearAlerts,
}) => {
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

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  return (
    <Fragment>
      <div className="modal__close">
        <button
          onClick={closeAddEduModal}
          className="modal__close-icon fa fa-times"
          aria-hidden="true"></button>
      </div>
      <div className="modal__headings">
        <h2 className="heading-secondary u-margin-bottom-smallest">
          Add Education
        </h2>
        <h3 className="paragraph u-margin-bottom-smallest">
          Add any school, course, etc that you have attended
        </h3>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          clearAlerts();
          addEducation(formData, history);
        }}
        className="input-form">
        <div className="input-form__row">
          <div className="input-form__group u-margin-bottom-medium">
            <label className="form-label" htmlFor="title">
              Course Title
            </label>
            <input
              className="input-form__input text-input"
              type="text"
              placeholder="Course Name"
              onChange={(e) => onChange(e)}
              value={title}
              name="title"
              // required
            />
            <Alert param="title" />
          </div>
          <div className="input-form__group u-margin-bottom-medium">
            <label className="form-label" htmlFor="location">
              University or School Attended
            </label>
            <input
              className="input-form__input text-input"
              type="text"
              placeholder="University or School Name"
              onChange={(e) => onChange(e)}
              value={location}
              name="location"
              // required
            />
            <Alert param="location" />
          </div>
        </div>
        <div className="input-form__row">
          <div className="input-form__group input-form__group--start-date u-margin-bottom-medium">
            <label className="form-label" htmlFor="from">
              Start Date
            </label>
            <input
              className="input-form__input text-input"
              type="date"
              onChange={(e) => onChange(e)}
              value={from}
              name="from"
              // required
            />
            <Alert param="from" />
          </div>

          <div
            className={`input-form__group u-margin-bottom-medium ${
              toDateDisabled && "input-form__group--disabled"
            }`}>
            <label className="form-label  form-label--no-wrap" htmlFor="email">
              End Date
            </label>
            <input
              className="input-form__input text-input"
              type="date"
              onChange={(e) => onChange(e)}
              disabled={toDateDisabled ? "disabled" : ""}
              value={to}
              name="to"
              // required
            />
            <Alert param="to" />
          </div>

          <div className="input-form__group input-form__group--checkbox u-margin-bottom-medium checkbox">
            <div className="form-label">Current?</div>
            <label htmlFor="current" className="checkbox-label checkbox__label">
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
          <label className="form-label" htmlFor="email">
            Description
          </label>
          <textarea
            className="text-input input-form__input input-form__input--text-area"
            placeholder="Add some more detail about your studies"
            onChange={(e) => onChange(e)}
            value={description}
            name="description"
            rows="5"
            cols="50"
            // required
          ></textarea>
          <Alert param="description" />
        </div>
        <input type="submit" className="btn btn--full-width" />
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  clearAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { addEducation, clearAlerts })(
  withRouter(AddEducation)
);
