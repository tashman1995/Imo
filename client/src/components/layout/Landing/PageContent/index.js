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
      <div className="title">
        <animated.img
          className="title__image"
          src="./imgs/imo.svg"
          style={imoZoomOut}
        />
      </div>
      <div className="secondary-text">
        <animated.p
          style={fadeInAndUp}
          className="secondary-text__heading u-margin-bottom-medium"
        >
          Find out where your favourite photos were taken, the best time to
          visit and get tips on what setting to dial in
        </animated.p>
        <animated.div
          style={fadeInAndUp2}
          className="secondary-text__buttons u-margin-bottom-medium"
        >
          <Button content="Log In" destination="/login" classNames="secondary-text__btn" />
          <Button content="Sign Up"  destination="/register" classNames="secondary-text__btn" />
        </animated.div>
        <ImageSlider imageGridAnim={imageGridAnim} />
      </div>
    </div>
  );
};

export default PageContent;
