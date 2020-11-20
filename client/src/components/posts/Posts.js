import React, { useState, useEffect, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Navbar from "../../components/layout/Navbar";
import PostsHeader from "./PostsHeader";
import useMedia from "../../utils/useMedia";
import PostsGrid from "./PostsGrid";

import "./Posts.scss";

const Posts = ({ getPosts, auth, post: { posts, loading } }) => {
  // Initialise State
  const [scaleFactor, setScaleFactor] = useState(3.5);
  const [columns, setColumns] = useState(5);
  const [scaleConstant, setConstant] = useState(0.001);
  const [orderedPosts, setOrderedPosts] = useState(posts);

  // GRID COLUMNS SCALING CONSTANTS
  const constants = {
    1: 0.00075,
    2: 0.0004,
    3: 0.000238,
    4: 0.000168,
    5: 0.000125,
  };

  //GET POSTS
  useEffect(() => {
    getPosts();
    // manageScaling();
  }, [getPosts]);

  // useEffect(() => {
  //   setOrderedPosts(posts);
  //   manageScaling();
  // }, [posts]);

  // useEffect(() => {
  //   manageScaling();
  // }, [columns]);

  // // MANAGE SCALING
  // const manageScaling = () => {
  //   console.log("manages scaling");

  //   if (window.innerWidth <= 1800 && window.innerWidth >= 900) {
  //     setConstant(constants[columns]);
  //     // Set scale factor
  //     setScaleFactor(1 / (window.innerWidth * scaleConstant));
  //   } else if (window.innerWidth <= 900 && window.innerWidth >= 600) {
  //     console.log("ipad port");
  //     setConstant(constants[columns]);
  //     // Set scale factor
  //     setScaleFactor(1 / (window.innerWidth * scaleConstant * 0.8));
  //   } else if (window.innerWidth <= 600) {
  //     console.log("under 600");
  //     setConstant(constants[columns]);
  //     // Set scale factor
  //     setScaleFactor(1 / (window.innerWidth * 0.00072));
  //   } else if (window.innerWidth >= 1800) {
  //     // Set scale factor

  //     setScaleFactor(columns > 3 ? 0.82 * columns : 2);
  //   }
  // };

  // // ON RERENDER
  // useEffect(() => {
  //   // Set shown post array to equal posts
  //   window.addEventListener("resize", () => manageScaling());
  //   return () => {
  //     window.removeEventListener("resize", () => manageScaling());
  //   };
  // }, []);

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { x, y } = mousePosition;
  // Mouse over event listeners
  useEffect(() => {
    window.addEventListener("mousemove", (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY })
    );

    return window.removeEventListener("mousemove", (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY })
    );
  }, []);
  // Image size measuring
  const popoutImageRef = useRef();
  const popoutImageRefCurrent = popoutImageRef.current;

  const height = popoutImageRefCurrent
    ? popoutImageRefCurrent.clientHeight
    : 458;
  const width = popoutImageRefCurrent ? popoutImageRefCurrent.clientWidth : 458;

  return (
    <Fragment>
      {popoutImage !== "" && (
        <div className="popout-image">
          <img
            className="popout-image__element"
            ref={popoutImageRef}
            src={popoutImage}
            alt=""
            style={{
              transform: `translate(${
                x < window.innerWidth / 2 ? x : x - width
              }px,${y - height / 2}px)`,
              height: `${height / width > 1 ? "80%" : "auto"}`,
              width: `${height / width > 1 ? "auto" : "50%"}`,
            }}
          />
        </div>
      )}
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

            <PostsGrid posts={posts} columns={columns}/>
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
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
