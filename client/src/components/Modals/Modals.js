import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPortal } from "react-dom";
import "react-spring-modal/dist/index.css";
import InnerModal from "./InnerModal";
import { animated, useTransition } from "react-spring";

//Components;
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
 

  const [modalVisible, setModalVisible] = useState(false);
  const modals = [
    {
      modal: addProfileModal,
      closeFunc: closeAddProfileModal,
    },
    {
      modal: editProfileModal,
      closeFunc: closeEditProfileModal,
    },
    {
      modal: addEduModal,
      closeFunc: closeAddEduModal,
    },
    {
      modal: editEduModal,
      closeFunc: closeEditEduModal,
    },
    {
      modal: addExpModal,
      closeFunc: closeAddExpModal,
    },
    {
      modal: editExpModal,
      closeFunc: closeEditExpModal,
    },
    {
      modal: editSocialMediaModal,
      closeFunc: closeEditSocialMediaModal,
    },
    {
      modal: showPostModal,
      closeFunc: closeShowPostModal,
    },
    {
      modal: addNewPostModal,
      closeFunc: closeNewPostModal,
    },
  ];

  const closeOpenModal = () => {
    modals.forEach((modal) => {
      if (modal.modal) {
        modal.closeFunc();
      }
    });
  };

   useEffect(() => {
     modalVisible && (document.body.style.overflowY = "hidden");
     !modalVisible && (document.body.style.overflowY = "auto");
   }, [modalVisible]);

  useEffect(() => {
    setModalVisible(modals.some((modal) => modal.modal === true));
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
    modals
  ]);
 const transitionConfig1 = {
   from: { opacity: 0 },
   enter: { opacity: 1 },
   leave: { opacity: 0 },
   config: {
     tension: 400,
   },
 };
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
              <Scale trigger={modalVisible}>
                <InnerModal closeModal={closeOpenModal}>
                  {addEduModal && <AddEducation />}
                  {editEduModal && (
                    <EditEducation educationId={tempEducationId} />
                  )}
                  {addExpModal && <AddExperience />}
                  {editExpModal && (
                    <EditExperience experienceId={tempExperienceId} />
                  )}
                  {addProfileModal && <CreateProfile />}
                  {editProfileModal && <EditProfile />}
                  {editSocialMediaModal && <EditSocialMedia />}
                  {addNewPostModal && <AddNewPost />}
                  {showPostModal && <ShowPost />}
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
