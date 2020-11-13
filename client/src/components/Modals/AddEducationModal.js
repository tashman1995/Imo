import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import AddEducation from "../forms/AddEducation";
import Modal from "./Modal";
import { closeAddEduModal, openAddEduModal } from "../../actions/profile";
import { Fragment } from "react";

const AddEducationModal = ({
  profile: { addEduModal },
  openAddEduModal,
  closeAddEduModal,
}) => {
  return (
    <Fragment>
      {/* {addEduModal && ( */}
      <Modal
        openModal={openAddEduModal}
        modal={addEduModal}
        closeModal={closeAddEduModal}>
        <AddEducation closeAddEduModal={closeAddEduModal} />
      </Modal>
      {/* )} */}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

AddEducationModal.propTypes = {
  openAddEduModal: PropTypes.func.isRequired,
  closeAddEduModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openAddEduModal,
  closeAddEduModal,
})(AddEducationModal);
