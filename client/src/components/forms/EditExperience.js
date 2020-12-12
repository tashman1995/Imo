import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  editExperience,
  deleteExperience,
  getCurrentProfile,
  closeEditExpModal,
} from "../../actions/profile";
import "./forms.scss";
import moment from "moment";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const initialState = {
  title: "",
  description: "",
  from: "",
  to: "",
  current: false,
  paid: false,
};

const EditExperience = ({
  editExperience,
  deleteExperience,
  history,
  closeEditExpModal,
  getCurrentProfile,
  experienceId,
  profile: { profile, loading },
  clearAlerts,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const editIndex = profile.experience
        .map((item) => item._id)
        .indexOf(experienceId);
      const experienceData = { ...initialState };
      for (const key in profile.experience[editIndex]) {
        if (key in profile.experience[editIndex])
          experienceData[key] = profile.experience[editIndex][key];
      }
   
      if (experienceData.current) {
        experienceData.to = "";
      }
      setFormData(experienceData);
    }
  }, [experienceId, getCurrentProfile, loading, profile]);

  const { title, description, from, to, current, paid } = formData;

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  return (
    <div className="modal__container--70">
      <div className="modal__headings">
        <h1 className="heading-primary u-margin-bottom-smallest">
          Edit Experience
        </h1>
        <h3 className="paragraph u-margin-bottom-smallest">
          Add professional experience you've gained
        </h3>
        <p className="subtext">* = required field</p>
      </div>
      <div className="input-form__container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearAlerts();
            editExperience(formData, history, experienceId);
          }}
          className="input-form">
          <div className="input-form__row">
            <div className="input-form__group ">
              <label className="form-label" htmlFor="title">
                Experience Title
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

            <div className="input-form__group input-form__group--checkbox  checkbox">
              <div className="form-label">Was this work paid?</div>
              <label htmlFor="paid" className="checkbox-label checkbox__label">
                <input
                  className="checkbox__input"
                  type="checkbox"
                  name="paid"
                  id="paid"
                  value={paid}
                  checked={paid}
                  onChange={(e) => {
                    setFormData({ ...formData, paid: !paid });
                  }}
                />
                <span className="checkbox__custom checkbox-custom"></span>
              </label>
            </div>
          </div>
          <div className="input-form__row">
            <div className="input-form__group input-form__group--start-date ">
              <label className="form-label" htmlFor="from">
                Start Date
              </label>
              <input
                className="input-form__input text-input"
                type="date"
                onChange={(e) => onChange(e)}
                value={moment(from).format("yyyy-MM-DD")}
                name="from"
                // required
              />
              <Alert param="from" />
            </div>

            <div
              className={`input-form__group  ${
                current && "input-form__group--disabled"
              }`}>
              <label className="form-label form-label--no-wrap" htmlFor="to">
                End Date
              </label>
              <input
                className="input-form__input text-input"
                type="date"
                onChange={(e) => onChange(e)}
                disabled={current ? true : ""}
                value={moment(to).format("yyyy-MM-DD")}
                name="to"
                // required
              />
              <Alert param="to" />
            </div>

            <div className="input-form__group input-form__group--checkbox  checkbox">
              <div className="form-label">Current?</div>
              <label
                htmlFor="current"
                className="checkbox-label checkbox__label">
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

          <div className="input-form__group  ">
            <label className="form-label" htmlFor="email">
              Description
            </label>
            <textarea
              className="input-form__input text-input input-form__input input-form__input--text-area"
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
          <div className="input-form__row">
            <input type="submit" className="btn btn--full-width" />
            <button
              type="button"
              onClick={() => {
                deleteExperience(experienceId);
                closeEditExpModal();
              }}
              className="btn btn--delete input-form__delete-btn">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditExperience.propTypes = {
  editExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  closeEditExpModal: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  clearAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  editExperience,
  deleteExperience,
  getCurrentProfile,
  closeEditExpModal,
  clearAlerts,
})(EditExperience);
