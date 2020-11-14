import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { animated, useTransition } from "react-spring";
import Modal from "./Modal";

//Components;
import AddEducation from "../forms/AddEducation";
import EditEducation from "../forms/EditEducation";
import AddExperience from "../forms/AddExperience";
import EditExperience from "../forms/EditExperience";
import CreateProfile from "../forms/CreateProfile";
import EditProfile from "../forms/EditProfile";
import EditSocialMedia from "../forms/EditSocialMedia";
import AddNewPost from "../forms/AddNewPost";
import ShowPost from "../posts/ShowPost";

// actions
import {
  closeAddEduModal,
  closeAddExpModal,
  closeEditEduModal,
  closeEditExpModal,
  closeAddProfileModal,
  closeEditProfileModal,
  closeEditSocialMediaModal,
} from "../../actions/profile";

import { closeShowPostModal, closeNewPostModal } from "../../actions/post";

const Modals = ({
  profile: {
    addEduModal,
    addExpModal,
    editEduModal,
    editExpModal,
    addProfileModal,
    editProfileModal,
    editSocialMediaModal,
    tempEducationId,
    tempExperienceId,
  },
  post: { addNewPostModal, showPostModal },
  closeAddEduModal,
  closeAddExpModal,
  closeEditEduModal,
  closeEditExpModal,
  closeNewPostModal,
  closeShowPostModal,
  closeAddProfileModal,
  closeEditProfileModal,
  closeEditSocialMediaModal,
}) => {
  useEffect(() => {
    console.log('change')
    setModals([
      {
        state: addEduModal,
        close: closeAddEduModal,
        element: <AddEducation />,
        width: "50",
      },
      {
        state: editEduModal,
        close: closeEditEduModal,
        element: <EditEducation educationId={tempEducationId} />,
        width: "50",
      },
      {
        state: addExpModal,
        close: closeAddExpModal,
        element: <AddExperience />,
        width: "50",
      },
      {
        state: editExpModal,
        close: closeEditExpModal,
        element: <EditExperience experienceId={tempExperienceId} />,
        width: "50",
      },
      {
        state: addProfileModal,
        close: closeAddProfileModal,
        element: <CreateProfile />,
        width: "70",
      },
      {
        state: editProfileModal,
        close: closeEditProfileModal,
        element: <EditExperience experienceId={tempExperienceId} />,
        width: "70",
      },
      {
        state: editSocialMediaModal,
        close: closeEditSocialMediaModal,
        element: <EditSocialMedia />,
        width: "70",
      },
      {
        state: addNewPostModal,
        close: closeNewPostModal,
        element: <AddNewPost />,
        width: "80",
      },
      {
        state: showPostModal,
        close: closeShowPostModal,
        element: <AddNewPost />,
        width: "95",
        maxWidth: "150",
      },
    ]);
  }, [
    addEduModal,
    addExpModal,
    editEduModal,
    editExpModal,
    addProfileModal,
    editProfileModal,
    editSocialMediaModal,
    tempEducationId,
    tempExperienceId,
    addNewPostModal,
    showPostModal,
  ]);

  const [modals, setModals] = useState([]);

  const transitions = useTransition(modals, modal => modal.state, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 400,
    },
  });

  return transitions.map(
    ({ item, key, props }) =>
      item.state && (
        <animated.div key={key} style={props}>
          <Modal
            modal={item.state}
            closeModal={item.close}
            width={item.width}
            maxWidth={item.maxWidth}>
            {item.element}
           
          </Modal>
        </animated.div>
      )
  );

  // return (
  //   <Fragment>
  //     {/* ADD EDUCATION */}
  //     {addEduModal && (
  //       <Modal modal={addEduModal} closeModal={closeAddEduModal}>
  //         <AddEducation />
  //       </Modal>
  //     )}

  //     {/* EDIT EDUCATION */}
  //     {editEduModal && (
  //       <Modal modal={editEduModal} closeModal={closeEditEduModal} width="70">
  //         <EditEducation educationId={tempEducationId} />
  //       </Modal>
  //     )}

  //     {/* ADD EXPERIENCE */}
  //     {addExpModal && (
  //       <Modal modal={addExpModal} closeModal={closeAddExpModal}>
  //         <AddExperience />
  //       </Modal>
  //     )}

  //     {/* EDIT EXPERIENCE */}
  //     {editExpModal && (
  //       <Modal modal={editExpModal} closeModal={closeEditExpModal} width="70">
  //         <EditExperience experienceId={tempExperienceId} />
  //       </Modal>
  //     )}

  //     {/* ADD PROFILE */}
  //     {addProfileModal && (
  //       <Modal
  //         modal={addProfileModal}
  //         closeModal={closeAddProfileModal}
  //         width="70">
  //         <CreateProfile />
  //       </Modal>
  //     )}

  //     {/* EDIT PROFILE */}
  //     {editProfileModal && (
  //       <Modal
  //         modal={editProfileModal}
  //         closeModal={closeEditProfileModal}
  //         width="70">
  //         <EditProfile />
  //       </Modal>
  //     )}

  //     {/* EDIT SOCIAL MEDIA */}
  //     {editSocialMediaModal && (
  //       <Modal
  //         modal={editSocialMediaModal}
  //         closeModal={closeEditSocialMediaModal}
  //         width="70">
  //         <EditSocialMedia />
  //       </Modal>
  //     )}

  //     {/* NEW POST MODAL */}
  //     {addNewPostModal && (
  //       <Modal
  //         modal={addNewPostModal}
  //         closeModal={closeNewPostModal}
  //         width={80}>
  //         <AddNewPost />;
  //       </Modal>
  //     )}

  //     {/* SHOW POST */}
  //     {showPostModal && (
  //       <Modal
  //         modal={showPostModal}
  //         closeModal={closeShowPostModal}
  //         width="95"
  //         maxWidth="150">
  //         <ShowPost />
  //       </Modal>
  //     )}
  //   </Fragment>
  // );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

Modals.propTypes = {
  closeAddEduModal: PropTypes.func.isRequired,
  closeAddExpModal: PropTypes.func.isRequired,
  closeEditEduModal: PropTypes.func.isRequired,
  closeEditExpModal: PropTypes.func.isRequired,
  closeAddProfileModal: PropTypes.func.isRequired,
  closeEditProfileModal: PropTypes.func.isRequired,
  closeShowPostModal: PropTypes.func.isRequired,
  closeNewPostModal: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  closeAddEduModal,
  closeAddExpModal,
  closeEditEduModal,
  closeEditExpModal,
  closeAddProfileModal,
  closeEditProfileModal,
  closeEditSocialMediaModal,
  closeShowPostModal,
  closeNewPostModal,
})(Modals);
