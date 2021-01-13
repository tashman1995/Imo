import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { animated } from "react-spring";

import "./InitialHeading.scss";

const InitialHeading = ({
  letsExpAnim,
  fadeOut,
  subtitleAnim,
  buttonsAnim,
}) => {
  return (
    <Fragment>
      <div className="initial-heading">
        <div className="initial-heading__title--container u-margin-bottom-medium">
          <animated.h1 style={fadeOut} className="initial-heading__title">
            {letsExpAnim.map(({ item, props, key }) => (
              <animated.div
                className="initial-heading__title--1"
                key={key}
                style={props}>
                {item.text}
              </animated.div>
            ))}
          </animated.h1>
        </div>

        <animated.div className="initial-heading__subtitle--container u-center-text u-margin-bottom-medium">
          {/* <animated.h2 style={fadeOut} className=" initial-heading__subtitle"> */}
          {subtitleAnim.map(({ item, props, key }) => (
            <animated.div
              className="initial-heading__subtitle"
              key={key}
              style={props}>
              {item.text}
            </animated.div>
          ))}
          {/* </animated.h2> */}
        </animated.div>
        <div className="initial-heading__buttons">
          {buttonsAnim.map(({ item, props, key }) => (
            <animated.div className="btn" key={key} style={props}>
              <Link to={item.link} className="nav__link-text ">
                {item.text}
              </Link>
            </animated.div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default InitialHeading;
