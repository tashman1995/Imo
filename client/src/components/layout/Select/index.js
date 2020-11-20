import React, { useState, useRef, useEffect } from "react";
import { useTransition, animated, useSpring } from "react-spring";
import useComponentSize from "@rehooks/component-size";
import "./Select.scss";

const Select = ({
  options,
  initiallySelectedOption,
  width = "15rem",
  placeholder,
  setFunction,
}) => {
  const [menuOpen, set] = useState(false);
  const ref = useRef(null);
  const { height } = useComponentSize(ref);
  const selectedRef = useRef(null);
  const selectedSize = useComponentSize(selectedRef);
  const outerElement = useRef();

  const [selectedValue, setSelectedValue] = useState(
    initiallySelectedOption &&
    options[initiallySelectedOption].name
  );
  // Handling menu option click

  const handleBtnClick = (item) => {
    set(!menuOpen);
    setSelectedValue(item.name);
    setFunction(item.value);
    outerElement.current.blur();
  };

  // Text slide in transition

  const { transform, opacity } = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: menuOpen ? 1 : 0,
      transform: `translate3d(${menuOpen ? 0 : 10}px,0,0)`,
    },
  });

  // Menu Slide down transition

  const transitions = useTransition(menuOpen, null, {
    from: {
      height: 0,
    },
    enter: {
      height,
    },
    leave: {
      height: 0,
    },
    update: { height },
    config: {
      tension: 300
    }
  });

  // Handling close when click off element
  const handleClickOff = (e) => {
    if (outerElement.current.contains(e.target)) {
      //  exit if inside click
      return;
    }
    // outside click
    set(false);
    
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickOff);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  }, []);

  return (
    <div
      className="options"
      ref={outerElement}
      style={{ width: width }}
      tabIndex="0">
      <div
        className="options__selected"
        ref={selectedRef}
        onClick={() => set(!menuOpen)}>
        <p className="paragraph">
          {selectedValue ? selectedValue : placeholder}
        </p>
        <i
          className={`fas fa-chevron-up options__chevron ${
            menuOpen && "u-rotate-180"
          }`}></i>
      </div>

      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <animated.div
              className="options__dropdown"
              style={{
                ...props,
                overflow: "hidden",
                marginTop: selectedSize.height + 4,
                width: width,

                // position: "relative",
              }}
              key={key}>
              <animated.div ref={ref} style={{ opacity }}>
                {options.map((menuItem, index) => (
                  <animated.div
                    style={{ transform }}
                    className="options__item"
                    onClick={() => {
                      handleBtnClick(menuItem);
                    }}
                    key={index}>
                    {menuItem.name}
                  </animated.div>
                ))}
              </animated.div>
            </animated.div>
          )
      )}
    </div>
  );
};

export default Select;
