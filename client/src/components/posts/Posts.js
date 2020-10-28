import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostElement from "./PostElement";
import PostForm from "./PostForm";
import Loading from "../reausable/Loading";
import { getPosts } from "../../actions/post";
import {
  SpringGrid,
  measureItems,
  layout,
  makeResponsive,
} from "react-stonecutter";
import "./Posts.scss";

// const Grid = makeResponsive(SpringGrid, {
//   maxWidth: 800,
//   minPadding: 100,
// });

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // const handleStateChange = () => {
  //   setLoading(!imagesLoaded(gallery.current));
  // };

  // const imagesLoaded = (parentNode) => {
  //   const imgElements = parentNode.querySelectorAll("img");
  //   console.log(imgElements);
  //   for (const img of imgElements) {
  //     if (!img.complete) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const [loading, setLoading] = useState(true);

  const gallery = useRef();
  console.log("gallery:", gallery.current);

  posts.forEach((post) => {
    console.log(post);
  });
  return (
    <Fragment>
      {/* {loading && <Loading />} */}

      <div ref={gallery} className="">
        <SpringGrid
          component="ul"
          columns={5}
          columnWidth={150}
          gutterWidth={50}
          gutterHeight={50}
          layout={layout.pinterest}
          duration={800}
          easing="ease-out">
          <li key="A" className="post" itemHeight={150}>
            A
          </li>
          <li key="B" className="post" itemHeight={120}>
            B
          </li>
          <li key="C" className="post" itemHeight={170}>
            C
          </li>
        </SpringGrid>
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
