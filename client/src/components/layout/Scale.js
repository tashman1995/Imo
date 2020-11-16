import React from "react";
import { animated, useTransition } from "react-spring";

const Scale = ({ trigger, className, children }) => {
  const transitionConfig = {
    from: { transform: "scale(0.9)", opacity: 0 },
    enter: { transform: "scale(1)", opacity: 1 },
    leave: { transform: "scale(0.9)",opacity: 0 },
    config: {
      tension: 450,
    },
  };
  
  const scale = useTransition(trigger, null, transitionConfig);

  return scale.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className={className} key={key} style={{...props, width: "100%", display: "flex", justifyContent: "center"}}>
          {children}
        </animated.div>
      )
  );
};

export default Scale;
