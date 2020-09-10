import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
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

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      subjects: loading || !profile.subjects ? "" : profile.subjects.join(','),
      bio: loading || !profile.bio ? "" : profile.bio,
      eqipment: loading || !profile.eqipment ? "" : profile.eqipment.join(','),
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      linkedin: loading || !profile.social ? "" : profile.social.eqipment,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      behance: loading || !profile.social ? "" : profile.social.behance,
    });
  }, [loading]);

  const {
    website,
    location,
    status,
    subjects,
    bio,
    equipment,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    behance,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Amateur">Amateur</option>
            <option value="Experienced Amateur">Experienced Amateur</option>
            <option value="Part Time Professional">
              Part-time Professional
            </option>
            <option value="Full-time Professional">
              Full-time Professional
            </option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Link us to your porfolio website.</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Tell us a bit about your photography journey so far
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Subjects"
            name="subjects"
            value={subjects}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Let us know what you like to shoot, please use comma separated
            values (eg. Panasonic GH5, Panasonic 12-35 mkii, Nissin i40 Flash)
          </small>
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Equipment"
            name="equipment"
            value={equipment}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Let us know what you like to shoot, please use comma separated
            values (eg. macro, wildlife, portrait, travel)
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-behance fa-2x"></i>
              <input
                type="text"
                placeholder="Behance URL"
                name="behance"
                value={behance}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
