import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import AddNewPost from "../forms/AddNewPost";
import Modal from "./Modal";
import { closeNewPostModal, openNewPostModal } from "../../actions/post";

const AddNewPostModal = ({
  post: { addNewPostModal },
  openNewPostModal,
  closeNewPostModal,
}) => {
  return (
    <Fragment>
      <Modal
        openModal={openNewPostModal}
        modal={addNewPostModal}
        closeModal={closeNewPostModal}
        width={80}>
        <AddNewPost closeNewPostModal={closeNewPostModal} />;
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

AddNewPostModal.propTypes = {
  openNewPostModal: PropTypes.func.isRequired,
  closeNewPostModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openNewPostModal,
  closeNewPostModal,
})(AddNewPostModal);
