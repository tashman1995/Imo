import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import PostForm from "../posts/PostForm";
import Modal from "./Modal";
import { closeAddNewPostModal, openAddNewPostModal } from "../../actions/modal";

const AddNewPostModal = ({
  modal: { addNewPostModal },
  openAddNewPostModal,
  closeAddNewPostModal,
}) => {
  return (
    <Modal
      openModal={openAddNewPostModal}
      modal={addNewPostModal}
      closeModal={closeAddNewPostModal}>
      <PostForm closeAddNewPostModal={closeAddNewPostModal} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

AddNewPostModal.propTypes = {
  openAddNewPostModal: PropTypes.func.isRequired,
  closeAddNewPostModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openAddNewPostModal,
  closeAddNewPostModal,
})(AddNewPostModal);
