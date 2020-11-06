import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import AddEducation from "../profile-form/AddEducation";
import Modal from "./Modal";
import { closeAddEducationModal, openAddEducationModal } from "../../actions/modal";

const AddEducationModal = ({
  modal: { addEducationModal },
  openAddEducationModal,
  closeAddEducationModal,
}) => {
  return (
    <Modal
      openModal={openAddEducationModal}
      modal={addEducationModal}
      closeModal={closeAddEducationModal}>
      <AddEducation closeAddEducationModal={closeAddEducationModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

AddEducationModal.propTypes = {
  openAddEducationModal: PropTypes.func.isRequired,
  closeAddEducationModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openAddEducationModal,
  closeAddEducationModal,
})(AddEducationModal);
