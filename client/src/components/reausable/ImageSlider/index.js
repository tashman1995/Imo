import React, { Fragment } from "react";
import GridImage from "../GridImage/GridImage";

import { animated } from "react-spring";

import "./ImageSlider.scss";

const ImageSlider = ({ imageGridAnim }) => {
  return (
    <Fragment>
      <div className="image-slider u-grid">
        <div className="image-slider__container">
          {imageGridAnim.map(({props, item, key}) => (
            <animated.div
              className="image-slider__image-container"
              key ={key}
              style={props}
            >
              <GridImage url={item.url}  />
            </animated.div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ImageSlider;

