import React, { Fragment, useEffect, useRef } from "react";

import "react-spring-modal/dist/index.css";
import "./Modal.scss";

const InnerModal = ({ children, closeModal }) => {
  // STOP SCROLL BEHIND MODAL

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
    const focusableModalElements = innerElement.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
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

  useEffect(() => {
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
    // add when mounted
    document.addEventListener("mousedown", handleClickOff);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  }, []);

  const innerElement = useRef();

  return (
    <Fragment>
      <div
        role="dialog"
        aria-modal="true"
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
