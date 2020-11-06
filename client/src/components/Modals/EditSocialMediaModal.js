import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditSocialMedia from "../profile-form/EditSocialMedia";
import Modal from "./Modal";
import { closeEditSocialMediaModal, openEditSocialMediaModal } from "../../actions/modal";

const EditSocialMediaModal = ({
  modal: { editSocialMediaModal },
  openEditSocialMediaModal,
  closeEditSocialMediaModal,
}) => {
  return (
    <Modal
      openModal={openEditSocialMediaModal}
      modal={editSocialMediaModal}
      closeModal={closeEditSocialMediaModal}>
      <EditSocialMedia closeEditSocialMediaModal={closeEditSocialMediaModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

EditSocialMediaModal.propTypes = {
  openEditSocialMediaModal: PropTypes.func.isRequired,
  closeEditSocialMediaModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditSocialMediaModal,
  closeEditSocialMediaModal,
})(EditSocialMediaModal);
