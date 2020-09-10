import React from "react";
import { animated } from "react-spring";

import "./Backdrop.scss";

export default function Backdrop({ imageZoomOut, zoomAnim, backdropAnim }) {
  return (
    <div className="backdrop">
      <animated.img
        style={zoomAnim}
        className="backdrop__image"
        src="./imgs/yosemite.jpg"
        alt=""
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
