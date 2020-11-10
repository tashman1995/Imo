import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import EditSocialMedia from "../forms/EditSocialMedia";
import Modal from "./Modal";
import {
  closeEditSocialMediaModal,
  openEditSocialMediaModal,
} from "../../actions/modal";

const EditSocialMediaModal = ({
  modal: { editSocialMediaModal },
  openEditSocialMediaModal,
  closeEditSocialMediaModal,
}) => {
  return (
    <Fragment>
      <Modal
        openModal={openEditSocialMediaModal}
        modal={editSocialMediaModal}
        closeModal={closeEditSocialMediaModal}
        width="70">
        <EditSocialMedia
          closeEditSocialMediaModal={closeEditSocialMediaModal}
        />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

EditSocialMediaModal.propTypes = {
  openEditSocialMediaModal: PropTypes.func.isRequired,
  closeEditSocialMediaModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openEditSocialMediaModal,
  closeEditSocialMediaModal,
})(EditSocialMediaModal);
