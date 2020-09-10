import React, { Fragment } from "react";
import { animated } from "react-spring";

import "./InitialHeading.scss";

const InitialHeading = ({letsExpAnim, fadeOut, subtitleAnim}) => {
  return (
    <Fragment>
      <div className="initial-heading">
        <div className="initial-heading__title--container u-margin-bottom-medium">
          <animated.h1 style={fadeOut} className="initial-heading__title">
            {letsExpAnim.map(({ item, props, key }) => (
              <animated.div
                className="initial-heading__title--1"
                key={key}
                style={props}
              >
                {item.text}
              </animated.div>
            ))}
          </animated.h1>
        </div>
        <animated.div
          style={subtitleAnim}
          className="initial-heading__subtitle--container u-center-text"
        >
          <animated.h2 style={fadeOut} className=" initial-heading__subtitle">
            Share your favourite photography locations
          </animated.h2>
          <animated.h2 style={fadeOut} className=" initial-heading__subtitle">
            with like minded adventurers
          </animated.h2>
        </animated.div>
      </div>
    </Fragment>
  );
};

export default InitialHeading;
