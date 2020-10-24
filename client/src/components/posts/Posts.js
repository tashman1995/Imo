import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../reausable/Loading";
import PostItem from "./PostItem.js";
import PostForm from "./PostForm.js";
import { getPosts } from "../../actions/post";

const Posts = ({getPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getPosts();
    },[getPosts])

  return loading? <Spinner/> : (
      <Fragment>
          <h1 className="heading-primary">Posts</h1>
          <PostForm/>
          <div className="posts">
              {posts.map(post => (
                  <PostItem key={post._id} post={post} />
              ))}
          </div>
      </Fragment>
  );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
