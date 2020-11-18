import React from "react";
import Moment from "react-moment";
import ProfileTable from "./ProfileTable";

const ProfileExperience = ({ profile: { experience } }) => {
  const experiences = experience.map((exp, index) => {
    return (
      <tr className="profile-table__row" key={exp._id}>
        <td className="paragraph">{index + 1}.</td>
        <td className="paragraph paragraph--bold">{exp.title}</td>

        <td className="paragraph">
          <p className="paragraph paragraph--bold">From:</p>
          <p className="paragraph ">
            <Moment format="YYYY/MM">{exp.from}</Moment>
          </p>
        </td>
        <td className="paragraph">
          <p className="paragraph paragraph--bold">To:</p>
          <p className="paragraph ">
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM">{exp.to}</Moment>
            )}
          </p>
        </td>
        <td className="paragraph">
          <p className="paragraph paragraph--bold">Type:</p>
          <p className="paragraph ">{exp.paid === false ? "Unpaid" : "Paid"}</p>
        </td>
        <td className="paragraph paragraph--bold">
          {" "}
          <p className="paragraph paragraph--bold">Description:</p>
          <p className="paragraph ">{exp.description}</p>
        </td>
      </tr>
    );
  });
  return (
    
      <ProfileTable title="Professional Experience">{experiences}</ProfileTable>
   
  );
};

export default ProfileExperience;
