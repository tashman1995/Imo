import {
   OPEN_ADD_EDU_MODAL, CLOSE_ADD_EDU_MODAL
  } from "../actions/types";

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