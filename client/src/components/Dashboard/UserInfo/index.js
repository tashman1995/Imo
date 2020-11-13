import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  openEditProfileModal,
  closeEditProfileModal,
  openEditSocialMediaModal,
} from "../../../actions/profile";

import "./UserInfo.scss";

const UserInfo = ({
  user,
  profile: { profile },
  openAddProfileModal,
  openEditProfileModal,
  openEditSocialMediaModal,
}) => {
  let biography;
  let userInfoElement = "";
  let userSocialMediaElement = (
    <li>
      <p className="heading-tertiary dashboard-table__profile-title">
        <i className="fas fa-times"></i>
      </p>
      <p className="paragraph dashboard-table__profile-data">
        Social media links not yet added
      </p>
    </li>
  );

  if (profile && user) {
    biography = profile.bio
      ? profile.bio
      : "You have not written a biography yet";

    // Managing Equipment Array
    let equipment;
    profile.equipment !== ""
      ? (equipment = profile.equipment.map((item) => `${item}, `))
      : (equipment = "");
    // Managing Subject Array
    let subjects;
    profile.subjects
      ? (subjects = profile.subjects.map((item) => `${item}, `))
      : (subjects = "");

    const userInfoItems = [
      {
        item: "name",
        value: user.name,
        icon: "fas fa-user",
      },
      {
        item: "status",
        value: profile.status,
        icon: "fas fa-user-tie",
      },
      {
        item: "website",
        value: profile.website,
        icon: "fas fa-globe",
      },
      {
        item: "location",
        value: profile.location,
        icon: "fas fa-map-marker-alt",
      },
      {
        item: "subjects",
        value: subjects,
        icon: "far fa-image",
      },
      {
        item: "equipment",
        value: equipment,
        icon: "fas fa-camera-retro",
      },
    ];

    userInfoElement = userInfoItems.map((item) => {
      if (item.value) {
        return (
          <li key={item.item}>
            <p className="heading-tertiary dashboard-table__profile-title">
              <i className={item.icon}></i>
            </p>
            <p className="paragraph dashboard-table__profile-data">
              {item.value}
            </p>
          </li>
        );
      } else {
        return "";
      }
    });

    if (profile.social) {
      const userSocialItems = [
        {
          item: "instagram",
          value: profile.social.instagram,
          icon: "fab fa-instagram-square",
        },
        {
          item: "facebook",
          value: profile.social.facebook,
          icon: "fab fa-facebook-square",
        },
        {
          item: "twitter",
          value: profile.social.twitter,
          icon: "fab fa-twitter-square",
        },
        {
          item: "youtube",
          value: profile.social.youtube,
          icon: "fab fa-youtube-square",
        },
        {
          item: "behance",
          value: profile.social.behance,
          icon: "fab fa-behance-square",
        },
        {
          item: "linkedin",
          value: profile.social.linkedin,
          icon: "fab fa-linkedin",
        },
      ];

      userSocialMediaElement = userSocialItems.map((item) => {
        if (item.value) {
          return (
            <li key={item.item}>
              <p className="heading-tertiary dashboard-table__profile-title">
                <i className={item.icon}></i>
              </p>
              <p className="paragraph dashboard-table__profile-data">
                <a
                  className="dashboard-table__link"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.value}>
                  {item.value}
                </a>
              </p>
            </li>
          );
        } else {
          return "";
        }
      });
    }
  }

  // Open close description
  const [bioVisibility, toggleBioVisibility] = useState(false);

  return (
    <section className="user-info">
      <section className="user-info__intro">
        {/* User Has not set up a profile yet */}
        {profile === null && (
          <Fragment>
            <div className="dashboard-table__table">
              <h1 className="heading-primary u-margin-bottom-tiny">
                Welcome {user && user.name}
              </h1>
              <h2 className="heading-secondary  u-margin-bottom-smaller">
                It doesn't look like you've set up your profile yet
              </h2>
              {/* <Link to="/create-profile">Create Profile</Link> */}
              <button
                className="btn btn--table u-margin-bottom-smaller"
                onClick={() => {
                  openAddProfileModal();
                }}>
                Create Profile
              </button>
            </div>
          </Fragment>
        )}
      </section>

      {/* User has set up a profile */}

      {profile && (
        <Fragment>
          {/* PROFILE */}

          <div className="dashboard-table__heading">
            <h2 className="heading-primary">Profile</h2>
            <button
              className="btn btn--table"
              onClick={() => {
                openEditProfileModal();
              }}>
              Edit Profile{" "}
            </button>
          </div>

          <ul className="user-info__list">
            {userInfoElement}
            <li>
              <div
                className="user-info__bio-header"
                onClick={() => toggleBioVisibility(!bioVisibility)}>
                {" "}
                <p className="heading-tertiary dashboard-table__profile-title dashboard-table__profile-title--bio">
                  Biography
                </p>
                <button>
                  <i
                    className={`fas fa-angle-down  user-info__bio-icon ${
                      bioVisibility && "u-rotate-180"
                    }`}></i>
                </button>
              </div>

              <p
                className={`paragraph dashboard-table__profile-data dashboard-table__profile-data--bio
               ${!bioVisibility && "u-height-0"}
               `}>
                {biography}
              </p>
            </li>
          </ul>

          {/* SOCIAL MEDIA */}

          <div className="dashboard-table__heading">
            <h2 className="heading-secondary">Social Media</h2>

            <button
              className="btn btn--table"
              onClick={() => {
                openEditSocialMediaModal();
              }}>
              {profile.social ? "Edit Socials" : "Add Socials"}
            </button>
          </div>

          {/* NO SOCIALS INPUT */}

          {!profile.social && (
            <Fragment>
              <ul className="user-info__list  u-margin-bottom-medium">
                <li>
                  <p className="heading-tertiary dashboard-table__profile-title">
                    <i className="fas fa-times"></i>
                  </p>
                  <p className="paragraph dashboard-table__profile-data">
                    Social media links not yet added
                  </p>
                </li>
              </ul>
            </Fragment>
          )}

          {/* SOCIALS PRESENT */}

          {profile.social && (
            <Fragment>
              <ul className="user-info__list  u-margin-bottom-medium">
                {userSocialMediaElement}
              </ul>
            </Fragment>
          )}
        </Fragment>
      )}
    </section>
  );
};

UserInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  openEditProfileModal: PropTypes.func.isRequired,
  closeEditProfileModal: PropTypes.func.isRequired,
  openEditSocialMediaModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  openEditProfileModal,
  closeEditProfileModal,
  openEditSocialMediaModal,
})(UserInfo);
