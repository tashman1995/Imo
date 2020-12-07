import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import { Scrollbars } from "react-custom-scrollbars";
import Moment from "react-moment";

import Loading from "../../reausable/Loading";
import Discussion from "./Discussion";
import {
  closeShowPostModal,
  openShowPostModal,
  addLike,
  removeLike,
  addComment,
  deleteComment,
  deletePost,
  getPost,
} from "../../../actions/post";
import ReactMapGl, { Marker } from "react-map-gl";
import Measure from "react-measure";

// require("dotenv").config();
const mapBoxToken =
  "pk.eyJ1IjoidG9tYXNobWFuMTk5NSIsImEiOiJja2hheXl5M3YxOTU2MnFucXMxMGkzMDE1In0.wCJe7VlDOc6tWX-6itorug";

const ShowPost = ({
  getPost,
  post: {
    post,
    posts,
    post: {
      _id,
      user,
      name,
      avatar,
      date,
      title,
      description,
      image,
      height,
      bestTime,
      locationName,
      focalLengthRange,
      likes,
      comments,
      location,
    },
    loading,
    tempPostId,
  },
  auth,
  deletePost,
  addLike,
  removeLike,
  addComment,
  deleteComment,
}) => {
  useEffect(() => {
    getPost(_id);
  }, [posts, getPost, __dirname]);

  // GENERATE MAP
  const [viewport, setViewport] = useState({
    latitude: 38.8951,
    longitude: -77.0364,
    zoom: 7,
    width: null,
    height: "22rem",
    display: "block",
    position: "relative",
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
    });
  }, [location]);

  // FOCAL RANGE
  const focalLengthRangeText = `Between ${focalLengthRange.min}mm and ${focalLengthRange.max}mm`;

  // Orientation
  const [orientation, setOrientation] = useState(
    !navigator.maxTouchPoints
      ? "desktop"
      : !window.screen.orientation.angle
      ? "portrait"
      : "landscape"
  );

  const handleResize = () => {
    setOrientation(
      !navigator.maxTouchPoints
        ? "desktop"
        : !window.screen.orientation.angle
        ? "portrait"
        : "landscape"
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize());
    return () => window.removeEventListener("resize", handleResize());
  });

  return (
    <Fragment>
      {loading || post === null ? (
        <div className="modal__container--95">
          <Loading />
        </div>
      ) : (
        <div className="modal__container--95">
          {orientation === "landscape" ? (
            <div
              className={`show-modal show-modal${
                height !== 1350 ? "--alt" : ""
              }`}>
              <div
                className={` show-modal__header show-modal__header${
                  height !== 1350 ? "--alt" : ""
                }`}>
                <div className="show-modal__header--left">
                  <h1 className="heading-primary ">{title}</h1>
                  <h3 className="paragraph">
                    Posted{" "}
                    <span className="u-bold">
                      <Moment fromNow>{date}</Moment>
                    </span>
                  </h3>
                </div>
                <div className="show-modal__header--right">
                  <div className="user-block">
                    <div className="user-block__avatar">
                      <img
                        alt="Users Avatar"
                        src={avatar}
                        className="user-block__avatar--image"
                      />
                    </div>
                    <h2 className="paragraph user-block__text">
                      Posted by{" "}
                      <span className="u-bold user-block__text--name">
                        {name}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              <div
                className={`show-modal__image-container show-modal__image-container${
                  height !== 1350 ? "--alt" : ""
                }`}>
                <img
                  src={image[0]}
                  alt="Post"
                  className={`show-modal__image show-modal__image${
                    height === 1350 ? "--portrait" : "--landscape"
                  }`}
                />
              </div>
              <div
                className={`show-modal__info-container show-modal__info-container${
                  height !== 1350 ? "--alt" : ""
                }`}>
                <Scrollbars
                  renderTrackHorizontal={(props) => (
                    <div
                      {...props}
                      style={{ display: "none" }}
                      className="track-horizontal"
                    />
                  )}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}>
                  <div className="show-modal__info ">
                    <div className="show-modal__description description">
                      <div className="description__title u-margin-bottom-tiny">
                        <h2 className="heading-secondary ">Description</h2>
                      </div>
                      <div className="description__content u-margin-bottom-small">
                        <p className="paragraph">{description}</p>
                      </div>
                    </div>

                    <Measure
                      bounds
                      onResize={(contentRect) => {
                        contentRect.entry &&
                          setViewport({
                            ...viewport,
                            width: contentRect.entry.width,
                          });
                        // setViewport({ ...viewport, width: info.current.clientWidth });
                      }}>
                      {({ measureRef }) => (
                        <div
                          ref={measureRef}
                          className="show-modal__specific-info specific-info">
                          <div className="specific-info__item">
                            <h2 className="heading-secondary ">Best Time</h2>
                            <p className="paragraph">{bestTime}</p>
                          </div>
                          <div className="specific-info__item">
                            <h2 className="heading-secondary ">
                              Suggested Focal Lengths
                            </h2>
                            <p className="paragraph">{focalLengthRangeText}</p>
                          </div>
                        </div>
                      )}
                    </Measure>
                    <div className="show-modal__map map ">
                      <div className="map__overlay">
                        <h4 className="paragraph ">
                          <span className="u-bold">Location:</span>
                        </h4>
                        <p className="paragraph">{locationName}</p>
                      </div>
                      <ReactMapGl
                        {...viewport}
                        width={viewport.width}
                        onViewportChange={(viewport) => {
                          setViewport(viewport);
                        }}
                        mapStyle="mapbox://styles/tomashman1995/ckhfcz6yx0dpy19o5nz8bz9gb"
                        mapboxApiAccessToken={mapBoxToken}>
                        <Marker
                          latitude={location.coordinates[1]}
                          longitude={location.coordinates[0]}>
                          <div className="pin"></div>
                        </Marker>
                      </ReactMapGl>
                    </div>
                    {auth.isAuthenticated && (
                      <Discussion
                        id={_id}
                        addLike={addLike}
                        removeLike={removeLike}
                        addComment={addComment}
                        likes={likes}
                        comments={comments}
                        user={user}
                        auth={auth}
                        deleteComment={deleteComment}
                      />
                    )}
                  </div>
                </Scrollbars>
              </div>
            </div>
          ) : (
            // PORTRAIT
            <div
              className={`show-modal show-modal${
                height !== 1350 ? "--alt" : ""
              }`}>
              <div
                className={` show-modal__header show-modal__header${
                  height !== 1350 ? "--alt" : ""
                }`}>
                <div className="show-modal__header--left">
                  <h1 className="heading-primary ">{title}</h1>
                  <h3 className="paragraph">
                    Posted{" "}
                    <span className="u-bold">
                      <Moment fromNow>{date}</Moment>
                    </span>
                  </h3>
                </div>
                <div className="show-modal__header--right">
                  <div className="user-block">
                    <div className="user-block__avatar">
                      <img
                        alt="Users Avatar"
                        src={avatar}
                        className="user-block__avatar--image"
                      />
                    </div>
                    <h2 className="paragraph user-block__text">
                      Posted by{" "}
                      <span className="u-bold user-block__text--name">
                        {name}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="show-modal__portrait">
       
                  <div
                    className={`show-modal__image-container show-modal__image-container${
                      height !== 1350 ? "--alt" : ""
                    }`}>
                    <img
                      src={image[0]}
                      alt="Post"
                      className={`show-modal__image show-modal__image${
                        height === 1350 ? "--portrait" : "--landscape"
                      }`}
                    />
                  </div>
                  <div
                    className={`show-modal__info-container show-modal__info-container${
                      height !== 1350 ? "--alt" : ""
                    }`}>
                    <div className="show-modal__info ">
                      <div className="show-modal__description description">
                        <div className="description__title u-margin-bottom-tiny">
                          <h2 className="heading-secondary ">Description</h2>
                        </div>
                        <div className="description__content u-margin-bottom-small">
                          <p className="paragraph">{description}</p>
                        </div>
                      </div>
                      <Measure
                        bounds
                        onResize={(contentRect) => {
                          contentRect.entry &&
                            setViewport({
                              ...viewport,
                              width: contentRect.entry.width,
                            });
                          // setViewport({ ...viewport, width: info.current.clientWidth });
                        }}>
                        {({ measureRef }) => (
                          <div
                            ref={measureRef}
                            className="show-modal__specific-info specific-info">
                            <div className="specific-info__item">
                              <h2 className="heading-secondary ">Best Time</h2>
                              <p className="paragraph">{bestTime}</p>
                            </div>
                            <div className="specific-info__item">
                              <h2 className="heading-secondary ">
                                Suggested Focal Lengths
                              </h2>
                              <p className="paragraph">
                                {focalLengthRangeText}
                              </p>
                            </div>
                          </div>
                        )}
                      </Measure>

                      <div className="show-modal__map map ">
                        <div className="map__overlay">
                          <h4 className="paragraph ">
                            <span className="u-bold">Location:</span>
                          </h4>
                          <p className="paragraph">{locationName}</p>
                        </div>
                        <ReactMapGl
                          {...viewport}
                          width={viewport.width}
                          onViewportChange={(viewport) => {
                            setViewport(viewport);
                          }}
                          mapStyle="mapbox://styles/tomashman1995/ckhfcz6yx0dpy19o5nz8bz9gb"
                          mapboxApiAccessToken={mapBoxToken}>
                          <Marker
                            latitude={location.coordinates[1]}
                            longitude={location.coordinates[0]}>
                            <div className="pin"></div>
                          </Marker>
                        </ReactMapGl>
                      </div>
                      {auth.isAuthenticated && (
                        <Discussion
                          id={_id}
                          addLike={addLike}
                          removeLike={removeLike}
                          addComment={addComment}
                          likes={likes}
                          comments={comments}
                          user={user}
                          auth={auth}
                          deleteComment={deleteComment}
                        />
                      )}
                    </div>
                  </div>
              
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

ShowPost.propTypes = {
  openShowPostModal: PropTypes.func.isRequired,
  closeShowPostModal: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openShowPostModal,
  closeShowPostModal,
  addLike,
  removeLike,
  addComment,
  deleteComment,
  deletePost,
  getPost,
})(ShowPost);
