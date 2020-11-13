import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditEducation from "../forms/EditEducation";
import Modal from "./Modal";
import { closeEditEduModal, openEditEduModal } from "../../actions/profile";

const EditEducationModal = ({
  profile: { editEduModal, tempEducationId },
  openEditEduModal,
  closeEditEduModal,
}) => {
  return (
    <Fragment>
      <Modal
        openModal={openEditEduModal}
        modal={editEduModal}
        closeModal={closeEditEduModal}
        width="70">
        <EditEducation
          educationId={tempEducationId}
          closeEditEduModal={closeEditEduModal}
        />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

EditEducationModal.propTypes = {
  openEditEduModal: PropTypes.func.isRequired,
  closeEditEduModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditEduModal,
  closeEditEduModal,
})(EditEducationModal);
