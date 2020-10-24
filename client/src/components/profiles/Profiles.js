import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../reausable/Loading";
import ProfileItem from "./ProfileItem";
import Navbar from '../layout/Navbar'
import { getProfiles } from "../../actions/profile";
import "./Profiles.scss";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      <Navbar stage="2" />
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="u-grid profiles">
            <div className="profiles__header">
              <h1 className="heading-primary u-margin-bottom-tiny">
                Photographer Profiles
              </h1>
              <h2 className="heading-tertiary u-margin-bottom-tiny">
                Browse and connect with other photographers
              </h2>
            </div>

            <div className="profiles__cards profile-cards">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4 className="heading-tertiary">No profiles found</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
