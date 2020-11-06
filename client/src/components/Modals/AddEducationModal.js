import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import AddEducation from "../profile-form/AddEducation";
import Modal from "./Modal";
import { closeAddEduModal, openAddEduModal } from "../../actions/modal";

const AddEducationModal = ({
  modal: { addEduModal },
  openAddEduModal,
  closeAddEduModal,
}) => {
  return (
    <Modal
      openModal={openAddEduModal}
      modal={addEduModal}
      closeModal={closeAddEduModal}>
      <AddEducation closeAddEduModal={closeAddEduModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

AddEducationModal.propTypes = {
  openAddEduModal: PropTypes.func.isRequired,
  closeAddEduModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openAddEduModal,
  closeAddEduModal,
})(AddEducationModal);
