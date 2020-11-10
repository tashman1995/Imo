import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import CreateProfile from "../forms/CreateProfile";
import Modal from "./Modal";
import { closeAddProfileModal, openAddProfileModal } from "../../actions/modal";

const AddProfileModal = ({
  modal: { addProfileModal },
  openAddProfileModal,
  closeAddProfileModal,
}) => {
  return (
    <Fragment>
      <Modal
        openModal={openAddProfileModal}
        modal={addProfileModal}
        closeModal={closeAddProfileModal}
        width="70">
        <CreateProfile closeAddProfileModal={closeAddProfileModal} />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

AddProfileModal.propTypes = {
  openAddProfileModal: PropTypes.func.isRequired,
  closeAddProfileModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openAddProfileModal,
  closeAddProfileModal,
})(AddProfileModal);
