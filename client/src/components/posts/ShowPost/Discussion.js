import React, { useState, useRef, useEffect } from "react";
import SlideToggle from "../../layout/SlideToggle";
import Comment from "./Comment";
import { useTransition, animated } from "react-spring";


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

  const commentsRef = useRef(null);

  useEffect(() => {
    setUserHasLiked(likes.some((like) => like.user === auth.user._id));
  }, [likes, auth.user._id]);

  const transitions = useTransition(comments, (comment) => comment._id, {
    from: { opacity: 0, transform: "translate3d(20px,0,0)",  },
    enter: { opacity: 1, transform: "translate3d(0px,0,0)",  }, 
    leave: { opacity: 0, transform: "translate3d(20px,0,0)", }, 
    config: {
      tension: 400
    }
  });

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
          <button
            onClick={() => setCommentsVisible(true)}
            className="discussion__amounts--comments discussion__amounts--comments-btn">
            <span className="u-bold">{comments.length}</span> comments{" "}
          </button>
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
            <img src={auth.user.avatar} alt="" />
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
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              <div ref={commentsRef} className="">
                <Comment
                  // key={comment._id}
                  comment={item}
                  currentUserId={auth.user._id}
                  commentsVisible={commentsVisible}
                  deleteComment={deleteComment}
                  postId={id}
                />
              </div>
            </animated.div>
          ))}
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
