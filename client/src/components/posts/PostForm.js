import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [caption, setCaption] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [image, setImage] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    // Use file reader from built in JS Api
    const reader = new FileReader();
    // Convert image to string
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };



  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ caption, image });
          setCaption("");
        }}>
        <input
          type="file"
          name="image"
          id=""
          // value={image}
          onChange={handleFileInputChange}
        />
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Create a post"
          required></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
      {image && <img src={image} style={{ height: "300px" }} />}
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
