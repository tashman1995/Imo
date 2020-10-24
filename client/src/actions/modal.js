import {
   OPEN_ADD_EDU_MODAL, CLOSE_ADD_EDU_MODAL,
   OPEN_EDIT_EDU_MODAL, CLOSE_EDIT_EDU_MODAL,
   OPEN_ADD_EXP_MODAL, CLOSE_ADD_EXP_MODAL,
   OPEN_EDIT_EXP_MODAL, CLOSE_EDIT_EXP_MODAL,
   OPEN_ADD_PROFILE_MODAL, CLOSE_ADD_PROFILE_MODAL,
   OPEN_EDIT_PROFILE_MODAL, CLOSE_EDIT_PROFILE_MODAL,
   OPEN_EDIT_SOCIALMEDIA_MODAL, CLOSE_EDIT_SOCIALMEDIA_MODAL,
  } from "../actions/types";

////////////////////////////////////////////////////////////
// Education Modal
////////////////////////////////////////////////////////////

// Open add Edu modal
export const openAddEduModal = () => dispatch => {
    dispatch({
        type: OPEN_ADD_EDU_MODAL
    })
}


// Close add Edu modal
export const closeAddEduModal = () => dispatch => {
    dispatch({
        type: CLOSE_ADD_EDU_MODAL
    })
}

// Open edit Edu modal
export const openEditEduModal = () => dispatch => {
    dispatch({
        type: OPEN_EDIT_EDU_MODAL
    })
}


// Close edit Edu modal
export const closeEditEduModal = () => dispatch => {
    dispatch({
        type: CLOSE_EDIT_EDU_MODAL
    })
}


////////////////////////////////////////////////////////////
// Experience Modal
////////////////////////////////////////////////////////////

// Open add Experience modal
export const openAddExpModal = () => dispatch => {
    dispatch({
        type: OPEN_ADD_EXP_MODAL
    })
}


// Close add Experience modal
export const closeAddExpModal = () => dispatch => {
    dispatch({
        type: CLOSE_ADD_EXP_MODAL
    })
}

// Open edit Experience modal
export const openEditExpModal = () => dispatch => {
    dispatch({
        type: OPEN_EDIT_EXP_MODAL
    })
}


// Close edit experience modal
export const closeEditExpModal = () => dispatch => {
    dispatch({
        type: CLOSE_EDIT_EXP_MODAL
    })
}

////////////////////////////////////////////////////////////
// Profile Modal
////////////////////////////////////////////////////////////

// Open add Profile modal
export const openAddProfileModal = () => dispatch => {
    dispatch({
        type: OPEN_ADD_PROFILE_MODAL
    })
}


// Close add Profile modal
export const closeAddProfileModal = () => dispatch => {
    dispatch({
        type: CLOSE_ADD_PROFILE_MODAL
    })
}

// Open edit Profile modal
export const openEditProfileModal = () => dispatch => {
    dispatch({
        type: OPEN_EDIT_PROFILE_MODAL
    })
}


// Close edit Profile modal
export const closeEditProfileModal = () => dispatch => {
    dispatch({
        type: CLOSE_EDIT_PROFILE_MODAL
    })
}

////////////////////////////////////////////////////////////
//  Social Media Modal
////////////////////////////////////////////////////////////

// Open edit Social Media modal
export const openEditSocialMediaModal = () => dispatch => {
    dispatch({
        type: OPEN_EDIT_SOCIALMEDIA_MODAL
    })
}


// Close edit Social Media modal
export const closeEditSocialMediaModal = () => dispatch => {
    dispatch({
        type: CLOSE_EDIT_SOCIALMEDIA_MODAL
    })
}