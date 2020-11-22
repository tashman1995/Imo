import React, { useState, useEffect, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, openShowPostModal } from "../../actions/post";
import Navbar from "../../components/layout/Navbar";
import PostsHeader from "./PostsHeader";
import useMedia from "../../utils/useMedia";
import PostsGrid from "./PostsGrid";
import PopoutImage from './PopoutImage'

import "./Posts.scss";

const Posts = ({ getPosts, openShowPostModal, auth, post: { posts, loading } }) => {
  // Initialise State
  const [columns, setColumns] = useState(5);
  const [orderedPosts, setOrderedPosts] = useState(posts);
  useEffect(() => {
    setOrderedPosts(posts);
  }, [posts]);

  console.log('posts rerendered')

  const initialColumns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1000px)",
      "(min-width: 600px)",
      "(min-width: 450px)",
    ],
    [5, 4, 3, 2],
    1
  );

  useEffect(() => {
    setColumns(initialColumns);
  }, []);
  //GET POSTS
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // SHUFFLE ITEMS
  const shuffle = (array) => {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };
  const handleShuffle = () => {
    const shuffledArray = shuffle(orderedPosts);
    setOrderedPosts([...shuffledArray]);
  };

  // HANDLE IMAGE POPUPS
  const [popoutImage, setPopoutImage] = useState("");
  

  return (
    <Fragment>
      <PopoutImage popoutImage={popoutImage} />
      <Navbar stage="2" />
      <Fragment>
        <div className="posts">
          <div className="u-grid">
            <PostsHeader
              columns={columns}
              isAuthenticated={auth.isAuthenticated}
              setColumns={setColumns}
              shuffle={handleShuffle}
            />

            <PostsGrid
              posts={orderedPosts}
              setPopoutImage={setPopoutImage}
              columns={columns}
              openShowPostModal={openShowPostModal}
            />
          </div>

          {/* <Grid
            className="posts__grid"
            columnWidth={1080 / scaleFactor}
            columns={columns}
            scaleFactor={scaleFactor}>
            {orderedPosts.map((post) => {
              return (
                <li
                  onMouseOver={() => {
                    setPopoutImage(post.image[0]);
                  }}
                  onMouseLeave={() => {
                    setPopoutImage("");
                  }}
                  key={post._id}
                  className="posts__item"
                  itemHeight={post.height / scaleFactor}
                  style={{
                    width: 1080 / scaleFactor,
                    height: post.height / scaleFactor,
                  }}>
                  <PostElement post={post} />
                </li>
              );
            })}
          </Grid> */}
        </div>
        {/* )} */}
      </Fragment>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  openShowPostModal: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, openShowPostModal })(Posts);
