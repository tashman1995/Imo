import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditProfile from "../forms/EditProfile";
import Modal from "./Modal";
import {
  closeEditProfileModal,
  openEditProfileModal,
} from "../../actions/profile";

const EditProfileModal = ({
  profile: { editProfileModal },
  openEditProfileModal,
  closeEditProfileModal,
}) => {
  return (
    <Fragment>
      <Modal
        openModal={openEditProfileModal}
        modal={editProfileModal}
        closeModal={closeEditProfileModal}
        width="70">
        <EditProfile closeEditProfileModal={closeEditProfileModal} />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

EditProfileModal.propTypes = {
  openEditProfileModal: PropTypes.func.isRequired,
  closeEditProfileModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditProfileModal,
  closeEditProfileModal,
})(EditProfileModal);
