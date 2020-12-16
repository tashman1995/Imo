import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSpring, useTransition, animated as a } from "react-spring";
import ImageLoad from "../layout/ImageLoad";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
    subjects,
    website,
    social,
  },
  profile,
}) => {
  const [flipped, setFlip] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const transitionConfig = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 450,
    },
  };

  const element = useTransition(profile, null, transitionConfig);

  return element.map(
    ({ item, key, props }) => 
    
    <a.div
      key={key}
      style={props}
      onMouseEnter={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
      className="profile-card__container">
      <a.div
        className="profile-card"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}>
        <ImageLoad
          src={avatar}
          alt="User Avatar"
          placeholder="/imgs/avatar.svg"
          className="profile-card__avatar u-margin-bottom-smaller"
        />

        <div className="profile-card__details">
          <h2 className="heading-secondary profile-card__name u-margin-bottom-tiny">
            {name}
          </h2>
          <p className="sub-paragraph profile-card__status  u-margin-bottom-smallest">
            {status}
            {location && ` from ${location}`}
          </p>
          <p className="sub-paragraph"></p>
          <section className="subjects">
            {subjects.slice(0, 3).map((subject, index) => {
              return (
                <div className="subjects__subject" key={index}>
                  <p className="sub-paragraph subjects__text">{subject}</p>
                </div>
              );
            })}
          </section>
          <div className="profile-card__button-container">
            <button className="btn btn--table">View More</button>
          </div>
        </div>
      </a.div>
      <a.div
        className={`profile-card profile-card--back ${
          !social && "profile-card--back--no-social"
        }`}
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}>
        {!social && (
          <div className="profile-card__profile-link">
            {" "}
            <Link to={`/profile/${_id}`} className="profile-card__btn">
              View Profile
            </Link>
          </div>
        )}
        {social && (
          <Fragment>
            <div className="profile-card__profile-link">
              {" "}
              <Link to={`/profile/${_id}`} className="profile-card__btn">
                View Profile
              </Link>
            </div>
            <div className="profile-card__socials">
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
                  <i className="fab fa-linkedin fa-3x"></i>
                </a>
              )}
            </div>
          </Fragment>
        )}
      </a.div>
    </a.div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
