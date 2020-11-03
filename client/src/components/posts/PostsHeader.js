import React, {  useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Select from '../layout/Select';
const PostsHeader = (props) => {
 const [formData, setFormData] = useState({
   search: ""
 });

   const { search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="post-header">
      <h1 className="heading-primary">Posts</h1>
      <Select
        label="Tag Selector"
        placeholder="Select an Option"
        options={["2 Columns", "3 Columns", "4 Columns", "5 Columns"]}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchPosts(formData);
        }}>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search Posts"
          onChange={(e) => onChange(e)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

PostsHeader.propTypes = {
  searchPosts: PropTypes.func.isRequired,
};

export default connect(null, {searchPosts})(PostsHeader);
