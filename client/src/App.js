import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/forms/CreateProfile";
import EditProfile from "./components/forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import AddExperience from "./components/forms/AddExperience";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfileModal from "./components/Modals/EditProfileModal";
import AddProfileModal from "./components/Modals/AddProfileModal";
import EditEducationModal from "./components/Modals/EditEducationModal";
import AddEducationModal from "./components/Modals/AddEducationModal";
import EditExperienceModal from "./components/Modals/EditExperienceModal";
import AddExperienceModal from "./components/Modals/AddExperienceModal";
import EditSocialMediaModal from "./components/Modals/EditSocialMediaModal";
import AddNewPostModal from "./components/Modals/AddNewPostModal";
import ShowPostModal from "./components/Modals/ShowPostModal/index.js";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Empty set of brackets ensures this only loads once
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Route exact path="/" component={Landing} />
          {/* <EditProfileModal />
          <AddProfileModal width={70} />
          <EditEducationModal />
          <AddEducationModal />
          <EditExperienceModal />
          <AddExperienceModal />
          <EditSocialMediaModal /> */}
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute exact path="/posts" component={Posts} />

              {/* <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation} */}
              {/* /> */}
            </Switch>
            <Route path="/" component={EditProfileModal} />
            <Route path="/" component={AddProfileModal} />
            <Route path="/" component={EditEducationModal} />
            <Route path="/" component={AddEducationModal} />
            <Route path="/" component={EditExperienceModal} />
            <Route path="/" component={AddExperienceModal} />
            <Route path="/" component={EditSocialMediaModal} />
            <Route path="/" component={AddNewPostModal} />
            <Route path="/" component={ShowPostModal} />
        
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
