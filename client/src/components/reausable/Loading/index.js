import React, { useState, Fragment } from "react";
import { useTransition, animated } from "react-spring";
import "./Loading.scss";

const Loading = () => {
  const [visible] = useState(true);

  const transitionConfig1 = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 400,
    },
  };
  const fade = useTransition(visible, null, transitionConfig1);

  return (
    <Fragment>
      {fade.map(({ key, props }) => (
        <animated.div key={key} style={props} className="loading">
          <div className="loading__animation"></div>
        </animated.div>
      ))}
    </Fragment>
  );
};

export default Loading;
