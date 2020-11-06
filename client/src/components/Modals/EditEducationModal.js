import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditEducation from "../profile-form/EditEducation";
import Modal from "./Modal";
import {
  closeEditEduModal,
  openEditEduModal,
} from "../../actions/modal";

const EditEducationModal = ({
  modal: { editEduModal, tempEducationId },
  openEditEduModal,
  closeEditEduModal,
}) => {
  return (
    <Modal
      openModal={openEditEduModal}
      modal={editEduModal}
      closeModal={closeEditEduModal}>
      <EditEducation educationId={tempEducationId} closeEditEduModal={closeEditEduModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

EditEducationModal.propTypes = {
  openEditEduModal: PropTypes.func.isRequired,
  closeEditEduModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditEduModal,
  closeEditEduModal,
})(EditEducationModal);
