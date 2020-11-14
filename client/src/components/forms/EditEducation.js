import React, { Fragment, useState, useEffect } from "react";
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

const EditEducation = ({
  editEducation,
  deleteEducation,
  history,
  closeEditEduModal,
  getCurrentProfile,
  educationId,
  profile: { profile, loading },
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

  useEffect(() => {
    getCurrentProfile();
    const editIndex = profile.education
      .map((item) => item._id)
      .indexOf(educationId);
     
    setFormData({
      title:
        loading || !profile.education[editIndex].title
          ? ""
          : profile.education[editIndex].title,
      location:
        loading || !profile.education[editIndex].location
          ? ""
          : profile.education[editIndex].location,
      from:
        loading || !profile.education[editIndex].from
          ? ""
          : moment(profile.education[editIndex].from).format("yyyy-MM-DD"),

      to:
        loading || !profile.education[editIndex].to
          ? false
          : moment(profile.education[editIndex].to).format("yyyy-MM-DD"),

      current:
        loading || !profile.education[editIndex].current
          ? ""
          : profile.education[editIndex].current,
      description:
        loading || !profile.education[editIndex].description
          ? ""
          : profile.education[editIndex].description,
    });
  }, []);

  const { title, location, description, from, to, current } = formData;

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  return (
    <Fragment>
   
      
          <div className="modal__headings">
            <h2 className="heading-secondary u-margin-bottom-smallest">
              Edit Education
            </h2>
            <h3 className="paragraph u-margin-bottom-smallest">
              Add any school, course, etc that you have attended
            </h3>
            <p className="subtext">* = required field</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              clearAlerts();
              editEducation(formData, history, educationId);
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

              <div className="input-form__group input-form__group--checkbox u-margin-bottom-medium checkbox">
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

            <div className="input-form__group u-margin-bottom-medium ">
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
                  deleteEducation(educationId);
                  closeEditEduModal();
                }}
                className="btn btn--delete input-form__delete-btn">
                Delete
              </button>
            </div>
          </form>
  
      {/* <div className="modal__backdrop" onClick={closeAddEduModal}></div> */}
    </Fragment>
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
