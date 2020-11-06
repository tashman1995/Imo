import {
  OPEN_ADD_EDU_MODAL,
  CLOSE_ADD_EDU_MODAL,
  OPEN_EDIT_EDU_MODAL,
  CLOSE_EDIT_EDU_MODAL,
  OPEN_ADD_EXP_MODAL,
  CLOSE_ADD_EXP_MODAL,
  OPEN_EDIT_EXP_MODAL,
  CLOSE_EDIT_EXP_MODAL,
  OPEN_ADD_PROFILE_MODAL,
  CLOSE_ADD_PROFILE_MODAL,
  OPEN_EDIT_PROFILE_MODAL,
  CLOSE_EDIT_PROFILE_MODAL,
  OPEN_EDIT_SOCIALMEDIA_MODAL,
  CLOSE_EDIT_SOCIALMEDIA_MODAL,
} from "../actions/types";

const initialState = {
  addEduModal: false,
  editEduModal: false,
  addExpModal: false,
  editExpModal: false,
  addProfileModal: false,
  editProfileModal: false,
  editSocialMediaModal: false,
  tempEducationId: null,
  tempExperienceId: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Education Modals
    case CLOSE_ADD_EDU_MODAL:
      return {
        addEduModal: false,
        loading: false,
      };
    case OPEN_ADD_EDU_MODAL:
      return {
        addEduModal: true,
        loading: false,
      };
    case CLOSE_EDIT_EDU_MODAL:
      return {
        editEduModal: false,
        tempEducationId: null,
        loading: false,
      };
    case OPEN_EDIT_EDU_MODAL:
      return {
        editEduModal: true,
        tempEducationId: payload,
        loading: false,
      };

    // Experience Modals
    case CLOSE_ADD_EXP_MODAL:
      return {
        addExpModal: false,
        loading: false,
      };
    case OPEN_ADD_EXP_MODAL:
      return {
        addExpModal: true,
        loading: false,
      };
    case CLOSE_EDIT_EXP_MODAL:
      return {
        editExpModal: false,
        tempExperienceId: null,
        loading: false,
      };
    case OPEN_EDIT_EXP_MODAL:
      return {
        editExpModal: true,
        tempExperienceId: payload,
        loading: false,
      };

    // Profile Modals
    case CLOSE_ADD_PROFILE_MODAL:
      return {
        addProfileModal: false,
        loading: false,
      };
    case OPEN_ADD_PROFILE_MODAL:
      return {
        addProfileModal: true,
        loading: false,
      };
    case CLOSE_EDIT_PROFILE_MODAL:
      return {
        editProfileModal: false,
        loading: false,
      };
    case OPEN_EDIT_PROFILE_MODAL:
      return {
        editProfileModal: true,
        loading: false,
      };

    // Social Media Modal
    case CLOSE_EDIT_SOCIALMEDIA_MODAL:
      return {
        editSocialMediaModal: false,
        loading: false,
      };
    case OPEN_EDIT_SOCIALMEDIA_MODAL:
      return {
        editSocialMediaModal: true,
        loading: false,
      };


    default:
      return state;
  }
}
