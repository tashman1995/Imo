import React from "react";
import { animated, useTransition } from "react-spring";

const Fade = ({ trigger, className, children }) => {
  const transitionConfig1 = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 400,
    },
  };

  const fade = useTransition(trigger, null, transitionConfig1);
  return fade.map(
    ({ item, key, props }) =>
      item && (
        <animated.div  key={key} style={props}>
          {children}
        </animated.div>
      )
  );
};

export default Fade;
