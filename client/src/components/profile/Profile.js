import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../reausable/Loading";
import Navbar from "../layout/Navbar";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

import "./Profile.scss";

const Profile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  //Check Authentication and if profile is owned by user
  const isProfile =
    profile !== null &&
    auth.isAuthenticated &&
    auth.user._id === profile.user._id
      ? true
      : false;

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Navbar stage="2" />
          <div className="u-grid profile">
            <div className="profile__top">
              <ProfileTop profile={profile} profileOwned={isProfile} />
            </div>
            <div className="profile__experience">
              <ProfileExperience profile={profile}/>
            </div>
            <div className="profile__experience">
              <ProfileEducation profile={profile}/>
            </div>
           
          </div>
        </Fragment>
      )}
     
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
