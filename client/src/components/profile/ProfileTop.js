import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CenterModal } from "react-spring-modal";
import { animated, useTransition } from "react-spring";
import "react-spring-modal/dist/index.css";

const ProfileTop = ({
  profileOwned,
  profile: {
    profile,
    status,
    website,
    location,
    bio,
    social,
    subjects,
    equipment,
    user: { name, avatar },
  },
}) => {
  const [screenWidth, setWidth] = React.useState(window.innerWidth);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  ///////////////////////////////
  // BIO MODAL
  //////////////////////////
  const [bioModal, setBioModal] = useState(false);
  const openBioModal = () => {
    setBioModal(true);
  };
  const closeBioModal = () => {
    setBioModal(false);
  };

  const transitionConfig = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  };

  const fade = useTransition(openBioModal, null, transitionConfig);

  console.log(profileOwned);

  return (
    <Fragment>
      <div className="profile-top">
        <div className="profile-top__avatar-container">
          {profileOwned && (
            <Link to="/edit-profile" className="profile-top__edit-btn">
              Edit Profile
            </Link>
          )}
          <img
            className="profile-top__avatar"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
        </div>

        {/* <Link to="/profiles" className="btn">
              Back to Profiles
            </Link> */}

        <div className="profile-top__info">
          <div className="profile-top__headings">
            <div className="profile-top__headings--left">
              <h1 className="heading-primary">{name}</h1>
              <h2 className="heading-secondary u-margin-bottom-tiny">
                {status && status}
              </h2>
            </div>

            <div className="profile-top__headings--right">
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
          </div>
          <h3 className="heading-tertiary u-margin-bottom-smallest">
            {location && location}
          </h3>
          <div className="profile-top__bio">
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
          </div>
        </div>
      </div>

      <CenterModal isOpen={bioModal} onRequestClose={closeBioModal}>
        {fade.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className="bioModal" key={key} style={props}>
                <h3 className="heading-secondary u-margin-bottom-smaller">
                  Bio
                </h3>
                <p className="paragraph u-margin-bottom-smaller">{bio}</p>
                <h3 className="heading-tertiary u-margin-bottom-smaller">
                  Subjects:{" "}
                </h3>
                <div className="bioModal__list u-margin-bottom-small">
                  {subjects.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" paragraph bioModal__list-item">
                        {item}
                      </div>
                    );
                  })}
                </div>
                <h3 className="heading-tertiary u-margin-bottom-smaller">
                  Equipment:{" "}
                </h3>
                <div className="bioModal__list u-margin-bottom-small">
                  {equipment.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="paragraph bioModal__list-item">
                        {item}
                      </div>
                    );
                  })}
                </div>
              </animated.div>
            )
        )}
      </CenterModal>
    </Fragment>
  );
};

export default ProfileTop;
