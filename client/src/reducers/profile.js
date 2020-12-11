import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
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
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  addEduModal: false,
  editEduModal: false,
  addExpModal: false,
  editExpModal: false,
  addProfileModal: false,
  editProfileModal: false,
  editSocialMediaModal: false,
  tempEducationId: null,
  tempExperienceId: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile: "not found",
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case CLOSE_ADD_EDU_MODAL:
      return {
        ...state,
        addEduModal: false,
        loading: false,
      };
    case OPEN_ADD_EDU_MODAL:
      return {
        ...state,
        addEduModal: true,
        loading: false,
      };
    case CLOSE_EDIT_EDU_MODAL:
      return {
        ...state,
        editEduModal: false,
        tempEducationId: null,
        loading: false,
      };
    case OPEN_EDIT_EDU_MODAL:
      return {
        ...state,
        editEduModal: true,
        tempEducationId: payload,
        loading: false,
      };

    // Experience Modals
    case CLOSE_ADD_EXP_MODAL:
      return {
        ...state,
        addExpModal: false,
        loading: false,
      };
    case OPEN_ADD_EXP_MODAL:
      return {
        ...state,
        addExpModal: true,
        loading: false,
      };
    case CLOSE_EDIT_EXP_MODAL:
      return {
        ...state,
        editExpModal: false,
        tempExperienceId: null,
        loading: false,
      };
    case OPEN_EDIT_EXP_MODAL:
      return {
        ...state,
        editExpModal: true,
        tempExperienceId: payload,
        loading: false,
      };

    // Profile Modals
    case CLOSE_ADD_PROFILE_MODAL:
      return {
        ...state,
        addProfileModal: false,
        loading: false,
      };
    case OPEN_ADD_PROFILE_MODAL:
      return {
        ...state,
        addProfileModal: true,
        loading: false,
      };
    case CLOSE_EDIT_PROFILE_MODAL:
      return {
        ...state,
        editProfileModal: false,
        loading: false,
      };
    case OPEN_EDIT_PROFILE_MODAL:
      return {
        ...state,
        editProfileModal: true,
        loading: false,
      };

    // Social Media Modal
    case CLOSE_EDIT_SOCIALMEDIA_MODAL:
      return {
        ...state,
        editSocialMediaModal: false,
        loading: false,
      };
    case OPEN_EDIT_SOCIALMEDIA_MODAL:
      return {
        ...state,
        editSocialMediaModal: true,
        loading: false,
      };
    default:
      return state;
  }
}
