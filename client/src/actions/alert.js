import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from "./types";

export const setAlert = (
  msg,
  alertType,
  param = "general",
  timeout = 10000
) => (dispatch) => {
  // Generate random id
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, param, id },
  });

  // setTimeout(() => {
  //   dispatch({
  //     type: REMOVE_ALL_ALERTS,
  //     payload: id,
  //   });
  // }, timeout);
};

export const clearAlerts = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_ALERTS,
  });
};
