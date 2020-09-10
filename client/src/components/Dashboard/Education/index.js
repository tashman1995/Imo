import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../../actions/profile";

const Education = ({ education, deleteEducation, openAddEduModal }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.title}</td>
      <td>{edu.location}n</td>
      <td>
        <Moment format="YYYY/MM">{edu.from}</Moment>
      </td>
      <td>
        {" "}
        {edu.to === null ? " Now" : <Moment format="YYYY/MM">{edu.to}</Moment>}
      </td>
      <td>
        <button className="btn btn--table">Edit</button>
        {/* <button onClick={() => deleteEducation(edu.id)}>Delete</button> */}
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <div className="user-education">
        <div className="user-education__heading">
          <h2 className="heading-secondary">Education</h2>
          <button className="btn btn--table" onClick={openAddEduModal}>
            <i className="fa fa-plus" aria-hidden="true"></i>Add New{" "}
          </button>
        </div>

        <table className="user-education__table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           {educations}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
