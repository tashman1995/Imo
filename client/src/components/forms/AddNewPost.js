import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import "./forms.scss";
import Alert from "../layout/Alert";
import Select from "../layout/Select";
import CustomInputRange from "../layout/CustomInputRange";
import { clearAlerts } from "../../actions/alert";
import { useSpring } from "react-spring";
// import "react-input-range/lib/css/index.css";

const PostForm = ({ addPost, closeNewPostModal, alerts, clearAlerts }) => {
  ////////////////////////////////////
  // CUSTOM FILE UPLOAD BUTTON
  ////////////////////////////////////
  const handleFileBtnClick = (e) => {
    // creates a event that triggers click on fileButton
    var clickEvent = new MouseEvent("click", { bubbles: true });
    fileButton.current.dispatchEvent(clickEvent);
  };

  const fileButton = useRef();
  const fakeButton = useRef();
  const previewRef = useRef();
  const previewImageRef = useRef();
  // creates a event that triggers click on fileButton
  useEffect(() => {
    fakeButton.current.addEventListener("click", handleFileBtnClick);
    previewRef.current.addEventListener("click", handleFileBtnClick);
    return () => {
      fakeButton.current.removeEventListener("click", handleFileBtnClick);
      previewRef.current.removeEventListener("click", handleFileBtnClick);
    };
  }, []);

  ////////////////////////////////////
  // LOADER FOR WHEN IMAGE IS UPLOADING
  ////////////////////////////////////
  const [uploadingImage, setUploadingImage] = useState(false);
  useEffect(() => {
    if (alerts.length !== 0) {
      setUploadingImage(false);
    }
  }, [alerts]);

  ////////////////////////////////////
  // FORM DATA HANDLING
  ////////////////////////////////////
  // Handle form state
  const [formData, setFormData] = useState({
    image: "",
    height: null,
    title: "",
    description: "",
    bestTime: "",
    focalLengthRange: { min: 35, max: 70 },
    location: "",
  });

  // Set best time as selected choice of Select component
  const setBestTime = (item) => {
    setFormData({ ...formData, bestTime: item });
  };
  // Handle file selection
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    console.log();
  };

  const previewFile = (file) => {
    // Use file reader from built in JS Api
    const reader = new FileReader();
    // Convert image to string
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
  };

  // On change function for simple inputs
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Extract values from formData to populate simple input
  const { title, description, location, image } = formData;

  // Handle focal length input
  const [focalLengthRange, setFocalLengthRange] = useState({
    min: 35,
    max: 70,
  });

  // CLEAR ALERTS ON LOAD
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  useEffect(() => {
    console.log('run')
    previewImageRef.current &&
    setFormData({
      ...formData,
      height: previewImageRef.current.height/ previewImageRef.current.width > 1 ? 1350 : 770,
    });
    
  }, [formData.image]);

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    clearAlerts();
    setUploadingImage(true);
    addPost(formData);
  };

  return (
    <Fragment>
      {uploadingImage && (
        <div className="modal__loading">
          <div className="modal__loading-animation"></div>
        </div>
      )}

    
      <div className="modal__headings">
        <h2 className="heading-secondary u-margin-bottom-smallest">
          Add New Location
        </h2>
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-form__row">
          {/* /////////////////////////////////////////
           // FILE INPUT
          ///////////////////////////////////////// */}
          <div className="input-form__group input-form__group--image">
            {/* HIDDEN INPUT */}
            <input
              ref={fileButton}
              type="file"
              name="image"
              id=""
              style={{ display: "none" }}
              // value={image}
              onChange={handleFileInputChange}
            />
            {/* VISIBLE INPUT */}
            <label className="form-label u-margin-bottom-smallest">
              Select Image File
            </label>
            <div className=" input-form__input--image ">
              <div
                className="input-form__image-container u-margin-bottom-small"
                ref={previewRef}>
                {image != "" ? (
                  <img
                    src={image}
                    ref={previewImageRef}
                    className="input-form__image"
                  />
                ) : (
                  <i className="fas fa-image fa-10x input-form__image--icon"></i>
                )}
              </div>
              <button type="button" className="btn btn--table" ref={fakeButton}>
                Select File &nbsp; <i className="far fa-file-image fa-lg"></i>
              </button>
              <div className="input-form__image-alert">
                <Alert param="image" />
              </div>
            </div>
          </div>

          <div className="input-form__area">
            <div className="input-form__row u-margin-bottom-medium">
              {/* ///////////////////////////////////////// // TITLE INPUT
              ///////////////////////////////////////// */}
              <div className="input-form__group">
                <label
                  className="form-label input-form__label u-margin-bottom-smallest"
                  htmlFor="title">
                  Location Title
                </label>
                <input
                  className="input-form__input text-input"
                  type="text"
                  placeholder="Location Title"
                  onChange={(e) => onChange(e)}
                  value={title}
                  name="title"
                  // required
                />
                <Alert param="title" />
              </div>
              {/* ///////////////////////////////////////// // BEST TIME INPUT
              ///////////////////////////////////////// */}
              <div className="input-form__group">
                <label
                  className="form-label input-form__label u-margin-bottom-smallest"
                  htmlFor="title">
                  Select the best time to shoot this location
                </label>
                <Select
                  placeholder="Select Time"
                  options={[
                    { name: "Morning Blue Hour", value: "Morning Blue Hour" },
                    { name: "Sunrise", value: "Sunrise" },
                    { name: "Morning", value: "Morning" },
                    { name: "Noon", value: "Noon" },
                    { name: "Afternoon", value: "Afternoon" },
                    { name: "Sunset", value: "Sunset" },
                    { name: "Evening Blue Hour", value: "Evening Blue Hour" },
                    { name: "Night Time", value: "Night Time" },
                  ]}
                  width="100%"
                  setFunction={setBestTime}
                />
                <div className="div" style={{ marginTop: "3px" }}>
                  <Alert param="bestTime" />
                </div>
              </div>
            </div>
            <div className="input-form__row u-margin-bottom-medium">
              {/* /////////////////////////////////////////
               //FOCAL LENGTH INPUT
              ///////////////////////////////////////// */}
              <div className={`input-form__group`}>
                <label className="form-label input-form__label" htmlFor="title">
                  Suggested Focal Length (Full Frame Equivalent)
                </label>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <CustomInputRange
                    maxValue={400}
                    minValue={7}
                    value={focalLengthRange}
                    formatLabel={(value) => `${value}mm`}
                    onChange={(value) => {
                      setFocalLengthRange(value);
                      setFormData({
                        ...formData,
                        focalLengthRange: value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="input-form__row">
              {/* ///////////////////////////////////////// 
              // GEO LOCATION INPUT
              ///////////////////////////////////////// */}
              <div className="input-form__group">
                <label className="form-label" htmlFor="location">
                  Geographical Location
                </label>
                <input
                  className="input-form__input text-input"
                  type="text"
                  placeholder="Provide us with the name of the area or the address of the location"
                  onChange={(e) => onChange(e)}
                  value={location}
                  name="location"
                  // required
                />
                <Alert param="location" />
              </div>
            </div>
            <div className="input-form"></div>
          </div>
        </div>
        {/* ///////////////////////////////////////// 
          // DESCRIPTION LOCATION INPUT
          ///////////////////////////////////////// */}
        <div className="input-form__group u-margin-bottom-medium ">
          <label className="form-label" htmlFor="email">
            Description
          </label>
          <textarea
            className="input-form__input text-input input-form__input input-form__input--text-area"
            placeholder="Use this space to give IMO users a better idea of the location, include any tips you may have"
            onChange={(e) => onChange(e)}
            value={description}
            name="description"
            rows="3"
            cols="50"
            // required
          ></textarea>
          <Alert param="description" />
        </div>

        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  clearAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { addPost, clearAlerts })(PostForm);
