import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import {
  openAddEduModal,
  closeAddEduModal,
  openAddExpModal,
  closeAddExpModal,
  openAddProfileModal,
  closeAddProfileModal,
  openEditProfileModal,
  closeEditProfileModal,
  openEditSocialMediaModal,
  closeEditSocialMediaModal,
} from "../../actions/modal";
import Spinner from "../reausable/Loading";
import Navbar from "../layout/Navbar";
import Experience from "./Experience";
import Education from "./Education";
import UserInfo from "./UserInfo";
import { animated, useTransition } from "react-spring";
import AddEducation from "../profile-form/AddEducation";
import AddExperience from "../profile-form/AddExperience";
import CreateProfile from "../profile-form/CreateProfile";
import EditProfile from "../profile-form/EditProfile";
import EditSocialMedia from "../profile-form/EditSocialMedia";
import { CenterModal } from "react-spring-modal";
import "react-spring-modal/dist/index.css";
import "./Dashboard.scss";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  modal: {
    addEduModal,
    addExpModal,
    addProfileModal,
    editProfileModal,
    editSocialMediaModal,
  },
  openAddEduModal,
  closeAddEduModal,
  openAddExpModal,
  closeAddExpModal,
  openAddProfileModal,
  closeAddProfileModal,
  openEditProfileModal,
  closeEditProfileModal,
  openEditSocialMediaModal,
  closeEditSocialMediaModal,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const transitionConfig = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  };

  const fadeEducation = useTransition(openAddEduModal, null, transitionConfig);
  const fadeExperience = useTransition(openAddExpModal, null, transitionConfig);
  const fadeProfile = useTransition(
    openAddProfileModal,
    null,
    transitionConfig
  );

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar stage="2" />
      <Fragment>
        {/*  */}
        {/* MODALS */}
        {/*  */}

        {/* Add Profile Modal */}
        <CenterModal
          isOpen={addProfileModal}
          onRequestClose={closeAddProfileModal}>
          {fadeProfile.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <CreateProfile closeAddProfileModal={closeAddProfileModal} />
                </animated.div>
              )
          )}
        </CenterModal>

        {/* Add Education Modal */}
        <CenterModal isOpen={addEduModal} onRequestClose={closeAddEduModal}>
          {fadeEducation.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <AddEducation closeAddEduModal={closeAddEduModal} />
                </animated.div>
              )
          )}
        </CenterModal>

        {/* Add Experience Modal */}
        <CenterModal isOpen={addExpModal} onRequestClose={closeAddExpModal}>
          {fadeExperience.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <AddExperience closeAddExpModal={closeAddExpModal} />
                </animated.div>
              )
          )}
        </CenterModal>

        {/* Edit Profile Modal */}
        <CenterModal
          isOpen={editProfileModal}
          onRequestClose={closeEditProfileModal}>
          {fadeProfile.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <EditProfile closeEditProfileModal={closeEditProfileModal} />
                </animated.div>
              )
          )}
        </CenterModal>

        {/* Edit Social Media Modal */}
        <CenterModal
          isOpen={editSocialMediaModal}
          onRequestClose={closeEditSocialMediaModal}>
          {fadeProfile.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <EditSocialMedia
                    closeEditSocialMediaModal={closeEditSocialMediaModal}
                  />
                </animated.div>
              )
          )}
        </CenterModal>

        {/*  */}
        {/* PAGE CONTENT */}
        {/*  */}

        <div className="u-grid dash">
          {profile !== null ? (
            ////////////////////////////////////
            // User has a profile
            ////////////////////////////////////

            <Fragment>
              <UserInfo
                user={user}
              />
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
              {/* Add Profile Modal */}
              <CenterModal
                isOpen={addProfileModal}
                onRequestClose={closeAddProfileModal}>
                {fadeProfile.map(
                  ({ item, key, props }) =>
                    item && (
                      <animated.div key={key} style={props}>
                        <CreateProfile
                          closeAddProfileModal={closeAddProfileModal}
                        />
                      </animated.div>
                    )
                )}
              </CenterModal>
              <UserInfo user={user} openAddProfileModal={openAddProfileModal} />

              <div className="dash__right">
       
              </div>
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
  openAddEduModal: PropTypes.func.isRequired,
  closeAddEduModal: PropTypes.func.isRequired,
  openAddExpModal: PropTypes.func.isRequired,
  closeAddExpModal: PropTypes.func.isRequired,
  openAddProfileModal: PropTypes.func.isRequired,
  closeAddProfileModal: PropTypes.func.isRequired,
  openEditProfileModal: PropTypes.func.isRequired,
  closeEditProfileModal: PropTypes.func.isRequired,
  openEditSocialMediaModal: PropTypes.func.isRequired,
  closeEditSocialMediaModal: PropTypes.func.isRequired,
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
  closeAddEduModal,
  openAddExpModal,
  closeAddExpModal,
  openAddProfileModal,
  closeAddProfileModal,
  openEditProfileModal,
  closeEditProfileModal,
  openEditSocialMediaModal,
  closeEditSocialMediaModal,
})(Dashboard);
