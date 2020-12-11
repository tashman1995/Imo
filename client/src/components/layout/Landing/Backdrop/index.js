import React from "react";
import { animated } from "react-spring";

import "./Backdrop.scss";

export default function Backdrop({ imageZoomOut, zoomAnim, backdropAnim }) {
  return (
    <div className="backdrop">
      <animated.img
        style={zoomAnim}
        className="backdrop__image"
        srcSet="./imgs/yosemite-small.jpg 500w, ./imgs/yosemite-medium.jpg 900w, ./imgs/yosemite-extra-large.jpg 1200w"
        sizes="(max-width: 1800px) 100vw"
        alt=""
        src="./imgs/yosemite-extra-large.jpg"
      />

      <div className="backdrop__covers">
        {backdropAnim.map(({ props, key }) => (
          <animated.div className="backdrop__cover" key={key} style={props}>
            <div></div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
