import React from "react";
import { animated } from "react-spring";
import ImageSlider from "../../../reausable/ImageSlider";
import Button from "../../../reausable/Button";

import "./PageContent.scss";

const PageContent = ({
  imoZoomOut,
  fadeInAndUp,
  fadeInAndUp2,
  imageGridAnim,
}) => {
  return (
    <div className="main-content">
      <animated.div
        className="title2"
        style={imoZoomOut}
      >
        <div className="title2__left"></div>
        <div className="title2__right"></div>
        <div className="title2__under">
          <div className="secondary-text">
            <animated.p
              style={fadeInAndUp}
              className="secondary-text__heading u-margin-bottom-medium">
              Find out where your favourite photos were taken, the best time to
              visit and get tips on what setting to dial in
            </animated.p>
            <animated.div
              style={fadeInAndUp2}
              className="secondary-text__buttons u-margin-bottom-medium">
              <Button
                content="Log In"
                destination="/login"
                classNames="secondary-text__btn"
              />
              <Button
                content="Sign Up"
                destination="/register"
                classNames="secondary-text__btn"
              />
            </animated.div>
            <ImageSlider imageGridAnim={imageGridAnim} />
          </div>
        </div>
        <div className="title2__above"></div>
        <animated.img className="title2__image" src="./imgs/imo2.svg" />
      </animated.div>
    </div>
  );
};

export default PageContent;
