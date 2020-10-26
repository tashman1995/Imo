import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  // const postDetails = () => {
  //     const formData = new FormData()
  //     formData.append("file", image)
  //     formData.append("upload_preset", "imoSocialMedia")
  //     formData.append("cloud_name", "doyhcbl8x")
  //     fetch("	https://api.cloudinary.com/v1_1/doyhcbl8x/image/upload");

  // }

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
          onChange={(e) => setImage(e.target.files[0])}
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
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
