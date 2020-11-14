import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import Modal from "./Modal";

//Components;
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
    tempExperienceId
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
  

  return (
    <Fragment>
      {/* ADD EDUCATION */}
      {addEduModal && (
        <Modal modal={addEduModal} closeModal={closeAddEduModal}>
          <AddEducation closeAddEduModal={closeAddEduModal} />
        </Modal>
      )}

      {/* EDIT EDUCATION */}
      {editEduModal && (
        <Modal modal={editEduModal} closeModal={closeEditEduModal} width="70">
          <EditEducation
            educationId={tempEducationId}
            closeEditEduModal={closeEditEduModal}
          />
        </Modal>
      )}

      {/* ADD EXPERIENCE */}
      {addExpModal && (
        <Modal modal={addExpModal} closeModal={closeAddExpModal}>
          <AddExperience closeAddExpModal={closeAddExpModal} />
        </Modal>
      )}

      {/* EDIT EXPERIENCE */}
      {editExpModal && (
        <Modal modal={editExpModal} closeModal={closeEditExpModal} width="70">
          <EditExperience
            experienceId={tempExperienceId}
            closeEditExpModal={closeEditExpModal}
          />
        </Modal>
      )}

      {/* ADD PROFILE */}
      {addProfileModal && (
        <Modal
          modal={addProfileModal}
          closeModal={closeAddProfileModal}
          width="70">
          <CreateProfile closeAddProfileModal={closeAddProfileModal} />
        </Modal>
      )}

      {/* EDIT PROFILE */}
      {editProfileModal && (
        <Modal
          modal={editProfileModal}
          closeModal={closeEditProfileModal}
          width="70">
          <EditProfile closeEditProfileModal={closeEditProfileModal} />
        </Modal>
      )}

      {/* EDIT SOCIAL MEDIA */}
      {editSocialMediaModal && (
        <Modal
          modal={editSocialMediaModal}
          closeModal={closeEditSocialMediaModal}
          width="70">
          <EditSocialMedia
            closeEditSocialMediaModal={closeEditSocialMediaModal}
          />
        </Modal>
      )}

      {/* NEW POST MODAL */}
      {addNewPostModal && (
        <Modal
          modal={addNewPostModal}
          closeModal={closeNewPostModal}
          width={80}>
          <AddNewPost closeNewPostModal={closeNewPostModal} />;
        </Modal>
      )}

      {/* SHOW POST */}
      {showPostModal && (
        <Modal
          modal={showPostModal}
          closeModal={closeShowPostModal}
          width="95"
          maxWidth="150">
          <ShowPost />
        </Modal>
      )}
    </Fragment>
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
