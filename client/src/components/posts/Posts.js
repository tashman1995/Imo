import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Navbar from "../../components/layout/Navbar";
import PostsHeader from "./PostsHeader";
import Grid from "../layout/Grid";
import "./Posts.scss";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  // Initialise State
  const [scaleFactor, setScaleFactor] = useState(3.5);
  const [columns, setColumns] = useState(5);
  const [scaleConstant, setConstant] = useState(0.001);
  const [orderedPosts, setOrderedPosts] = useState(posts);
  // 2 columns 0.000270
  //3 columns 0.000238
  // 4 columns 0.000168
  // 5 columns 0.000145

  const constants = {
    1: 0.0004,
    2: 0.00027,
    3: 0.000238,
    4: 0.000168,
    5: 0.000125,
  };

  //GET POSTS
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // MANAGE SCALING
  const manageScaling = () => {
    console.log(window.innerWidth);

    if (window.innerWidth <= 1800) {
      if (window.innerWidth <= 900) {
        console.log("900 - 1800");
        setConstant(constants[columns]);
        // Set scale factor
        setScaleFactor(1 / (window.innerWidth * scaleConstant * .7));
        // Handle scale factor on  Window resiizing
        window.addEventListener("resize", () =>
          setScaleFactor(1 / (window.innerWidth * scaleConstant * .7))
        );
      } else {
        console.log("900 - 1800");
        setConstant(constants[columns]);
        // Set scale factor
        setScaleFactor(1 / (window.innerWidth * scaleConstant));
        // Handle scale factor on  Window resiizing
        window.addEventListener("resize", () =>
          setScaleFactor(1 / (window.innerWidth * scaleConstant))
        );
      }
    } else if (window.innerWidth >= 1800) {
      console.log("larger than 1800");
      // Set scale factor

      setScaleFactor(columns > 3 ? 0.82 * columns : 2);
      // Handle scale factor on  Window resiizing
    }
  };

  // ON RERENDER
  useEffect(() => {
    // Set shown post array to equal posts
    setOrderedPosts(posts);
    manageScaling();

    window.addEventListener("resize", () => manageScaling());

    return () => {
      window.removeEventListener("resize", () => manageScaling());
    };
  });

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
  const handleShuffle = (array) => {
    const shuffledArray = shuffle(array);
    setOrderedPosts([...shuffledArray]);
  };

  // const gridRef = useRef(null);
  // console.log(gridRef.current)

  return (
    <Fragment>
      <Navbar stage="2" />

      <div className="posts">
        <div className="u-grid">
          <PostsHeader />
        </div>

        <button onClick={() => handleShuffle(orderedPosts)}>Click</button>

        <Grid
          className="posts__grid"
          columnWidth={1080 / scaleFactor}
          columns={columns}
          scaleFactor={scaleFactor}>
          {orderedPosts.map((post) => {
            return (
              <li
                key={post._id}
                className="posts__item"
                itemHeight={post.height / scaleFactor}
                style={{
                  width: 1080 / scaleFactor,
                  height: post.height / scaleFactor,
                }}>
                <img src={post.image[0]} className="posts__image" alt="" />
              </li>
            );
          })}
        </Grid>
      </div>
      {/* )} */}
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
