import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const initialState = {
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
  avatar: "",
};

const EditSocialMedia = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  clearAlerts,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.subjects))
        profileData.subjects = profileData.subjects.join(", ");
      if (Array.isArray(profileData.equipment))
        profileData.equipment = profileData.equipment.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const { youtube, twitter, instagram, linkedin, facebook, behance } = formData;

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
    <div className="modal__container--70">
      <div className="modal__headings">
        <h1 className="heading-primary u-margin-bottom-smallest">
          {profile.social
            ? "Edit Social Media Links"
            : "Add Social media Links"}
        </h1>
      </div>
      <div className="input-form__container">
        <form className="input-form" onSubmit={(e) => onSubmit(e)}>
          <div className="input-form__row">
            <div className="input-form__group ">
              <label className="form-label">Link us to your Instagram</label>
              <input
                className="input-form__input text-input"
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
              <Alert param="instagram" />
            </div>

            <div className="input-form__row ">
              <div className="input-form__group">
                <label className="form-label">Link us to your facebook</label>
                <input
                  className="input-form__input text-input"
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
                <Alert param="facebook" />
              </div>
            </div>
          </div>

          <div className="input-form__row ">
            <div className="input-form__group">
              <label className="form-label">Link us to your Twitter.</label>
              <input
                className="input-form__input text-input"
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
              <Alert param="twitter" />
            </div>

            <div className="input-form__group">
              <label className="form-label">
                Link us to your Youtube channel
              </label>
              <input
                className="input-form__input text-input"
                type="text"
                placeholder="Youtube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
              <Alert param="youtube" />
            </div>
          </div>

          <div className="input-form__row ">
            <div className="input-form__group">
              <label className="form-label">
                Link us to your Behance profile
              </label>
              <input
                className="input-form__input text-input"
                type="text"
                placeholder="Behance URL"
                name="behance"
                value={behance}
                onChange={(e) => onChange(e)}
              />
              <Alert param="behance" />
            </div>
            <div className="input-form__group">
              <label className="form-label">
                Link us to your LinkedIn profile
              </label>
              <input
                className="input-form__input text-input"
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
              <Alert param="linkedin" />
            </div>
          </div>

          <input type="submit" className="btn btn--full-width" />
        </form>
      </div>
    </div>
  );
};

EditSocialMedia.propTypes = {
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
})(withRouter(EditSocialMedia));
