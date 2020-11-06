import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const PostElement = ({ post }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const element = useRef();



  return (
    <Fragment>
      <div
        ref={element}
        className="post"
       >
        <img className="post__image" src={post.image[0]} alt="" />
        <div className="post__cover"></div>
      </div>
  
    </Fragment>
  );
};

PostElement.propTypes = {};

export default PostElement;
