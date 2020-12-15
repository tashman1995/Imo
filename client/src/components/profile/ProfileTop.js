import React, { Fragment,  } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import { openEditProfileModal } from "../../actions/profile";

const ProfileTop = ({
  profileOwned,
  profile: {
    status,
    website,
    location,
    social,
    user,
  },
   openEditProfileModal,
}) => {
  
  return (
    <Fragment>
      <div className="profile-top">
        <div className="profile-top__avatar-container">
          {profileOwned && (
            <button
              onClick={() => {
                openEditProfileModal();
              }}
              className="profile-top__edit-btn">
              Edit Profile
            </button>
          )}
          <img
            className="profile-top__avatar"
            src={user.avatar && user.avatar}
            alt=""
          />
        </div>

        {/* <Link to="/profiles" className="btn">
              Back to Profiles
            </Link> */}

        <div className="profile-top__info">
          <div className="profile-top__headings">
            <div className="profile-top__headings--left">
              <h1 className="heading-primary">{user.name && user.name}</h1>
              <h2 className="heading-secondary u-margin-bottom-tiny">
                {status && status}
              </h2>
            </div>
          </div>
          <h3 className="heading-tertiary u-margin-bottom-small">
            {location && location}
          </h3>
          <div className="profile-top__headings--socials">
            {website && (
              <a
                href={`//${website}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fas fa-globe fa-3x"></i>
              </a>
            )}
            {social && social.instagram && (
              <a
                href={`//${social.instagram}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-instagram-square fa-3x"></i>
              </a>
            )}
            {social && social.facebook && (
              <a
                href={`//${social.facebook}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-facebook-square fa-3x"></i>
              </a>
            )}
            {social && social.twitter && (
              <a
                href={`//${social.twitter}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-twitter-square fa-3x"></i>
              </a>
            )}
            {social && social.youtube && (
              <a
                href={`//${social.youtube}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-youtube-square fa-3x"></i>
              </a>
            )}
            {social && social.behance && (
              <a
                href={`//${social.behance}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-behance-square fa-3x"></i>
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={`//${social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-linkedin-square fa-3x"></i>
              </a>
            )}
          </div>

          {/* <div className="profile-top__bio">
            <p className="paragraph u-margin-bottom-smallest">
              {bio &&
                (bio.length > screenWidth / 8
                  ? `${bio
                      .slice(0, screenWidth / 8)
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}. . .`
                  : bio)}
            </p>
            {bio && bio.length > screenWidth / 8 && (
              <button
                onClick={() => openBioModal()}
                className="paragraph paragraph--link">
                Read More
              </button>
            )}
          </div> */}
          {/* <div className="profile-top__bio-portrait">
            <p className="paragraph u-margin-bottom-smallest">{bio && bio}</p>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};
ProfileTop.propTypes = {
  openEditProfileModal: PropTypes.func.isRequired,
};

export default connect(null, { openEditProfileModal })(ProfileTop);
