import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { openAddEduModal, closeAddEduModal } from "../../actions/modal";
import Spinner from "../reausable/Loading";
import Navbar from "../layout/Navbar";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { animated, useTransition } from "react-spring";
import AddEducation from "../profile-form/AddEducation";
import { CenterModal } from "react-spring-modal";
import "react-spring-modal/dist/index.css";
import "./Dashboard.scss";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  modal: {addEduModal},
  openAddEduModal,
  closeAddEduModal
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  // Add Education Modal
  // const [addEduOpen, setEduOpen] = useState(false);

  // const openAddEduModal = () => {
  //   setEduOpen(true);
  // };
  // const closeAddEduModal = () => {
  //   setEduOpen(false);
  // };

  const fade = useTransition(openAddEduModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });


  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar stage="2" />
      <Fragment>
        <div className="u-grid dash">
          {profile !== null ? (
            <Fragment>
              <CenterModal
                isOpen={addEduModal}
                onRequestClose={closeAddEduModal}
              >
                {fade.map(
                  ({ item, key, props }) =>
                    item && (
                      <animated.div 
                        key={key}
                         style={props}
                         >
                        <AddEducation 
                        closeAddEduModal={closeAddEduModal} 
                        />
                      </animated.div>
                     ) 
                )} 
              </CenterModal>
        

              <div className="user-info">
                <div className="user-info__intro">
                  <h1 className="heading-primary">
                    Welcome {user && user.name}
                  </h1>
                  {profile === null && (
                    <Fragment>
                      <h2 className="heading-secondary">
                        It doesn't look like you've set up your profile yet
                      </h2>
                      <Link to="/create-profile">Create Profile</Link>
                    </Fragment>
                  )}
                </div>
                <div className="user-info__table">
                  Name:
                  {user && user.name}
                </div>
              </div>
              <Education
                education={profile.education}
                openAddEduModal={openAddEduModal}
               
              />
              <Experience experience={profile.profExp} />
            </Fragment>
          ) : (
            <Fragment>
              <div className="user-info">
                <div className="user-info__intro">
                  <h1 className="heading-primary">
                    Welcome {user && user.name}
                  </h1>
                  {profile === null && (
                    <Fragment>
                      <h2 className="heading-secondary">
                        It doesn't look like you've set up your profile yet
                      </h2>
                      <Link to="/create-profile">Create Profile</Link>
                    </Fragment>
                  )}
                </div>
                <div className="user-info__table">
                  Name:
                  {user && user.name}
                </div>
              </div>
              <div className="user-experience">
                <div className="user-education__heading">
                  <h2 className="heading-secondary">Experience</h2>
                  <button className="btn btn--table">
                    <i className="fa fa-plus" aria-hidden="true"></i>Add New{" "}
                  </button>
                </div>

                <table className="user-education__table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Payment</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
              <div className="user-education">
                <div className="user-education__heading">
                  <h2 className="heading-secondary">Education</h2>
                  <button className="btn btn--table">
                    <i class="fa fa-plus" aria-hidden="true"></i>Add New{" "}
                  </button>
                </div>

                <table className="user-education__table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Location</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  openAddEduModal: PropTypes.func.isRequired,
  closeAddEduModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  modal: state.modal
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, openAddEduModal, closeAddEduModal })(
  Dashboard
);

{
  /* <Spinner />
) : (
  <Fragment>
    <Navbar stage="2" />
    <Fragment>
      <div className="u-grid dash">
        <div className="user-info">
          <div className="user-info__intro">
            <h1 className="heading-primary">Welcome {user && user.name}</h1>
            {profile === null && (
              <Fragment>
              <h2 className="heading-secondary">
                It doesn't look like you've set up your profile yet
              </h2>
              <Link to="/create-profile">Create Profile</Link>
              </Fragment>

            )}
          </div>
          <div className="user-info__table">
            Name:
            {user && user.name}
          </div>
        </div>
        <Education education={profile.education} />
        <div className="user-experience">
          <h2 className="heading-secondary">Professional Experience</h2>
        </div>

        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.profExp} />
            <Education education={profile.education} />
            <button onClick={() => deleteAccount()}>Delete Account</button>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
          </Fragment>
        )}
      </div>
    </Fragment>
  </Fragment>
);
}; */
}
