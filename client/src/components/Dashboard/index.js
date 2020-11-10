import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import {
  openAddEduModal,
  openAddExpModal,
  openAddProfileModal,
  openEditProfileModal,
  openEditSocialMediaModal,
} from "../../actions/modal";
import Spinner from "../reausable/Loading";
import Navbar from "../layout/Navbar";
import Experience from "./Experience";
import Education from "./Education";
import UserInfo from "./UserInfo";


import "react-spring-modal/dist/index.css";
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
              <UserInfo user={user} />
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
              <UserInfo user={user} openAddProfileModal={openAddProfileModal} />

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
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  modal: state.modal,
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
