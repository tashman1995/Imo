import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  clearAlerts,
  closeEditProfileModal,
}) => {
  const [formData, setFormData] = useState({
    website: "",
    location: "",
    status: "",
    subjects: "",
    bio: "",
    equipment: "",
    youtube: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    behance: "",
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      subjects: loading || !profile.subjects ? "" : profile.subjects.join(","),
      bio: loading || !profile.bio ? "" : profile.bio,
      equipment:
        loading || !profile.equipment ? "" : profile.equipment.join(","),
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      linkedin: loading || !profile.social ? "" : profile.social.eqipment,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      behance: loading || !profile.social ? "" : profile.social.behance,
    });
  }, [
    loading,
    getCurrentProfile,
  ]);

  const { website, location, status, subjects, bio, equipment } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  const onSubmit = (e) => {
    e.preventDefault();
    clearAlerts();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      
       
          <div className="modal__headings">
            <h2 className="heading-secondary u-margin-bottom-smallest">
              Edit Profile
            </h2>
          </div>

          <form className="input-form" onSubmit={(e) => onSubmit(e)}>
            <div className="input-form__row">
              <div className="input-form__group u-margin-bottom-medium">
                <label className="form-label" htmlFor="status">
                  What level photographer are you?
                  <select
                    name="status"
                    value={status}
                    className="input-form__input input-form__input--dropdown text-input"
                    onChange={(e) => onChange(e)}>
                    <option value="0">Select Professional Status</option>
                    <option value="Amateur">Amateur</option>
                    <option value="Experienced Amateur">
                      Experienced Amateur
                    </option>
                    <option value="Part Time Professional">
                      Part-time Professional
                    </option>
                    <option value="Full-time Professional">
                      Full-time Professional
                    </option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor or Teacher">
                      Instructor or Teacher
                    </option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <Alert param="status" />
              </div>

              <div className="input-form__group u-margin-bottom-medium">
                <label className="form-label">
                  Link us to your porfolio website.
                  <input
                    className="input-form__input text-input"
                    type="text"
                    placeholder="Website"
                    name="website"
                    value={website}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <Alert param="website" />
              </div>
            </div>
            <div className="input-form__row u-margin-bottom-medium">
              <div className="input-form__group">
                <label className="form-label">
                  Where are you based?
                  <input
                    className="input-form__input text-input"
                    type="text"
                    placeholder="For example 'London, Great Britain'"
                    name="location"
                    value={location}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <Alert param="location" />
              </div>
            </div>

            <div className="input-form__row u-margin-bottom-medium">
              <div className="input-form__group">
                <label className="form-label">
                  Let us know what type of subjects you like to shoot, please
                  use comma separated values (eg. low-light, wildlife,
                  portraiture, travel, macro)
                  <input
                    className="input-form__input text-input"
                    type="text"
                    placeholder="Subjects"
                    name="subjects"
                    value={subjects}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <Alert param="subjects" />
              </div>

              <div className="input-form__group">
                <label className="form-label">
                  Let us know what camera and lenses you shoot with, please use
                  comma separated values (eg. Panasonic GH5, 12-35 2.8, 25mm
                  1.4)
                  <input
                    className="input-form__input text-input"
                    type="text"
                    placeholder="Equipment"
                    name="equipment"
                    value={equipment}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <Alert param="equipment" />
              </div>
            </div>

            <div className="input-form__group u-margin-bottom-medium">
              <label className="form-label">
                Biography
                <textarea
                  className="input-form__input  input-form__input--text-area"
                  placeholder="Tell us a bit about your photography journey so far"
                  name="bio"
                  value={bio}
                  onChange={(e) => onChange(e)}
                  rows="4"
                  cols="50"></textarea>
              </label>
            </div>
            <input type="submit" className="btn btn--full-width" />
          </form>

    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
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
  createProfile,
  getCurrentProfile,
  clearAlerts,
})(withRouter(EditProfile));
