import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import SlideToggle from "../layout/SlideToggle";
import { connect } from "react-redux";
import { searchPosts } from "../../actions/post";
import { animated, useSpring } from "react-spring";
import { openNewPostModal } from "../../actions/post";

import Select from "../layout/Select";
const PostsHeader = ({
  searchPosts,
  setColumns,
  columns,
  shuffle,
  openNewPostModal,
  isAuthenticated,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    searchPosts(e.target.value);
  };

  // Search Icon animation
  const { transform } = useSpring({
    from: { transform: "translate3d(0,20px,0)" },
    to: {
      transform: `translate3d(0,${searchTerm.length > 0 ? 0 : 20}px,0)`,
    },
  });
  const { opacity } = useSpring({
    from: { opacity: 1 },
    to: {
      opacity: searchTerm.length > 0 ? 0 : 1,
    },
  });

  return (
    <Fragment>
      <div className="post-header">
        <div className="post-header__main">
          <h1 className="heading-primary">Posts</h1>
          {/* Large screen inputs */}
          <form className="post-header__inputs screen-inputs">
            {isAuthenticated && (
              <Fragment>
                <button
                  className="post-header__btn add-post add-post--word"
                  onClick={(e) => {
                    e.preventDefault();
                    openNewPostModal();
                    e.target.blur();
                  }}>
                  Add Post &nbsp; <i className="fas fa-plus"></i>
                </button>
              </Fragment>
            )}
            <button
              className="post-header__btn shuffle"
              onClick={(e) => {
                e.preventDefault();
                shuffle();
                e.target.blur();
              }}>
              <div className="shuffle__word">Shuffle</div>
            </button>
            <div className="post-header__column-select">
              <Select
                label="Tag Selector"
                placeholder="No. of Columns"
                width="16rem"
                options={[
                  { name: "1 Columns", value: 1 },
                  { name: "2 Columns", value: 2 },
                  { name: "3 Columns", value: 3 },
                  { name: "4 Columns", value: 4 },
                  { name: "5 Columns", value: 5 },
                ]}
                setFunction={setColumns}
              />
            </div>

            <fieldset className="post-header__btn post-header__search">
              <input
                type="text"
                className="post-header__search--input"
                name="search"
                value={searchTerm}
                placeholder="Search Posts"
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <div className="post-header__search--icons">
                {searchTerm.length > 0 ? (
                  <animated.i
                    className={`fas fa-times post-header__search--icon`}
                    style={{ transform }}
                    onClick={() => {
                      setSearchTerm("");
                      searchPosts("");
                    }}></animated.i>
                ) : (
                  <animated.i
                    className={`fas fa-search post-header__search--icon`}
                    style={{ opacity }}></animated.i>
                )}
              </div>
            </fieldset>
          </form>
          {/* // PHONE INPUTS */}
          <form className="post-header__inputs phone-inputs">
            {isAuthenticated && (
              <Fragment>
                <button
                  className="post-header__phone-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    openNewPostModal();
                    e.target.blur();
                  }}>
                  <i className="fas fa-plus fa-2x"></i>
                </button>
              </Fragment>
            )}
            <button
              className="post-header__phone-btn"
              onClick={(e) => {
                e.preventDefault();
                shuffle();
                e.target.blur();
              }}>
              <i className="fas fa-random fa-2x"></i>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setSearchVisible(!searchVisible);
              }}
              className="post-header__phone-btn">
              <i className={`fas fa-search fa-2x`}></i>
            </button>
          </form>
        </div>

        {/* Phone Search */}
        <SlideToggle isVisible={searchVisible}>
          <div className="post-header__phone-search">
            <fieldset className="post-header__btn post-header__search">
              <input
                type="text"
                className="post-header__search--input"
                name="search"
                value={searchTerm}
                placeholder="Search Posts"
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <div className="post-header__search--icons">
                {searchTerm.length > 0 ? (
                  <animated.i
                    className={`fas fa-times post-header__search--icon`}
                    style={{ transform }}
                    onClick={() => {
                      setSearchTerm("");
                      searchPosts("");
                    }}></animated.i>
                ) : (
                  <animated.i
                    className={`fas fa-search post-header__search--icon`}
                    style={{ opacity }}></animated.i>
                )}
              </div>
            </fieldset>
          </div>
        </SlideToggle>
      </div>
    </Fragment>
  );
};

PostsHeader.propTypes = {
  searchPosts: PropTypes.func.isRequired,
  openNewPostModal: PropTypes.func.isRequired,
};

export default connect(null, { searchPosts, openNewPostModal })(PostsHeader);
