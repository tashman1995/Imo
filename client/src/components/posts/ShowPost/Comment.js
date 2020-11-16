import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import Moment from "react-moment";

const Comment = ({
  comment: { name, avatar, text, date, user, _id },
  commentsVisible,
  currentUserId,
  deleteComment,
  postId,
}) => {
  const { transform, opacity } = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: commentsVisible ? 1 : 0,
      transform: `translate3d(${commentsVisible ? 0 : 10}px,0,0)`,
    },
  });

  
  return (
    <animated.div
      style={{ opacity, transform }}
      className="discussion__comment comment">
      <Link to={`/profile/`}>
        <div className="comment__avatar">
          <img src={avatar} alt="" className="comment__avatar--image" />
        </div>
      </Link>
      <div className="comment__right">
        <div className="comment__content">
          <p className="paragraph">
            <span className="u-bold">{name}</span>
          </p>
          <p className="paragraph">{text}</p>
        </div>
        <div className="comment__sub-content">
          {user === currentUserId && (
            <Fragment>
              <button
                onClick={() => deleteComment(postId, _id)}
                className="comment__delete-btn sub-paragraph">
                Delete
              </button>
            </Fragment>
          )}
          <p className="sub-paragraph ">
            <Moment fromNow>{date}</Moment>
          </p>
        </div>
      </div>
    </animated.div>
  );
};

export default Comment;
