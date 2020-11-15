import React, { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "react-spring-modal/dist/index.css";
import { animated, useTransition } from "react-spring";
import "./Modal.scss";

// OUTERMODAL ELEMENT
const Modal = ({
  modal,
  children,
}) => {
  const transitionConfig1 = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 400,
    },
  };
  
 
  console.log('run')

  const fade = useTransition(modal, null, transitionConfig1);

  // HANDLE ESC KEYPRESS

  return (
    <Fragment>
      {/* {fade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              // ref={internalElement}
              className="modal"
              key={key}
              style={props}> */}
      <div className="modal">{children}</div>

      {/* </animated.div>
          )
      )} */}
    </Fragment>
    // document.getElementById("modal_root")
  );
};

// INNER MODAL ELEMENT

export default Modal;
