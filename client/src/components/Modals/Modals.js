import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import Modal from "./Modal";
import InnerModal from "./InnerModal";
import { animated, useTransition } from "react-spring";

//Components;
import Fade from "../layout/Fade";
import Scale from "../layout/Scale";
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
  // MODAL FADE TRANSITIONS
  const transitionConfig1 = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 400,
    },
  };

  const fade = useTransition(addEduModal, null, transitionConfig1);
  const addEduModalFade = useTransition(addEduModal, null, transitionConfig1);
  const addExpModalFade = useTransition(addExpModal, null, transitionConfig1);
  const editEduModalFade = useTransition(editEduModal, null, transitionConfig1);
  const editExpModalFade = useTransition(editExpModal, null, transitionConfig1);
  const addProfileModalFade = useTransition(
    addProfileModal,
    null,
    transitionConfig1
  );
  const editProfileModalFade = useTransition(
    editProfileModal,
    null,
    transitionConfig1
  );
  const editSocialMediaModalFade = useTransition(
    editSocialMediaModal,
    null,
    transitionConfig1
  );
  const tempEducationIdFade = useTransition(
    tempEducationId,
    null,
    transitionConfig1
  );
  const tempExperienceIdFade = useTransition(
    tempExperienceId,
    null,
    transitionConfig1
  );
  const addNewPostModalFade = useTransition(
    addNewPostModal,
    null,
    transitionConfig1
  );
  const showPostModalFade = useTransition(
    showPostModal,
    null,
    transitionConfig1
  );

  return (
    <Fragment>
      {/* ADD EDUCATION */}
      <Fade trigger={addEduModal} className="modal">
        <Modal modal={addEduModal}>
          <Scale trigger={addEduModal}>
            <InnerModal
              width="70"
              modal={addEduModal}
              closeModal={closeAddEduModal}>
              <AddEducation closeAddEduModal={closeAddEduModal} />
            </InnerModal>
          </Scale>
        </Modal>
      </Fade>

      {/* EDIT EDUCATION */}
      {editEduModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={editEduModal}>
                <InnerModal
                  width="70"
                  modal={editEduModal}
                  closeModal={closeEditEduModal}>
                  <EditEducation educationId={tempEducationId} />
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}

      {/* ADD EXPERIENCE */}
      {addExpModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={addExpModal}>
                <InnerModal
                  width="70"
                  modal={addExpModal}
                  closeModal={closeAddExpModal}>
                  <AddExperience />
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}

      {/* EDIT EXPERIENCE */}
      {editExpModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={editExpModal}>
                <InnerModal
                  width="70"
                  modal={editExpModal}
                  closeModal={closeEditExpModal}>
                  <EditExperience experienceId={tempExperienceId} />
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}

      {/* ADD PROFILE */}
      {addProfileModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={addProfileModal}>
                <InnerModal
                  width="70"
                  modal={editProfileModal}
                  closeModal={closeEditProfileModal}>
                  <CreateProfile />
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}

      {/* EDIT PROFILE */}
      {addExpModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={editProfileModal}>
                <InnerModal
                  width="70"
                  modal={editProfileModal}
                  closeModal={closeEditProfileModal}>
                  <EditProfile />
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}

      {/* EDIT SOCIAL MEDIA */}
      {addExpModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={editSocialMediaModal}>
                <InnerModal
                  width="70"
                  modal={editSocialMediaModal}
                  closeModal={closeEditSocialMediaModal}>
                  <EditSocialMedia />
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}

      {/* NEW POST MODAL */}
      {addExpModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={addNewPostModal}>
                <InnerModal
                  width="80"
                  modal={addNewPostModal}
                  closeModal={closeNewPostModal}>
                  <AddNewPost closeNewPostModal={closeNewPostModal} />;
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}

      {/* SHOW POST */}
      {addExpModalFade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="modal" key={key} style={props}>
              <Modal modal={showPostModal}>
                <InnerModal
                  width="95"
                  maxWidth="150"
                  modal={showPostModal}
                  closeModal={closeShowPostModal}>
                  <ShowPost />
                </InnerModal>
              </Modal>
            </animated.div>
          )
      )}
    </Fragment>
  );
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
