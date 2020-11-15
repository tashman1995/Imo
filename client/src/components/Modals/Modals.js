import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPortal } from "react-dom";
import "react-spring-modal/dist/index.css";
import Modal from "./Modal";
import InnerModal from "./InnerModal";
import { animated, useTransition } from "react-spring";

//Components;
import Fade from "../layout/Fade";
import Scale from "../layout/Scale";
import AddEducation from "../forms/AddEducation";
import EditEducation from "../forms/EditEducation";
import AddExperience from "../forms/AddExperience";
import EditExperience from "../forms/EditExperience";
import CreateProfile from "../forms/CreateProfile";
import EditProfile from "../forms/EditProfile";
import EditSocialMedia from "../forms/EditSocialMedia";
import AddNewPost from "../forms/AddNewPost";
import ShowPost from "../posts/ShowPost";

// actions
import {
  closeAddEduModal,
  closeAddExpModal,
  closeEditEduModal,
  closeEditExpModal,
  closeAddProfileModal,
  closeEditProfileModal,
  closeEditSocialMediaModal,
} from "../../actions/profile";

import { closeShowPostModal, closeNewPostModal } from "../../actions/post";
import { useEffect } from "react";
import { useState } from "react";

const Modals = ({
  profile: {
    addEduModal,
    addExpModal,
    editEduModal,
    editExpModal,
    addProfileModal,
    editProfileModal,
    editSocialMediaModal,
    tempEducationId,
    tempExperienceId,
  },
  post: { addNewPostModal, showPostModal },
  closeAddEduModal,
  closeAddExpModal,
  closeEditEduModal,
  closeEditExpModal,
  closeNewPostModal,
  closeShowPostModal,
  closeAddProfileModal,
  closeEditProfileModal,
  closeEditSocialMediaModal,
}) => {
  // MODAL FADE TRANSITIONS
  const transitionConfig1 = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 400,
    },
  };

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const modals = [
      addEduModal,
      addExpModal,
      editEduModal,
      editExpModal,
      addProfileModal,
      editProfileModal,
      editSocialMediaModal,
      tempEducationId,
      tempExperienceId,
      addNewPostModal,
      showPostModal,
    ];

    setModalVisible(modals.some((modal) => modal === true));
  }, [
    addEduModal,
    addExpModal,
    editEduModal,
    editExpModal,
    addProfileModal,
    editProfileModal,
    editSocialMediaModal,
    tempEducationId,
    tempExperienceId,
    addNewPostModal,
    showPostModal,
  ]);

  const fade = useTransition(modalVisible, null, transitionConfig1);
 
  return createPortal(
    <Fragment>
      {fade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              // ref={internalElement}
              className="modal"
              key={key}
              style={props}>
              {/* ADD EDUCATION */}
              <Scale trigger={addEduModal}>
                <InnerModal
                  width="70"
                  modal={addEduModal}
                  closeModal={closeAddEduModal}>
                  <AddEducation />
                </InnerModal>
              </Scale>
              {/* EDIT EDUCATION */}
              <Scale trigger={editEduModal}>
                <InnerModal
                  width="70"
                  modal={editEduModal}
                  closeModal={closeEditEduModal}>
                  <EditEducation educationId={tempEducationId} />
                </InnerModal>
              </Scale>
              {/* ADD EXPERIENCE */}
              <Scale trigger={addExpModal}>
                <InnerModal
                  width="70"
                  modal={addExpModal}
                  closeModal={closeAddExpModal}>
                  <AddExperience />
                </InnerModal>
              </Scale>
              {/* EDIT EXPERIENCE */}
              <Scale trigger={editExpModal}>
                <InnerModal
                  width="70"
                  modal={editExpModal}
                  closeModal={closeEditExpModal}>
                  <EditExperience experienceId={tempExperienceId} />
                </InnerModal>
              </Scale>

              {/* ADD PROFILE */}
              <Scale trigger={addProfileModal}>
                <InnerModal
                  width="70"
                  modal={addProfileModal}
                  closeModal={closeAddProfileModal}>
                  <CreateProfile />
                </InnerModal>
              </Scale>

              {/* EDIT PROFILE */}
              <Scale trigger={editProfileModal}>
                <InnerModal
                  width="70"
                  modal={editProfileModal}
                  closeModal={closeEditProfileModal}>
                  <EditProfile />
                </InnerModal>
              </Scale>

              {/* EDIT SOCIAL MEDIA */}
              <Scale trigger={editSocialMediaModal}>
                <InnerModal
                  width="70"
                  modal={editSocialMediaModal}
                  closeModal={closeEditSocialMediaModal}>
                  <EditSocialMedia />
                </InnerModal>
              </Scale>

              {/* NEW POST MODAL */}
              <Scale trigger={addNewPostModal}>
                <InnerModal
                  width="80"
                  modal={addNewPostModal}
                  closeModal={closeNewPostModal}>
                  <AddNewPost closeNewPostModal={closeNewPostModal} />;
                </InnerModal>
              </Scale>

              {/* SHOW POST */}
              <Scale trigger={showPostModal}>
                <InnerModal
                  width="95"
                  maxWidth="150"
                  modal={showPostModal}
                  closeModal={closeShowPostModal}>
                  <ShowPost />
                </InnerModal>
              </Scale>
            </animated.div>
          )
      )}
    </Fragment>,
    document.getElementById("modal_root")
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

Modals.propTypes = {
  closeAddEduModal: PropTypes.func.isRequired,
  closeAddExpModal: PropTypes.func.isRequired,
  closeEditEduModal: PropTypes.func.isRequired,
  closeEditExpModal: PropTypes.func.isRequired,
  closeAddProfileModal: PropTypes.func.isRequired,
  closeEditProfileModal: PropTypes.func.isRequired,
  closeShowPostModal: PropTypes.func.isRequired,
  closeNewPostModal: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  closeAddEduModal,
  closeAddExpModal,
  closeEditEduModal,
  closeEditExpModal,
  closeAddProfileModal,
  closeEditProfileModal,
  closeEditSocialMediaModal,
  closeShowPostModal,
  closeNewPostModal,
})(Modals);
