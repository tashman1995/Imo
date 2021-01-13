import React, { useState, useRef, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSpring, useChain, useTransition } from "react-spring";
import * as easings from "d3-ease";
import Navbar from "../Navbar";

import Backdrop from "./Backdrop";
import PageContent from "./PageContent";
import InitialHeading from "./InitialHeading";

import imagesArr from "../../../api/images";

const Landing = ({ isAuthenticated }) => {
  const [phase, setPhase] = useState("initial");
  // LETS EXPLORE ANIMATION
  const initialHeadingRef = useRef();
  const [initialHeadingWords] = useState([
    { key: 1, text: "Lets" },
    { key: 2, text: `Explore` },
  ]);

  const initialHeading = useTransition(
    initialHeadingWords,
    (initialHeadingWord) => initialHeadingWord.key,
    {
      from: { transform: "translateY(30rem)" },
      enter: { transform: "translateY(0)" },
      trail: 500,
      ref: initialHeadingRef,
    }
  );

  // LETS EXPLORE SUBTITLE ANIMATION
  const [subtitles] = useState([
    {
      key: 1,
      text:
        "Share your favourite photography locations with like minded adventurers",
    },
  ]);
  const subtitleAnimRef = useRef();
  const subtitleAnim = useTransition(subtitles, (subtitle) => subtitle.key, {
    from: {
      opacity: 0,
      transform: "translateY(15rem)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0rem)",
    },
    ref: subtitleAnimRef,
  });

  // Login Sign Up Btn Anim
  const [buttons] = useState([
    {
      key: 1,
      text: "Login",
      link: "/login"
    },
    {
      key: 2,
      text: "Sign Up",
      link: "/register"
    },
  ]);

  const buttonsAnimRef = useRef();
  const buttonsAnim = useTransition(buttons, (button) => button.key, {
    from: {
      opacity: 0,
   
    },
    enter: {
      opacity: 1,
   
    },

    ref: buttonsAnimRef,
  });

  // Backdrop slider anim
  const [backdropSliders] = useState([
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
  ]);

  const backdropSliderRef = useRef();
  const backdrop = useTransition(
    backdropSliders,
    (backdropSlider) => backdropSlider.key,
    {

      from: { height: "100vh" },
      enter: { height: "0" },
      trail: 300,
      config: {
        mass: 50,
        tension: 400,
        friction: 30,
        clamp: true,
      },

      ref: backdropSliderRef,
    }
  );

  const [backdropImage] = useState([
    { key: 1, src: "./imgs/yosemite-extra-large.jpg" },
  ]);

  // scale
  const zoomRef = useRef();
  const zoom = useTransition(
    backdropImage,
    (backdropImage) => backdropImage.key,
    {
      from: {
        transform: "scale(2)",
      },
      enter: {
        transform: "scale(2.6)",
      },


      config: {
        delay: 1200,
        duration: 2000,
        easing: easings.easeCubicOut,
      },

      ref: zoomRef,
    }
  );

  useChain(
    [
      initialHeadingRef,
      subtitleAnimRef,
      buttonsAnimRef,
      backdropSliderRef,
      zoomRef,
    ],
    [1, 2, 2.5, 3.5, 3.5]
  );

  const imoZoomOutRef = useRef();
  const imoZoomOut = useSpring({
    from: { transform: "scale(20) translate3d(4.5rem,70rem,0)", opacity: 0 },

    to: async (next) => {
      await next({ transform: "scale(1) translate3D(0,10rem,0)", opacity: 1 });
      await next({ transform: "scale(1) translate3D(0,0,0)", opacity: 1 });
    },

    ref: imoZoomOutRef,
  });

  const fadeOutRef = useRef();
  const fadeOut = useSpring({
    from: {
      opacity: "1",
    },
    to: {
      opacity: "0",
    },
    config: {
      duration: 300,
    },

    ref: fadeOutRef,
  });

  const fadeInAndUpRef = useRef();
  const fadeInAndUp = useSpring({
    from: { opacity: 0, transform: " translateY(6rem)" },

    to: async (next) => {
      await next({ opacity: 1, transform: "translateY(0rem)" });
    },

    ref: fadeInAndUpRef,
  });

  const fadeInAndUpRef2 = useRef();
  const fadeInAndUp2 = useSpring({
    from: { opacity: 0, transform: " translateY(6rem)" },

    to: async (next) => {
      await next({ opacity: 1, transform: "translateY(0rem)" });
    },

    ref: fadeInAndUpRef2,
  });

  const imageGridAnimRef = useRef();
  const [images] = useState(imagesArr);
  const imageGridAnim = useTransition(images, (image) => image.url, {
    from: { opacity: 0, transform: "translateY(10rem)" },
    enter: { opacity: 1, transform: "translateY(0rem)" },
    ref: imageGridAnimRef,
    trail: 500,
    config: {
      tension: 200,
      friction: 15,
    },
  });

 

  useChain(
    phase === "imo"
      ? [
          navBar1Ref,
          fadeOutRef,
          imoZoomOutRef,
          fadeInAndUpRef,
          fadeInAndUpRef2,
          imageGridAnimRef,
        ]
      : [],
    phase === "imo" ? [0, 0, 0.2, 1.3, 1.3, 1.6, 1.9] : []
  );

  const updatePhase = () => {
    setPhase("imo");
  };

  useEffect(() => {
    window.addEventListener("scroll", updatePhase);
    return () => window.removeEventListener("scroll", updatePhase);
  });

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Navbar light={true} />
      <div className="Landing">
        {phase === "imo" && (
          <PageContent
            imoZoomOut={imoZoomOut}
            fadeInAndUp={fadeInAndUp}
            fadeInAndUp2={fadeInAndUp2}
            imageGridAnim={imageGridAnim}
          />
        )}
        <InitialHeading
          letsExpAnim={initialHeading}
          subtitleAnim={subtitleAnim}
          buttonsAnim={buttonsAnim}
          fadeOut={fadeOut}
        />
        <Backdrop backdropAnim={backdrop} zoomAnim={zoom} />
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
