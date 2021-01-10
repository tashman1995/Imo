import React from "react";
import { animated } from "react-spring";

import "./Backdrop.scss";

export default function Backdrop({ imageZoomOut, zoomAnim, backdropAnim }) {
  return (
    <div className="backdrop">
      {zoomAnim.map(({ props, key, item }) => (
        <animated.img
          style={props}
          key={key}
          className="backdrop__image"
          // srcSet="./imgs/yosemite-small.jpg 500w, ./imgs/yosemite-medium.jpg 900w, ./imgs/yosemite-extra-large.jpg 1200w"
          sizes="(max-width: 1800px) 100vw"
          alt=""
          src={item.src}
        />
      ))}

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
