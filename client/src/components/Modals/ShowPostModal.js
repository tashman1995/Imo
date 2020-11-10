import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import AddExperience from "../forms/AddExperience";
import Modal from "./Modal";
import { closeAddExpModal, openAddExpModal } from "../../actions/modal";

const AddExperienceModal = ({
  modal: { addExpModal },
  openAddExpModal,
  closeAddExpModal,
}) => {
  return (
    <Fragment>
      <Modal
        openModal={openAddExpModal}
        modal={addExpModal}
        closeModal={closeAddExpModal}>
        <AddExperience closeAddExpModal={closeAddExpModal} />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

AddExperienceModal.propTypes = {
  openAddExpModal: PropTypes.func.isRequired,
  closeAddExpModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openAddExpModal,
  closeAddExpModal,
})(AddExperienceModal);
