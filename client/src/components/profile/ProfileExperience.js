import React, { Fragment } from "react";
import Moment from "react-moment";
import ProfileTable from "./ProfileTable";

const ProfileExperience = ({ profile: { experience } }) => {
  const experiences = experience.map((exp, index) => {
    return (
      <Fragment key={exp._id}>
        <tr className="profile-table__row">
          <td className="paragraph">{index + 1}.</td>
          <td className="paragraph paragraph--bold">{exp.title}</td>
          <td className="paragraph">
            <p className="paragraph paragraph--bold">Type:</p>
            <p className="paragraph ">
              {exp.paid === false ? "Unpaid" : "Paid"}
            </p>
          </td>

          <td className="paragraph">
            <div className="profile-table__from-date">
              <p className="paragraph paragraph--bold">From:</p>
              <p className="paragraph ">
                <Moment format="MM/YYYY">{exp.from}</Moment>
              </p>
            </div>
            <div className="profile-table__mobile">
              <p className="paragraph">
                <span className="paragraph--bold">From:&nbsp;</span>{" "}
                <Moment format="MM/YYYY">{exp.from}</Moment>
              </p>
              <p className="paragraph">
                <span className="paragraph--bold">To:&nbsp;</span>{" "}
                {exp.to === null ? (
                  " Now"
                ) : (
                  <Moment format="MM/YYYY">{exp.to}</Moment>
                )}
              </p>
            </div>
          </td>
          <td className="paragraph profile-table__to">
            <p className="paragraph paragraph--bold">To:</p>
            <p className="paragraph ">
              {exp.to === null ? (
                " Now"
              ) : (
                <Moment format="MM/YYYY">{exp.to}</Moment>
              )}
            </p>
          </td>

          <td className="paragraph paragraph--bold profile-table__description">
            {" "}
            <p className="paragraph paragraph--bold">Description: </p>
            <p className="paragraph ">{exp.description}</p>
          </td>
        </tr>
        <tr className="profile-table__mobile">
          <td className="profile-table__mobile-description" colSpan="4">
            <p className="paragraph paragraph--bold">Description:&nbsp;</p>
            <p className="paragraph ">{exp.description}</p>
          </td>
        </tr>
      </Fragment>
    );
  });
  return (
    <ProfileTable title="Professional Experience">{experiences}</ProfileTable>
  );
};

export default ProfileExperience;
