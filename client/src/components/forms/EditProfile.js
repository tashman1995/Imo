import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Alert from "../layout/Alert";
import { clearAlerts, setAlert } from "../../actions/alert";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  clearAlerts,
  setAlert,
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
    avatar: "",
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      ...formData,
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
  }, [loading, getCurrentProfile]);

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

  // Avatar
  const fileButton = useRef();
  const fakeButton = useRef();
  const previewRef = useRef();
  const previewAvatarRef = useRef();
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");

  // creates a event that triggers click on fileButton
  const handleFileBtnClick = () => {
    // creates a event that triggers click on fileButton
    var clickEvent = new MouseEvent("click", { bubbles: true });
    fileButton.current.dispatchEvent(clickEvent);
  };

  useEffect(() => {
    const currentFakeButton = fakeButton.current;
    const currentPreviewRef = previewRef.current;
    currentFakeButton.addEventListener("click", handleFileBtnClick);
    currentPreviewRef.addEventListener("click", handleFileBtnClick);
    return () => {
      currentFakeButton.removeEventListener("click", handleFileBtnClick);
      currentPreviewRef.removeEventListener("click", handleFileBtnClick);
    };
  }, []);

  // Handle file selection
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10000000) {
        setAlert("File too large (>10mb)", "danger", "avatar");
        return;
      }
      setAlert("Correct File Size", "success", "avatar");
      setFileName(e.target.files[0].name);
    }

    setFormData({ ...formData, avatar: file });
    previewFile(file);
  };

  const previewFile = (file) => {
    // Use file reader from built in JS Api
    const reader = new FileReader();
    // Convert image to string
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  return (
    <div className="modal__container--70">
      <div className="modal__headings">
        <h1 className="heading-primary u-margin-bottom-smallest">
          Edit Profile
        </h1>
      </div>
      <div className="input-form__container">
        <form className="input-form" onSubmit={(e) => onSubmit(e)}>
          <div className="input-form__row">
            {/* PHOTOGRAPHER LEVEL */}
            <div className="input-form__group ">
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
            {/* PORTFOLIO WEBSITE */}
            <div className="input-form__group ">
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

          <div className="input-form__row ">
            {/* LOCATION */}
            <div className="input-form__group">
              <label className="form-label">
                Where are you based?
                <input
                  className="input-form__input input-form__input--margin-top text-input"
                  type="text"
                  placeholder="For example 'London, Great Britain'"
                  name="location"
                  value={location}
                  onChange={(e) => onChange(e)}
                />
              </label>
              <Alert param="location" />
            </div>
            {/* AVATAR UPLOAD */}
            <div className="input-form__group avatar-input">
              {/* HIDDEN INPUT */}
              <input
                ref={fileButton}
                type="file"
                name="avatar"
                id="avatar"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                // onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })}
                // value={avatar}
              />
              {/* VISIBLE INPUT */}
              <div className="avatar-input__left">
                <div className="avatar-input__label">
                  <label
                    htmlFor="avatar"
                    className="form-label u-margin-bottom-smallest">
                    Select Avatar File
                  </label>
                </div>

                <button
                  type="button"
                  className="btn btn--table avatar-input__button"
                  ref={fakeButton}>
                  Select File &nbsp; <i className="far fa-file-image fa-lg"></i>
                </button>
                <div>
                  <Alert param="avatar" />
                </div>
              </div>

              <div className="avatar-input__right">
                <div className="avatar-input__preview" ref={previewRef}>
                  {previewImage !== "" ? (
                    <img
                      src={previewImage}
                      alt="user avatar"
                      ref={previewAvatarRef}
                      className="avatar-input__image"
                    />
                  ) : (
                    <i className="fas fa-2x fa-user avatar-input__icon"></i>
                  )}
                </div>
                <div className="avatar-input__file-name">
                  <p className="sub-paragraph paragraph--no-line-height">
                    {fileName === "" ? "No file loaded" : fileName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="input-form__row ">
            <div className="input-form__group">
              <label className="form-label">
                Let us know what type of subjects you like to shoot, please use
                comma separated values (eg. low-light, wildlife, portraiture,
                travel, macro)
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
                comma separated values (eg. Panasonic GH5, 12-35 2.8, 25mm 1.4)
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

          <div className="input-form__group ">
            <label className="form-label">
              Biography
              <textarea
                className="text-input input-form__input input-form__input--text-area"
                placeholder="Tell us a bit about your photography journey so far"
                name="bio"
                value={bio}
                onChange={(e) => onChange(e)}
                rows="5"
                cols="50"></textarea>
            </label>
          </div>
          <input type="submit" className="btn btn--full-width" />
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  clearAlerts: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
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
  setAlert,
})(withRouter(EditProfile));
