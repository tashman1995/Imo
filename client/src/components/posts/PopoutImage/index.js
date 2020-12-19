import React, { Fragment, useState, useEffect, useRef } from "react";
import "./styles.scss";
import { isBrowser } from "react-device-detect";
import { animated, useTransition } from "react-spring";

const PopoutImage = ({ popoutImage }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);


  const { x, y } = mousePosition;
  const setMousePositionFunc = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    popoutImage !== "" && setShow(true)
  }, [popoutImage])

  // Mouse over event listeners
  useEffect(() => {
    window.addEventListener("mousemove", setMousePositionFunc);

    return () => window.removeEventListener("mousemove", setMousePositionFunc);
  }, []);
  // Image size measuring
  const popoutImageRef = useRef();
  const popoutImageRefCurrent = popoutImageRef.current;

  const height = popoutImageRefCurrent
    ? popoutImageRefCurrent.clientHeight
    : 458;
  const width = popoutImageRefCurrent ? popoutImageRefCurrent.clientWidth : 458;

  return (
    isBrowser && (
      <Fragment>
        {show && (
          <div className="popout-image">
            <img
              className="popout-image__element"
              ref={popoutImageRef}
              src={popoutImage}
              alt=""
              style={{
                transform: `translate(${
                  x < window.innerWidth / 2 ? x : x - width
                }px,${y - height / 2}px)`,
                height: `${height / width > 1 ? "80%" : "auto"}`,
                width: `${height / width > 1 ? "auto" : "50%"}`,
              }}
            />
          </div>
        )}
      </Fragment>
    )
  );
};

export default PopoutImage;
