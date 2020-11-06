import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import AddExperience from "../profile-form/AddExperience";
import Modal from "./Modal";
import {
  closeAddExperienceModal,
  openAddExperienceModal,
} from "../../actions/modal";

const AddExperienceModal = ({
  modal: { addExperienceModal },
  openAddExperienceModal,
  closeAddExperienceModal,
}) => {
  return (
    <Modal
      openModal={openAddExperienceModal}
      modal={addExperienceModal}
      closeModal={closeAddExperienceModal}>
      <AddExperience closeAddExperienceModal={closeAddExperienceModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

AddExperienceModal.propTypes = {
  openAddExperienceModal: PropTypes.func.isRequired,
  closeAddExperienceModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openAddExperienceModal,
  closeAddExperienceModal,
})(AddExperienceModal);
