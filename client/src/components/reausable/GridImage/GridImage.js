import React, { Fragment } from "react";
import { animated, useSpring } from "react-spring";
import "./GridImage.scss";

export const GridImage = ({ url }) => {
  const [anim, setAnim] = useSpring(() => ({
    transform: "scale(1)",
    config: {
      mass: 5,
      tension: 350,
      friction: 50,
    },
  }));

  return (
    <Fragment>
      <animated.img onMouseOver={() => setAnim({transform: "scale(1.05"})} onMouseLeave={() => setAnim({transform: "scale(1"})} style={{transform: anim.transform}} src={url} alt="" className="grid-image" />
    </Fragment>
  );
};

export default GridImage;
