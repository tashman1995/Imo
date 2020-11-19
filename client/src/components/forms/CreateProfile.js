import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const CreateProfile = ({ createProfile, history, clearAlerts }) => {
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

  const {
    website,
    location,
    status,
    subjects,
    bio,
    equipment,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  const onSubmit = (e) => {
    e.preventDefault();
    clearAlerts();
    createProfile(formData, history);
  };

  // Avatar
  const fileButton = useRef();
  const fakeButton = useRef();
  const previewRef = useRef();
  const previewAvatarRef = useRef();
  const [previewImage, setPreviewImage] = useState("");
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
  setFormData({ ...formData, avatar: file });
  previewFile(file);
  };

  const previewFile = (file) => {
    // Use file reader from built in JS Api
    const reader = new FileReader();
    // Convert image to string
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  return (
    <div className="modal__container--70">
      <div className="modal__headings">
        <h1 className="heading-primary u-margin-bottom-smallest">
          Create Profile
        </h1>
        <h3 className="paragraph u-margin-bottom-labelest">
          Add any school, course, etc that you have attended
        </h3>
      </div>

      <form className="input-form" onSubmit={(e) => onSubmit(e)}>
        <div className="input-form__row">
          <div className="input-form__group u-margin-bottom-medium">
            <label className="form-label" htmlFor="status">
              What level photographer are you?
            </label>
            <select
              name="status"
              value={status}
              className="input-form__input input-form__input--dropdown text-input"
              onChange={(e) => onChange(e)}>
              <option value="0">Select Professional Status</option>
              <option value="Amateur">Amateur</option>
              <option value="Experienced Amateur">Experienced Amateur</option>
              <option value="Part Time Professional">
                Part-time Professional
              </option>
              <option value="Full-time Professional">
                Full-time Professional
              </option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor or Teacher">
                Instructor or Teacher
              </option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <Alert param="status" />
          </div>

          <div className="input-form__group u-margin-bottom-medium">
            <label className="form-label">
              Link us to your porfolio website.
            </label>
            <input
              className="input-form__input text-input"
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => onChange(e)}
            />
            <Alert param="website" />
          </div>
        </div>
        <div className="input-form__row u-margin-bottom-medium">
          <div className="input-form__group">
            <label className="form-label">Where are you based?</label>
            <input
              className="input-form__input text-input"
              type="text"
              placeholder="For example 'London, Great Britain'"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <Alert param="location" />
          </div>
          <div className="input-form__group avatar-input">
            {/* HIDDEN INPUT */}
            <input
              ref={fileButton}
              type="file"
              name="avatar"
              id=""
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
            {/* VISIBLE INPUT */}
            <div className="avatar-input__left">
              <div className="avatar-input__label">
                <label className="form-label u-margin-bottom-smallest">
                  Select Avatar File
                </label>
              </div>

              <button
                type="button"
                className="btn btn--table avatar-input__button"
                ref={fakeButton}>
                Select File &nbsp; <i className="far fa-file-image fa-lg"></i>
              </button>
            </div>

            <div className="avatar-input__right">
              <div className="avatar-input__preview" ref={previewRef}>
                {previewImage !== "" ? (
                  <img
                    src={previewImage}
                    ref={previewAvatarRef}
                    alt="User avatar preview"
                    className="avatar-input__image"
                  />
                ) : (
                  <i className="fas fa-2x fa-user avatar-input__icon"></i>
                )}
              </div>
              <div className="avatar-input__alert"></div>
              <Alert param="avatar" />
            </div>
          </div>
        </div>

        <div className="input-form__row u-margin-bottom-medium">
          <div className="input-form__group">
            <label className="form-label">
              Let us know what type of subjects you like to shoot, please use
              comma separated values (eg. low-light, wildlife, portraiture,
              travel, macro)
            </label>
            <input
              className="input-form__input text-input"
              type="text"
              placeholder="Subjects"
              name="subjects"
              value={subjects}
              onChange={(e) => onChange(e)}
            />
            <Alert param="subjects" />
          </div>

          <div className="input-form__group">
            <label className="form-label">
              Let us know what camera and lenses you shoot with, please use
              comma separated values (eg. Panasonic GH5, 12-35 2.8, 25mm 1.4)
            </label>
            <input
              className="input-form__input text-input"
              type="text"
              placeholder="Equipment"
              name="equipment"
              value={equipment}
              onChange={(e) => onChange(e)}
            />
            <Alert param="equipment" />
          </div>
        </div>

        <div className="input-form__group u-margin-bottom-medium">
          <label className="form-label">Biography</label>
          <textarea
            className="input-form__input  input-form__input--text-area"
            placeholder="Tell us a bit about your photography journey so far"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
            rows="4"
            cols="50"></textarea>
        </div>
        <input type="submit" className="btn btn--full-width" />
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  clearAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { createProfile, clearAlerts })(
  withRouter(CreateProfile)
);
