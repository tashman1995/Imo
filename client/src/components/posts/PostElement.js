import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getPost, openShowPostModal } from "../../actions/post";
import { connect } from "react-redux";

const PostElement = ({ post, getPost, openShowPostModal }) => {
  
  return (
    <Fragment>
      <div
        className="post"
        onClick={() => {
          openShowPostModal(post._id)
        }}
       >
        <img className="post__image" src={post.image[0]} alt="" />
        <div className="post__cover"></div>
      </div>
  
    </Fragment>
  );
};

PostElement.propTypes = {
  getPost: PropTypes.func.isRequired,
  openShowPostModal: PropTypes.func.isRequired,
};

export default connect(null, {getPost, openShowPostModal})(PostElement);
