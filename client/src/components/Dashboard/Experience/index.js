import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.title}</td>

      <td>
        <Moment format="YYYY/MM">{exp.from}</Moment>
      </td>
      <td>
        {" "}
        {exp.to === null ? " Now" : <Moment format="YYYY/MM">{exp.to}</Moment>}
      </td>
      <td>
        <button className="btn btn--table">Edit</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className="user-experience">
        <div className="user-education__heading">
          <h2 className="heading-secondary">Experience</h2>
          <button className="btn btn--table">
            <i className="fa fa-plus" aria-hidden="true"></i>Add New{" "}
          </button>
        </div>

        <table className="user-education__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
