import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchPosts } from "../../actions/post";
import { animated, useSpring } from "react-spring";
import { openNewPostModal } from "../../actions/post";

import Select from "../layout/Select";
const PostsHeader = ({
  searchPosts,
  setColumns,
  shuffle,
  openNewPostModal,
  isAuthenticated,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="post-header">
      <h1 className="heading-primary">Posts</h1>

      <form className="post-header__inputs">
        {isAuthenticated && (
          <button
            className="post-header__btn"
            onClick={(e) => {
              e.preventDefault();
              openNewPostModal();
              e.target.blur();
            }}>
            Add Post &nbsp; <i className="fas fa-plus"></i>
          </button>
        )}

        <button
          className="post-header__btn"
          onClick={(e) => {
            e.preventDefault();
            shuffle();
            e.target.blur();
          }}>
          Shuffle
        </button>
        <Select
          className="post-header__column-select"
          label="Tag Selector"
          placeholder="Select an Option"
          options={[
            { name: "2 Columns", value: 2 },
            { name: "3 Columns", value: 3 },
            { name: "4 Columns", value: 4 },
            { name: "5 Columns", value: 5 },
          ]}
          initiallySelectedOption={3}
          setFunction={setColumns}
        />
        <fieldset className="post-header__btn">
          <input
            type="text"
            className="post-header__btn--input"
            name="search"
            value={searchTerm}
            placeholder="Search Posts"
            onChange={(e) => {
              onChange(e);
            }}
          />
          <div className="post-header__btn--icons">
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
                className={`fas fa-search post-header__btn--icon`}
                style={{ opacity }}></animated.i>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

PostsHeader.propTypes = {
  searchPosts: PropTypes.func.isRequired,
  openNewPostModal: PropTypes.func.isRequired,
};

export default connect(null, { searchPosts, openNewPostModal })(PostsHeader);
