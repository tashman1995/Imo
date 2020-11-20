import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { openEditExpModal, closeEditExpModal, deleteExperience } from "../../../actions/profile";

const Experience = ({ experience, openAddExpModal, openEditExpModal }) => {
  const experiences = experience.map((exp) => (
    <tr className="dashboard-table__name" key={exp._id}>
      <td className="paragraph">{exp.title}</td>

      <td className="paragraph dashboard-table__date">
        <Moment format="YYYY/MM">{exp.from}</Moment>
      </td>
      <td className="paragraph dashboard-table__date">
        {" "}
        {exp.to === null ? " Now" : <Moment format="YYYY/MM">{exp.to}</Moment>}
      </td>
      <td className="paragraph">{exp.paid === false ? "Unpaid" : "Paid"}</td>
      <td className="paragraph">
        <button
          className="btn btn--table"
          onClick={() => {
            openEditExpModal(exp._id);
          }}>
          Edit
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <section className="user-experience dashboard-table">
        <div className="dashboard-table__heading">
          <h2 className="heading-secondary">Professional Experience</h2>
          <button className="btn btn--table" onClick={openAddExpModal}>
            <i className="fa fa-plus" aria-hidden="true"></i>Add New{" "}
          </button>
        </div>

        <table className="dashboard-table__table">
          <thead>
            <tr>
              <th className="heading-tertiary">Title</th>
              <th className="heading-tertiary dashboard-table__date">
                Start Date
              </th>
              <th className="heading-tertiary dashboard-table__date">
                End Date
              </th>
              <th className="heading-tertiary">Payment</th>
              <th className="heading-tertiary"></th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </section>

      {/* <CenterModal isOpen={editExpModal} onRequestClose={closeEditExpModal}>
        {fade.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <EditExperience
                  experienceId={editExperienceId}
                  closeEditExpModal={closeEditExpModal}
                />
              </animated.div>
            )
        )}
      </CenterModal> */}
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  openEditExpModal: PropTypes.func.isRequired,
  closeEditExpModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, {
  deleteExperience,
  openEditExpModal,
  closeEditExpModal,
})(Experience);
