import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTransition, animated, useSpring } from "react-spring";
import useComponentSize from "@rehooks/component-size";
import SlideToggle from "../../layout/SlideToggle";
import Comment from "./Comment";

const Discussion = ({
  user,
  addLike,
  removeLike,
  addComment,
  deleteComment,
  likes,
  comments,
  id,
  auth,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [newCommentsVisible, setNewCommentsVisible] = useState(false);
  const [text, setText] = useState("");
  const addNewCommentInput = useRef();

  //  MOVE FOCUS TO  NEW COMMENT INPUT ON LOAD
  useEffect(() => {
    newCommentsVisible && addNewCommentInput.current.focus();
  }, [newCommentsVisible]);

  const [userHasLiked, setUserHasLiked] = useState(false);

  useEffect(() => {
    setUserHasLiked(likes.some((like) => like.user === auth.user._id));
  }, [likes]);

  return (
    <div className="discussion">
      <div className="discussion__amounts">
        {likes.length > 0 ? (
          <p className="discussion__amounts--likes">
            <span className="u-bold">{likes.length}</span> likes{" "}
          </p>
        ) : (
          <p className="discussion__amounts--likes">No likes yet</p>
        )}
        {comments.length > 0 ? (
          <p className="discussion__amounts--comments">
            <span className="u-bold">{comments.length}</span> comments{" "}
          </p>
        ) : (
          <p className="discussion__amounts--comments">No comments yet</p>
        )}
      </div>
      <div className="discussion__buttons">
        {userHasLiked ? (
          <button
            className="discussion__button"
            onClick={() => {
              removeLike(id);
            }}>
            <p className="paragraph">
              <i className="far fa-heart discussion__button--icon"></i> Unlike
            </p>
          </button>
        ) : (
          <button
            className="discussion__button"
            onClick={() => {
              addLike(id);
            }}>
            <p className="paragraph">
              <i className="far fa-heart discussion__button--icon"></i> Like
            </p>
          </button>
        )}

        <button
          className="discussion__button"
          onClick={(e) => {
            !newCommentsVisible && e.currentTarget.blur();
            setNewCommentsVisible(!newCommentsVisible);
          }}>
          <p className="paragraph">
            <i className="far fa-comment-alt discussion__button--icon"></i>{" "}
            Comment
          </p>
        </button>
        {/* <button className="discussion__button">
          <p className="paragraph">
            <i className="far fa-share-square discussion__button--icon"></i>{" "}
            Share
          </p>
        </button> */}
      </div>
      <SlideToggle isVisible={newCommentsVisible}>
        <div className="discussion__add-comment">
          <div className="discussion__add-comment--avatar">
            <img src={user.avatar} alt="" />
          </div>
          <form
            className="discussion__add-comment--form"
            onSubmit={(e) => {
              e.preventDefault();
              addComment(id, { text });
              setText("");
              setCommentsVisible(true);
            }}>
            <input
              ref={addNewCommentInput}
              className="discussion__text-input"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
            />
            <button type="submit" className="discussion__add-comment--send">
              <i className="far fa-paper-plane fa-2x discussion__add-comment--icon"></i>
            </button>
          </form>
        </div>
      </SlideToggle>

      <div className="discussion__comments">
        <SlideToggle isVisible={commentsVisible}>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                currentUserId={auth.user._id}
                commentsVisible={commentsVisible}
                deleteComment={deleteComment}
                postId={id}
              />
            );
          })}
        </SlideToggle>
        {comments.length > 0 &&
          (commentsVisible ? (
            <button
              onClick={() => setCommentsVisible(false)}
              className="discussion__comments--button">
              <p className="heading-tertiary">Hide Comments...</p>
            </button>
          ) : (
            <button
              onClick={() => setCommentsVisible(true)}
              className="discussion__comments--button">
              <p className="heading-tertiary">View Comments...</p>
            </button>
          ))}
      </div>
    </div>
  );
};

Discussion.propTypes = {};

export default Discussion;
