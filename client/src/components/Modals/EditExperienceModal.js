import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditExperience from "../profile-form/EditExperience";
import Modal from "./Modal";
import {
  closeEditExpModal,
  openEditExpModal,
} from "../../actions/modal";

const EditExperienceModal = ({
  modal: { editExpModal, tempExperienceId },
  openEditExpModal,
  closeEditExpModal,
}) => {
  return (
    <Modal
      openModal={openEditExpModal}
      modal={editExpModal}
      closeModal={closeEditExpModal}>
      <EditExperience experienceId={tempExperienceId} closeEditExpModal={closeEditExpModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

EditExperienceModal.propTypes = {
  openEditExpModal: PropTypes.func.isRequired,
  closeEditExpModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditExpModal,
  closeEditExpModal,
})(EditExperienceModal);
