import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
  openAddEduModal,
  openAddExpModal,
  openAddProfileModal,
  openEditProfileModal,
  openEditSocialMediaModal,
} from "../../actions/profile";
import Spinner from "../reausable/Loading";
import Navbar from "../layout/Navbar";
import Experience from "./Experience";
import Education from "./Education";
import UserInfo from "./UserInfo";

import "./Dashboard.scss";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  openAddEduModal,
  openAddExpModal,
  openAddProfileModal,
}) => {

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar stage="2" />
      <Fragment>
        {/*  */}
        {/* PAGE CONTENT */}
        {/*  */}

        <div className="u-grid dash">
          {profile !== null ? (
            ////////////////////////////////////
            // User has a profile
            ////////////////////////////////////

            <Fragment>
              <div className="dash__left">
                <UserInfo user={user} />
              </div>

              <div className="dash__right">
                <Education
                  education={profile.education}
                  openAddEduModal={openAddEduModal}
                />
                <Experience
                  experience={profile.experience}
                  openAddExpModal={openAddExpModal}
                />
              </div>
            </Fragment>
          ) : (
            ////////////////////////////////////
            // No Profile Present
            ////////////////////////////////////

            <Fragment>
              <div className="dash__left">
                <UserInfo
                  user={user}
                  openAddProfileModal={openAddProfileModal}
                />
              </div>

              <div className="dash__right"></div>
            </Fragment>
          )}
        </div>
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  openAddEduModal,
  openAddExpModal,
  openAddProfileModal,
  openEditProfileModal,
  openEditSocialMediaModal,
})(Dashboard);
