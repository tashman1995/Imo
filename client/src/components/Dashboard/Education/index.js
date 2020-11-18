import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation, openEditEduModal } from "../../../actions/profile";

const Education = ({
  education,
  openAddEduModal,
  openEditEduModal,
 
}) => {
  const educations = education.map((edu) => (
    <tr className="dashboard-table__name" key={edu._id}>
      <td className="paragraph">{edu.title}</td>
      <td className="paragraph">{edu.location}</td>
      <td className="paragraph">
        <Moment format="YYYY/MM">{edu.from}</Moment>
      </td>
      <td className="paragraph">
        {" "}
        {edu.to === null ? (
          "Current"
        ) : (
          <Moment format="YYYY/MM">{edu.to}</Moment>
        )}
      </td>
      <td className="paragraph">
        <button
          className="btn btn--table"
          onClick={() => {
            openEditEduModal(edu._id);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  ));




  return (
    <Fragment>
      <section className="user-education dashboard-table">
        <div className="dashboard-table__heading">
          <h2 className="heading-secondary">Education</h2>
          <button className="btn btn--table" onClick={openAddEduModal}>
            <i className="fa fa-plus" aria-hidden="true"></i>Add New{" "}
          </button>
        </div>

        <table className="dashboard-table__table">
          <thead>
            <tr>
              <th className="heading-tertiary">Course</th>
              <th className="heading-tertiary">Location</th>
              <th className="heading-tertiary">Start Date</th>
              <th className="heading-tertiary">End Date</th>
              <th className="heading-tertiary"></th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </section>

  
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  openEditEduModal: PropTypes.func.isRequired,
  
};


export default connect(null, {
  deleteEducation,
  openEditEduModal,
  
})(Education);
