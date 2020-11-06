import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditProfile from "../profile-form/EditProfile";
import Modal from "./Modal";
import {
  closeEditProfileModal,
  openEditProfileModal,
} from "../../actions/modal";

const EditProfileModal = ({
  modal: { editProfileModal },
  openEditProfileModal,
  closeEditProfileModal,
}) => {
  return (
    <Modal
      openModal={openEditProfileModal}
      modal={editProfileModal}
      closeModal={closeEditProfileModal}>
      <EditProfile closeEditProfileModal={closeEditProfileModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

EditProfileModal.propTypes = {
  openEditProfileModal: PropTypes.func.isRequired,
  closeEditProfileModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditProfileModal,
  closeEditProfileModal,
})(EditProfileModal);
