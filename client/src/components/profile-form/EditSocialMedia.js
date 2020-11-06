import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const EditSocialMedia = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  clearAlerts,
  closeEditSocialMediaModal,
}) => {
  const [formData, setFormData] = useState({
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
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      behance: loading || !profile.social ? "" : profile.social.behance,
    });
  }, [
    loading,
    getCurrentProfile,
 
  ]);

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
    <Fragment>
      <div className="modal">
        <div className="modal__container modal__container--70">
          <div className="modal__close">
            <button
              onClick={closeEditSocialMediaModal}
              className="modal__close-icon fa fa-times"
              aria-hidden="true"></button>
          </div>
          <div className="modal__headings">
            <h2 className="heading-secondary u-margin-bottom-smallest">
              Add Social Media Links
            </h2>
          </div>

          <form className="input-form" onSubmit={(e) => onSubmit(e)}>
            <div className="input-form__row">
              <div className="input-form__group u-margin-bottom-medium">
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

              <div className="input-form__row u-margin-bottom-medium">
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

            <div className="input-form__row u-margin-bottom-medium">
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

            <div className="input-form__row u-margin-bottom-medium">
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
                  placeholder="LinkdIn URL"
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
    </Fragment>
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
