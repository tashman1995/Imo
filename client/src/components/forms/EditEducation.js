import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  editEducation,
  deleteEducation,
  getCurrentProfile,
} from "../../actions/profile";
import moment from "moment";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const initialState = {
  title: "",
  location: "",
  from: "",
  to: "",
  current: false,
  description: "",
};

const EditEducation = ({
  editEducation,
  deleteEducation,
  history,
  getCurrentProfile,
  educationId,
  profile: { profile, loading },
  clearAlerts,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if(!profile) getCurrentProfile();
  
    if(!loading && profile) {
      const editIndex = profile.education
        .map((item) => item._id)
        .indexOf(educationId);
      const educationData = {...initialState};
      for( const key in profile.education[editIndex]) {
        if (key in profile.education[editIndex])
          educationData[key] = profile.education[editIndex][key];
      }
      educationData.from = moment(educationData.from).format("yyyy-MM-DD");
      educationData.to = moment(educationData.from).format("yyyy-MM-DD");
      if(educationData.current) {
        educationData.to = ""
      }
          
      setFormData(educationData)
    }

    // setFormData({
    //   title:
    //     loading || !profile.education[editIndex].title
    //       ? ""
    //       : profile.education[editIndex].title,
    //   location:
    //     loading || !profile.education[editIndex].location
    //       ? ""
    //       : profile.education[editIndex].location,
    //   from:
    //     loading || !profile.education[editIndex].from
    //       ? ""
    //       : moment(profile.education[editIndex].from).format("yyyy-MM-DD"),

    //   to:
    //     loading || !profile.education[editIndex].to
    //       ? false
    //       : moment(profile.education[editIndex].to).format("yyyy-MM-DD"),

    //   current:
    //     loading || !profile.education[editIndex].current
    //       ? ""
    //       : profile.education[editIndex].current,
    //   description:
    //     loading || !profile.education[editIndex].description
    //       ? ""
    //       : profile.education[editIndex].description,
    // });
  }, [educationId, getCurrentProfile, loading]);

  const { title, location, description, from, to, current } = formData;

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
          Edit Education
        </h1>
        <h3 className="paragraph u-margin-bottom-smallest">
          Add any school, course, etc that you have attended
        </h3>
        <p className="subtext">* = required field</p>
      </div>
      <div className="input-form__container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearAlerts();
            editEducation(formData, history, educationId);
          }}
          className="input-form">
          <div className="input-form__row">
            <div className="input-form__group">
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
            <div className="input-form__group">
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
            <div className="input-form__group input-form__group--start-date">
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
              className={`input-form__group ${
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
                value={to}
                name="to"
                // required
              />
              <Alert param="to" />
            </div>

            <div className="input-form__group input-form__group--checkbox checkbox">
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

          <div className="input-form__group ">
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
          <div className="input-form__buttons">
            <input type="submit" className="btn btn--full-width" />
            <button
              type="button"
              onClick={() => {
                deleteEducation(educationId);
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

EditEducation.propTypes = {
  editEducation: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  clearAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  editEducation,
  deleteEducation,
  getCurrentProfile,
  clearAlerts,
})(EditEducation);
