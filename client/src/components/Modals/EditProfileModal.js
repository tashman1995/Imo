import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditProfile from "../forms/EditProfile";
import Modal from "./Modal";
import {
  closeEditProfileModal,
  openEditProfileModal,
} from "../../actions/modal";
import { useEffect } from "react";

const EditProfileModal = ({
  modal: { editProfileModal },
  openEditProfileModal,
  closeEditProfileModal,
}) => {
  useEffect(() => {
    console.log("edit profile rendered");
  }, []);

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
