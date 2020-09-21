import {OPEN_ADD_EDU_MODAL, CLOSE_ADD_EDU_MODAL} from "../actions/types";

const initialState = {
  addEduModal: false,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
     

    default:
      return state;
  }
}