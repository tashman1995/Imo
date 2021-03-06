import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../reausable/Loading";
import Navbar from "../layout/Navbar";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileBio from "./ProfileBio";

import "./Profile.scss";

const Profile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
  alerts,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id, loading]);

  //Check Authentication and if profile is owned by user
  const isProfile =
    profile !== null &&
    auth.isAuthenticated &&
    auth.loading === false &&
    auth.user._id === profile.user._id
      ? true
      : false;

  const history = useHistory();

  // Handle Alerts to check for no profile found
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    alerts.forEach((alert) =>
      alert.msg === "Profile not found" ? setNotFound(true) : setNotFound(false)
    );
  });

  return (
    <Fragment>
      {profile === null && notFound === false ? (
        <Spinner />
      ) : (
        <Fragment>
          <Navbar />
          {notFound ? (
            <div className="u-grid profile">
              <div className="profile__not-found">
                <h1 className="heading-primary u-margin-bottom-small">
                  Profile not found
                </h1>
                <button
                  className="btn btn--table"
                  onClick={() => {
                    history.push("/profiles");
                  }}>
                  View All Profiles
                </button>
              </div>
            </div>
          ) : (
            <div className="u-grid profile">
              <div className="profile__top">
                <ProfileTop profile={profile} profileOwned={isProfile} />
              </div>
              {profile && profile.bio && (
                <div className="profile__experience">
                  <ProfileBio profile={profile} />
                </div>
              )}

              {profile && profile.experience.length > 0 && (
                <div className="profile__experience">
                  <ProfileExperience profile={profile} />
                </div>
              )}
              {profile && profile.education.length > 0 && (
                <div className="profile__experience">
                  <ProfileEducation profile={profile} />
                </div>
              )}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  alerts: state.alert,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
