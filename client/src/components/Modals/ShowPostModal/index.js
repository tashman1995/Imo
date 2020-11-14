import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";

import Modal from "../Modal";
import ShowPost from '../../posts/ShowPost/index'
import {
  closeShowPostModal,
} from "../../../actions/post";



const ShowPostModal = ({
  post: { showPostModal },
  closeShowPostModal,
}) => {


  return (
    <Fragment>
      <Modal
        modal={showPostModal}
        closeModal={closeShowPostModal}
        width="95"
        maxWidth="150">
        <ShowPost />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

ShowPostModal.propTypes = {
  closeShowPostModal: PropTypes.func.isRequired, 
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  closeShowPostModal,
})(ShowPostModal);
