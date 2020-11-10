import React, { Fragment, useEffect, useRef } from "react";
import {createPortal} from "react-dom";
import "react-spring-modal/dist/index.css";
import { animated, useTransition } from "react-spring";
import "./Modal.scss";


// INNER MODAL ELEMENT

const ModalElement = ({ children, closeModal, width, modal }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      e.keyCode === 27 && closeModal();
    };
    window.addEventListener("keydown", (e) => {
      handleKeyPress(e);
    });
    return window.removeEventListener("keydown", (e) => {
      handleKeyPress(e);
    });
  }, []);

  // HANDLE OUTSIDE CLICK

  const handleClickOff = (e) => {
    if (innerElement.current) {
      if (innerElement.current.contains(e.target)) {
        //  exit if inside click
        return;
      }
      // outside click

      closeModal();
    }
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickOff);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  }, []);

  const innerElement = useRef();

  const transitionConfig2 = {
    from: { transform: "scale(0.9)" },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0.9)" },
    config: {
      tension: 400,
    },
  };

  const scale = useTransition(modal, null, transitionConfig2);

  return (
    <Fragment>
      {scale.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              ref={innerElement}
              className={`modal__container modal__container--${width}`}>
              {children}
            </animated.div>
          )
      )}
    </Fragment>
  );
};

// OUTERMODAL ELEMENT

const Modal = ({ openModal, modal, closeModal, children, width = "50" }) => {
  const transitionConfig1 = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 400,
    },
  };

  // STOP SCROLL BEHIND MODAL
  useEffect(() => {
    modal && (document.body.style.overflow = "hidden");
    !modal && (document.body.style.overflow = "unset");
  }, [modal]);

  const fade = useTransition(modal, null, transitionConfig1);

  

  // HANDLE ESC KEYPRESS

  return createPortal(
    <Fragment>
      {fade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              // ref={internalElement}
              className="modal"
              key={key}
              style={props}>
              <ModalElement width={width} modal={modal} closeModal={closeModal}>
                {children}
              </ModalElement>
            </animated.div>
          )
      )}
    </Fragment>,
    document.getElementById("modal_root")
  );
};

export default Modal;
