import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../../actions/profile";
import { openEditEduModal, closeEditEduModal } from "../../../actions/modal";
import EditEducation from "../../profile-form/EditEducation";
import { animated, useTransition } from "react-spring";
import { CenterModal } from "react-spring-modal";

const Education = ({
  education,
  openAddEduModal,
  openEditEduModal,
  closeEditEduModal,
  modal: { editEduModal },
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
            setEditEducationId(edu._id);
            openEditEduModal();
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  ));

  // const openEditEduModal = (id) => {
  //   setEditEducationId(id);
  //   setEditEduOpen(true);
  // };

  // const [editEduOpen, setEditEduOpen] = useState(false);
  const [editEducationId, setEditEducationId] = useState("");

  // const closeEditEduModal = () => {
  //   setEditEduOpen(false);
  // };

  const fade = useTransition(openEditEduModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

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

      <CenterModal isOpen={editEduModal} onRequestClose={closeEditEduModal}>
        {fade.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <EditEducation
                  educationId={editEducationId}
                  closeEditEduModal={closeEditEduModal}
                />
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
  openEditEduModal: PropTypes.func.isRequired,
  closeEditEduModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, {
  deleteEducation,
  openEditEduModal,
  closeEditEduModal,
})(Education);
