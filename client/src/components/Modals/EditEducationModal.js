import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditEducation from "../Education-form/EditEducation";
import Modal from "./Modal";
import {
  closeEditEducationModal,
  openEditEducationModal,
} from "../../actions/modal";

const EditEducationModal = ({
  modal: { editEducationModal },
  openEditEducationModal,
  closeEditEducationModal,
}) => {
  return (
    <Modal
      openModal={openEditEducationModal}
      modal={editEducationModal}
      closeModal={closeEditEducationModal}>
      <EditEducation closeEditEducationModal={closeEditEducationModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

EditEducationModal.propTypes = {
  openEditEducationModal: PropTypes.func.isRequired,
  closeEditEducationModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditEducationModal,
  closeEditEducationModal,
})(EditEducationModal);
