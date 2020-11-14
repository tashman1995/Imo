import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTransition, animated, useSpring } from "react-spring";
import useComponentSize from "@rehooks/component-size";
import SlideToggle from "../../layout/SlideToggle";

const Discussion = (props) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [newCommentsVisible, setNewCommentsVisible] = useState(false);
  const addNewCommentInput = useRef();
  const addNewCommentElement = useRef(null);
  const { height } = useComponentSize(addNewCommentElement);

  //  MOVE FOCUS TO  NEW COMMENT INPUT ON LOAD
  useEffect(() => {
    newCommentsVisible && addNewCommentInput.current.focus();
  }, [newCommentsVisible]);

   const { transform, opacity } = useSpring({
     from: { opacity: 0, transform: "translate3d(20px,0,0)" },
     to: {
       opacity: commentsVisible ? 1 : 0,
       transform: `translate3d(${commentsVisible ? 0 : 10}px,0,0)`,
     },
   });

  return (
    <div className="discussion">
      <div className="discussion__amounts">
        <p className="discussion__amounts--likes">
          <span className="u-bold">2</span> likes
        </p>
        <p className="discussion__amounts--comments">
          <span className="u-bold">2</span> comments
        </p>
      </div>
      <div className="discussion__buttons">
        <button className="discussion__button">
          <p className="paragraph">
            <i className="far fa-heart discussion__button--icon"></i> Like
          </p>
        </button>
        <button
          className="discussion__button"
          onClick={(e) => {
            e.currentTarget.blur();
            setNewCommentsVisible(!newCommentsVisible);
          }}>
          <p className="paragraph">
            <i className="far fa-comment-alt discussion__button--icon"></i>{" "}
            Comment
          </p>
        </button>
        <button className="discussion__button">
          <p className="paragraph">
            <i className="far fa-share-square discussion__button--icon"></i>{" "}
            Share
          </p>
        </button>
      </div>
      <SlideToggle isVisible={newCommentsVisible}>
        <div className="discussion__add-comment">
          <div className="discussion__add-comment--avatar">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </div>
          <form className="discussion__add-comment--form">
            <input
              ref={addNewCommentInput}
              className="discussion__text-input"
              placeholder="Write a comment..."
              type="text"
            />
            <button className="discussion__add-comment--send">
              <i className="far fa-paper-plane fa-2x discussion__add-comment--icon"></i>
            </button>
          </form>
        </div>
      </SlideToggle>

      <div className="discussion__comments">
        <SlideToggle isVisible={commentsVisible}>
          <animated.div
            style={{ opacity, transform }}
            className="discussion__comment comment">
            <div className="comment__avatar">
              <img
                src="https://sarx.org.uk/wp-content/uploads/2017/02/profile.png"
                alt=""
                className="comment__avatar--image"
              />
            </div>
            <div className="comment__content">
              <p className="paragraph">
                <span className="u-bold">Tom Ashman</span>
                <span className="sub-paragraph sub-paragraph--inline">
                  &nbsp; 2 days ago
                </span>
              </p>
              <p className="paragraph">
                Great location, visited a while ago for sunset. Slightly longer.
              </p>
            </div>
          </animated.div>
          <animated.div style={{ opacity, transform }} className="discussion__comment comment">
            <div className="comment__avatar">
              <img
                src="https://sarx.org.uk/wp-content/uploads/2017/02/profile.png"
                alt=""
                className="comment__avatar--image"
              />
            </div>
            <div className="comment__content">
              <p className="paragraph">
                <span className="u-bold">Tom Ashman</span>
                <span className="sub-paragraph sub-paragraph--inline">
                  &nbsp; 2 days ago
                </span>
              </p>
              <p className="paragraph">
                Great location, visited a while ago for sunset. This will be
                another length. Very long comment this one
              </p>
            </div>
          </animated.div>
          <animated.div style={{ opacity, transform }} className="discussion__comment comment">
            <div className="comment__avatar">
              <img
                src="https://sarx.org.uk/wp-content/uploads/2017/02/profile.png"
                alt=""
                className="comment__avatar--image"
              />
            </div>
            <div className="comment__content">
              <p className="paragraph comment__title">
                <span className="u-bold">Tom Ashman</span>
                <span className="sub-paragraph sub-paragraph--inline">
                  &nbsp; 2 days ago
                </span>
              </p>
              <p className="paragraph">Great location, visited.</p>
            </div>
          </animated.div>
        </SlideToggle>

        {commentsVisible ? (
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
        )}
      </div>
    </div>
  );
};

Discussion.propTypes = {};

export default Discussion;
