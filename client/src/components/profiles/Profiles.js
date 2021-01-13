import React, { Fragment, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../reausable/Loading";
import ProfileItem from "./ProfileItem";
import Navbar from "../layout/Navbar";
import { getProfiles } from "../../actions/profile";
import "./Profiles.scss";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const gridContents = profiles.map((profile) => {
    return (
      <div key={profile._id} className="profile">
        <ProfileItem profile={profile} />
      </div>
    );
  });

  //  Measure the width of the container element
  const nodeRef = useRef();

  return (
    <Fragment>
      <Navbar />
      <div className="u-grid profiles">
        <div className="profiles__measure" ref={nodeRef}></div>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="profiles__header">
              <h1 className="heading-primary u-margin-bottom-tiny">
                Photographer Profiles
              </h1>
              <h2 className="profiles__sub-header heading-tertiary u-margin-bottom-tiny">
                Browse and connect with other photographers
              </h2>
            </div>

            <div className="profiles__grid">{gridContents}</div>
          </Fragment>
        )}
      </div>
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
