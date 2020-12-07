import React, { Fragment, useState, useEffect, useRef } from "react";
import "./styles.scss";
import { isBrowser } from "react-device-detect";

const PopoutImage = ({ popoutImage }) => {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { x, y } = mousePosition;
  // Mouse over event listeners
  useEffect(() => {
    window.addEventListener("mousemove", (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY })
    );

    return window.removeEventListener("mousemove", (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY })
    );
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
        {popoutImage !== "" && (
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
