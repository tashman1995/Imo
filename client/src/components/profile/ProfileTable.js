import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import SlideToggle from "../layout/SlideToggle";

const ProfileTable = ({ children, title }) => {
  // Open close Experience
  const [contentVisibility, toggleContentVisibility] = useState(true);

  return (
    <Fragment>
      <section className="profile-table">
        <div
          className="profile-table__heading"
          onClick={() => toggleContentVisibility(!contentVisibility)}>
          <h2 className="heading-secondary">{title}</h2>
          <div>
            <i
              className={`fas fa-angle-down fa-3x profile-table__icon   ${
                contentVisibility && "u-rotate-180"
              }`}></i>
          </div>
        </div>

        <SlideToggle isVisible={contentVisibility}>
          <table className="profile-table__table">
            <tbody>{children}</tbody>
          </table>
        </SlideToggle>
      </section>
    </Fragment>
  );
};

export default ProfileTable;
