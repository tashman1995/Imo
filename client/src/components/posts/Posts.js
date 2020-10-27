import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import "./Posts.scss";

// Grid
import { Grid, Slug, Fade } from "mauerwerk";
import lodash from "lodash";
import PostsHeader from "./PostsHeader";
import Icon from "@ant-design/icons";
import data from "./data";

const Cell = ({ toggle,text, name, description, css, maximized, image  }) => (
  <div
    className="cell"
    style={{ backgroundImage: css, cursor: !maximized ? "pointer" : "auto" }}
    onClick={!maximized ? toggle : undefined}>
    <Fade show={maximized} delay={maximized ? 400 : 0}>
      <div className="details">
        <Slug delay={600}>
          <div className="circle" style={{ background: css }} />
          <div className="close">
            {/* <Icon type="close" style={{ cursor: "pointer" }} onClick={toggle} /> */}
          </div>
          <h1>{name}</h1>
          <p>{description}</p>
        </Slug>
      </div>
    </Fade>
    <Fade
      show={!maximized}
      from={{ opacity: 0, transform: "translate3d(0,140px,0)" }}
      enter={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
      leave={{ opacity: 0, transform: "translate3d(0,-50px,0)" }}
      delay={maximized ? 0 : 400}>
      <div className="default">
        <img className="cell__image" src={image[0]} alt=""/>
      </div>
    </Fade>
  </div>
);

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [postsState, setPostsState] = useState(posts);
  const [columns, setColumnsState] = useState(4);
  const [margin, setMarginState] = useState(20);
  const [filter, setFilter] = useState("");
  const [height, setHeightState] = useState(true);

  const search = (e) => setFilter(e.target.value);
  const shuffle = () => setPostsState(lodash.shuffle(posts));
  const setColumns = (e) => setColumnsState(parseInt(e.key));
  const setMargin = (e) => setMarginState(parseInt(e.key));
  const setHeight = (e) => setHeightState(e);

  console.log(postsState)

  return (
    <Fragment>
      <div className="main">
        <PostsHeader
          search={search}
          shuffle={shuffle}
          setColumns={setColumns}
          setMargin={setMargin}
          setHeight={setHeight}
        />
        <Grid
          className="grid"
          // Arbitrary data, should contain keys, possibly heights, etc.
          data={posts}
          // Key accessor, instructs grid on how to fet individual keys from the data set
          keys={(d) => d._id}
          // Can be a fixed value or an individual data accessor
          // heights={height ? (d) => d.height : 200}
          heights={400}
          // Number of columns
          columns={columns}
          // Space between elements
          margin={margin}
          // Removes the possibility to scroll away from a maximized element
          lockScroll={false}
          // Delay when active elements (blown up) are minimized again
          closeDelay={400}>
          {(postsState, maximized, toggle) => (
            <Cell {...postsState} style="border-radius: 1.2rem"  maximized={maximized} toggle={toggle} />
          )}
        </Grid>
      </div>
    </Fragment>
    // <Fragment>
    //   <h1 className="large text-primary">Posts</h1>
    //   <p className="lead">
    //     <i className="fas fa-user" /> Welcome to the community
    //   </p>
    //   <PostForm />
    //   <div className="posts">
    //     {posts.map((post) => (
    //       <PostItem key={post._id} post={post} />
    //     ))}
    //   </div>
    // </Fragment>
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
