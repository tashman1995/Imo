import React, { useState, useRef } from "react";
import { useTransition, animated } from "react-spring";
import useComponentSize from "@rehooks/component-size";
import "./Select.scss";

const menuItems = ["Home", "Profile", "Order History", "Sign out"];

const Select = ({ options }) => {
  const [menuOpen, set] = useState(false);
  const ref = useRef(null);
  const { height } = useComponentSize(ref);

  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleBtnClick = () => set(!menuOpen);

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
  });

  return (
    <div className="options">
      <div className="options__selected" onClick={handleBtnClick}>
        <h3 className="heading-tertiary">{selectedValue}</h3>
      </div>

      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <animated.div
              className="options__dropdown"
              style={{
                ...props,
                overflow: "hidden",
                // position: "relative",
              }}
              
              key={key}>
              <div ref={ref}>
                {options.map((menuItem, index) => (
                  <div className="menuItem" key={index}>
                    {menuItem}
                  </div>
                ))}
              </div>
            </animated.div>
          )
      )}
    </div>
  );
};

export default Select;
