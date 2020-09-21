import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../../actions/profile";
import EditEducation from "../../profile-form/EditEducation";
import { animated, useTransition } from "react-spring";
import { CenterModal } from "react-spring-modal";

const Education = ({ education, deleteEducation, openAddEduModal }) => {

  const educations = education.map((edu) => (
    <tr className="user-education__name" key={edu._id}>
      <td>{edu.title}</td>
      <td>{edu.location}</td>
      <td>
        <Moment format="YYYY/MM">{edu.from}</Moment>
      </td>
      <td>
        {" "}
        {edu.to === null ? "Current" : <Moment format="YYYY/MM">{edu.to}</Moment>}
      </td>
      <td>
        <button className="btn btn--table" onClick={() => openEditEduModal(edu._id)}>Edit</button>
        {/* <button onClick={() => deleteEducation(edu.id)}>Delete</button> */}
      </td>
    </tr>
  ));

  const openEditEduModal = (id) => {
    setEditEducationId(id);
    setEditEduOpen(true);
  };

  const [editEduOpen, setEditEduOpen] = useState(false);
  const [editEducationId, setEditEducationId] = useState('');

  const closeEditEduModal = () => {
    setEditEduOpen(false);
  };

  const fade = useTransition(editEduOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const educatu = useTransition(educations, education => education._id, {
    from: { opacity: 0, height: "0px" },
    enter: { opacity: 0,height: "100%" },
    leave: { opacity: 0,height: "0px" },
  });

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
          <tbody>{educations}</tbody>
        </table>
      </div>

      <CenterModal
        isOpen={editEduOpen}
        onRequestClose={() => setEditEduOpen(false)}
      >
        {fade.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <EditEducation educationId = {editEducationId} closeEditEduModal={closeEditEduModal} />
              </animated.div>
            )
        )}
      </CenterModal>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
