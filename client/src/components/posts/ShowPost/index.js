import React, { Fragment, useEffect, useRef, useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-spring-modal/dist/index.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "../Modal";
import Loading from "../../reausable/Loading";
import Discussion from "./Discussion";
import {
  closeShowPostModal,
  openShowPostModal,
  addLike,
  removeLike,
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
  post: { post, loading, tempPostId },
  auth,
  closeShowPostModal,
  deletePost,
}) => {
  useEffect(() => {
    getPost(tempPostId);
  }, [getPost, tempPostId]);

  // GENERATE MAP
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 5,
    width: null,
    height: "25vh",
    display: "block",
    position: "relative",
  });

  useEffect(() => {
    console.log(post);
  });

  return (
    <Fragment>
        {loading || post === null ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="modal__close">
              <button
                onClick={closeShowPostModal}
                className="modal__close-icon fa fa-times"
                aria-hidden="true"></button>
            </div>
            <div className="show-modal">
              <div className="show-modal__image-container">
                <img
                  // src={post.image[0]}
                  className="show-modal__image"
                />
              </div>

              <Scrollbars
                style={{
                  height: "100%",
                }}>
                <div className="show-modal__info ">
                  <div className="show-modal__header">
                    <div className="show-modal__header--left">
                      <h1 className="heading-primary u-margin-bottom-smallest">
                        {post.title}
                      </h1>
                      <h3 className="paragraph u-margin-bottom-smallest">
                        Posted <span className="u-bold">2 days ago</span>
                      </h3>
                    </div>
                    <div className="show-modal__header--right">
                      <div className="user-block">
                        <div className="user-block__avatar">
                          <img
                            src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
                            className="user-block__avatar--image"
                          />
                        </div>
                        <h2 className="paragraph user-block__text">
                          Posted by{" "}
                          <span className="u-bold user-block__text--name">
                            {post.name}
                          </span>
                        </h2>
                      </div>
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
                        className="show-modal__description description">
                        <div className="description__title u-margin-bottom-tiny">
                          <h2 className="heading-secondary ">Description</h2>
                        </div>
                        <div className="description__content u-margin-bottom-small">
                          <p className="paragraph">{post.description}</p>
                        </div>
                      </div>
                    )}
                  </Measure>

                  <div className="show-modal__specific-info specific-info">
                    <div className="specific-info__item">
                      <h2 className="heading-secondary ">Best Time</h2>
                      <p className="paragraph">{post.bestTime}</p>
                    </div>
                    <div className="specific-info__item">
                      <h2 className="heading-secondary ">
                        Suggested Focal Lengths
                      </h2>
                      <p className="paragraph">24mm-200mm</p>
                    </div>
                  </div>
                  <div className="show-modal__map map ">
                    <div className="map__overlay">
                      <h4 className="paragraph ">
                        <span className="u-bold">Location:</span>
                      </h4>
                      <p className="paragraph">{post.locationName}</p>
                    </div>
                    <ReactMapGl
                      {...viewport}
                      width={viewport.width}
                      onViewportChange={(viewport) => {
                        setViewport(viewport);
                      }}
                      mapStyle="mapbox://styles/tomashman1995/ckhfcz6yx0dpy19o5nz8bz9gb"
                      mapboxApiAccessToken={mapBoxToken}>
                      <Marker latitude={45.4211} longitude={-75.6903}>
                        {/* <div className="marker"></div> */}
                        <div className="pin"></div>
                      </Marker>
                    </ReactMapGl>
                  </div>
                  <Discussion />
                </div>
              </Scrollbars>
            </div>
          </Fragment>
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
  deletePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  openShowPostModal,
  closeShowPostModal,
  addLike,
  removeLike,
  deletePost,
  getPost,
})(ShowPost);
