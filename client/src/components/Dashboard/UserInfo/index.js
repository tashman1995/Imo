import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  openEditProfileModal,
  closeEditProfileModal,
  openEditSocialMediaModal,
} from "../../../actions/profile";
import SlideToggle from "../../layout/SlideToggle";

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

  let userInfoItems;

  if (profile && user) {
    biography = profile.bio
      ? profile.bio
      : "You have not written a biography yet";

    userInfoItems = [
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
        value: profile.subjects !== [] ? profile.subjects.join(", ") : "",
        icon: "far fa-image",
      },
      {
        item: "equipment",
        value: profile.equipment !== [] ? profile.equipment.join(", ") : "",
        icon: "fas fa-camera-retro",
      },
    ];

    userInfoElement = userInfoItems.map((item) => {
      if (item.value) {
        return (
          <li key={item.item}>
            <p className="heading-tertiary  dashboard-table__profile-title">
              <i className={item.icon}></i>
            </p>
            <p className="paragraph u-dont-break-out dashboard-table__profile-data">
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
                  href={`//${item.value}`}>
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
      {/* User Has not set up a profile yet */}
      {profile === null && (
        <div className="user-info__no-profile">
          <h1 className="heading-primary">Welcome {user && user.name}</h1>
          <h2 className="heading-secondary  u-margin-bottom-smaller">
            It doesn't look like you've set up your profile yet
          </h2>
          {/* <Link to="/create-profile">Create Profile</Link> */}
          <button
            className="btn btn--table "
            onClick={() => {
              openAddProfileModal();
            }}>
            Create Profile
          </button>
        </div>
      )}

      {/* User has set up a profile */}

      {profile && (
        <Fragment>
          {/* PROFILE */}

          <div className="user-info__heading">
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
            <li
              className="bio"
              onClick={() => toggleBioVisibility(!bioVisibility)}>
              <div className="bio__header">
                {" "}
                <p className="heading-tertiary dashboard-table__profile-title bio__title">
                  Biography
                </p>
                <button>
                  <i
                    className={`fas fa-angle-down  bio__icon ${
                      bioVisibility && "u-rotate-180"
                    }`}></i>
                </button>
              </div>
              <SlideToggle isVisible={bioVisibility}>
                <p className={`paragraph  bio__text`}>{biography}</p>
              </SlideToggle>
            </li>
          </ul>

          {/* SOCIAL MEDIA */}

          <div className="user-info__heading">
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
