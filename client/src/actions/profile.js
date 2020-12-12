import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  PROFILE_EDIT_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
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
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "warning", "profile"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("website", formData.website);
    data.append("location", formData.location);
    data.append("status", formData.status);
    data.append("subjects", formData.subjects);
    data.append("bio", formData.bio);
    data.append("equipment", formData.equipment);
    data.append("youtube", formData.youtube);
    data.append("twitter", formData.twitter);
    data.append("instagram", formData.instagram);
    data.append("linkedin", formData.linkedin);
    data.append("facebook", formData.facebook);
    data.append("behance", formData.behance);
    data.append("avatar", formData.avatar);

    const res = await axios.post("/api/profile", data, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }

    dispatch({
      type: CLOSE_ADD_PROFILE_MODAL,
    });
    dispatch({
      type: CLOSE_EDIT_PROFILE_MODAL,
    });
    dispatch({
      type: CLOSE_EDIT_SOCIALMEDIA_MODAL,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger", error.param))
      );
    }

    dispatch({
      type: PROFILE_EDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: CLOSE_ADD_EXP_MODAL,
    });

    dispatch(setAlert("Experience Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger", error.param))
      );
    }

    dispatch({
      type: PROFILE_EDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Experience
export const editExperience = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/profile/experience/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: CLOSE_ADD_EXP_MODAL,
    });
    dispatch({
      type: CLOSE_EDIT_EXP_MODAL,
    });

    dispatch(setAlert("Experience Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger", error.param))
      );
    }

    dispatch({
      type: PROFILE_EDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: CLOSE_EDIT_EXP_MODAL,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    console.log("run update");
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: CLOSE_ADD_EDU_MODAL,
    });

    dispatch(setAlert("Education Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger", error.param))
      );
    }

    dispatch({
      type: PROFILE_EDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Education
export const editEducation = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/profile/education/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: CLOSE_EDIT_EDU_MODAL,
    });

    dispatch(setAlert("Education Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger", error.param))
      );
    }
    dispatch({
      type: PROFILE_EDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: CLOSE_EDIT_EDU_MODAL,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Account and Profile
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This can not be undone.")) {
    try {
      await axios.delete("/api/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Your account has been deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

////////////////////////////////////////////////////////////
// Education Modal
////////////////////////////////////////////////////////////

// Open add Edu modal
export const openAddEduModal = () => (dispatch) => {
  dispatch({
    type: OPEN_ADD_EDU_MODAL,
  });
};

// Close add Edu modal
export const closeAddEduModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_ADD_EDU_MODAL,
  });
};

// Open edit Edu modal
export const openEditEduModal = (id) => (dispatch) => {
  dispatch({
    type: OPEN_EDIT_EDU_MODAL,
    payload: id,
  });
};

// Close edit Edu modal
export const closeEditEduModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_EDIT_EDU_MODAL,
  });
};

////////////////////////////////////////////////////////////
// Experience Modal
////////////////////////////////////////////////////////////

// Open add Experience modal
export const openAddExpModal = () => (dispatch) => {
  dispatch({
    type: OPEN_ADD_EXP_MODAL,
  });
};

// Close add Experience modal
export const closeAddExpModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_ADD_EXP_MODAL,
  });
};

// Open edit Experience modal
export const openEditExpModal = (id) => (dispatch) => {
  dispatch({
    type: OPEN_EDIT_EXP_MODAL,
    payload: id,
  });
};

// Close edit experience modal
export const closeEditExpModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_EDIT_EXP_MODAL,
  });
};

////////////////////////////////////////////////////////////
// Profile Modal
////////////////////////////////////////////////////////////

// Open add Profile modal
export const openAddProfileModal = () => (dispatch) => {
  dispatch({
    type: OPEN_ADD_PROFILE_MODAL,
  });
};

// Close add Profile modal
export const closeAddProfileModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_ADD_PROFILE_MODAL,
  });
};

// Open edit Profile modal
export const openEditProfileModal = () => (dispatch) => {
  dispatch({
    type: OPEN_EDIT_PROFILE_MODAL,
  });
};

// Close edit Profile modal
export const closeEditProfileModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_EDIT_PROFILE_MODAL,
  });
};

////////////////////////////////////////////////////////////
//  Social Media Modal
////////////////////////////////////////////////////////////

// Open edit Social Media modal
export const openEditSocialMediaModal = () => (dispatch) => {
  dispatch({
    type: OPEN_EDIT_SOCIALMEDIA_MODAL,
  });
};

// Close edit Social Media modal
export const closeEditSocialMediaModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_EDIT_SOCIALMEDIA_MODAL,
  });
};
