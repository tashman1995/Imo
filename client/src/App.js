import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Modals from "./components/Modals/Modals";
import PrivateRoute from "./components/routing/PrivateRoute";
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
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />

          <section className="container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/posts" component={Posts} />
            </Switch>
            <Route path="/" component={Modals} />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
