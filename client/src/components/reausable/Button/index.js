import React from "react";
import "./Button.scss";
import { Link } from "react-router-dom";

const Button = ({ content, destination, classNames }) => {
  return (
    <Link to={destination} className={classNames + " btn"}>
      {content}
    </Link>
  );
};

export default Button;
