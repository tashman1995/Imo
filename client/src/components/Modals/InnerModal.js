import React, { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "react-spring-modal/dist/index.css";
import { animated, useTransition } from "react-spring";
import "./Modal.scss";

const InnerModal = ({
  children,
  closeModal,
  width = "50",
  maxWidth = "95",
  modal,
}) => {
  // STOP SCROLL BEHIND MODAL
  useEffect(() => {
    modal && (document.body.style.overflowY = "hidden");
    !modal && (document.body.style.overflowY = "auto");
  }, [modal]);
  // SET UP KEY PRESS LISTENER
  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  // HANDLE TABBING
  const handleTabKey = (e) => {
    // console.log("focused element", document.activeElement);
    const focusableModalElements = innerElement.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    // console.log("focusable elements", focusableModalElements);
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];
    const focusableModalElementsArray = Array.prototype.slice.call(
      focusableModalElements
    );
    if (!focusableModalElementsArray.includes(document.activeElement)) {
      firstElement.focus();
      return e.preventDefault();
    }

    // if (!e.shiftKey && document.activeElement === element) {
    //   firstElement.focus();
    //   return e.preventDefault();
    // }

    if (e.shiftKey && document.activeElement !== lastElement) {
      console.log("moved focus to last element");
      lastElement.focus();
      e.preventDefault();
    }
  };

  // KEYPRESS MAPPING
  const keyListenersMap = new Map([
    [
      27,
      () => {
        closeModal();
      },
    ],
    [9, handleTabKey],
  ]);

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
      tension: 450,
    },
  };

  const scale = useTransition(modal, null, transitionConfig2);

  return (
    <Fragment>
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: `${width}%`,
          maxWidth: `${maxWidth}rem`,
        }}
        ref={innerElement}
        className={`modal__container`}>
        <div className="modal__close">
          <button
            onClick={closeModal}
            className="modal__close-icon fa fa-times"
            aria-hidden="true"></button>
        </div>
        {children}
      </div>
    </Fragment>
  );
};

InnerModal.propTypes = {};

export default InnerModal;
