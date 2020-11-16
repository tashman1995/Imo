import {  REMOVE_ALL_MODALS } from "../actions/types";
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    
    case REMOVE_ALL_MODALS:
      return (state = []);

    default:
      return state;
  }
}
