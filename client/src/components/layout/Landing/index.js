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
      trail: 1000,
      ref: initialHeadingRef,
    }
  );

  // LETS EXPLORE SUBTITLE ANIMATION
  const subtitleAnimRef = useRef();
  const subtitleAnim = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(15rem)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0rem)",
    },
    ref: subtitleAnimRef,
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
      // from: { transform: "translateY(0rem)" },
      // enter: { transform: "translateY(100vh)" },
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

  // scale
  const zoomRef = useRef();
  const zoom = useSpring({
    from: {
      transform: "scale(2)",
    },
    to: {
      transform: "scale(2.6)",
    },
    reverse: phase === "imo" ? true : false,

    config: {
      delay: 1200,
      duration: 2000,
      easing: easings.easeCubicOut,
    },

    ref: zoomRef,
  });

  useChain(
    [initialHeadingRef, subtitleAnimRef, backdropSliderRef, zoomRef],
    [0, 1.5, 2.5, 2.5, 4]
  );

  const imoZoomOutRef = useRef();
  const imoZoomOut = useSpring({
    from: { transform: "scale(20) translate3d(4.5rem,70rem,0)", opacity: 0 },

    to: async (next) => {
      await next({ transform: "scale(1) translate3D(0,10rem,0)", opacity: 1 });
      await next({ transform: "scale(1) translate3D(0,0,0)", opacity: 1 });
    },
    // config: {
    //   mass: 50,
    //   tension: 40,
    //   friction: 100,
    //   clamp: true,
    // },
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

  const navBar1Ref = useRef();
  const navBar1 = useSpring({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
    config: {
      duration: 300,
    },

    ref: navBar1Ref,
  });

  const navBar2Ref = useRef();
  const navBar2 = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 300,
    },

    ref: navBar2Ref,
  });

  useChain(
    phase === "imo"
      ? [
          navBar1Ref,
          fadeOutRef,
          imoZoomOutRef,
          fadeInAndUpRef,
          navBar2Ref,
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
      <Navbar animation={navBar1} stage="1" />
      <Navbar animation={navBar2} stage="2" />
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

// import React from "react";
// import { Link } from "react-router-dom";

// const Landing = () => {
//   return (
//     <section className="landing">
//       <div className="dark-overlay">
//         <div className="landing-inner">
//           <h1 className="x-large">Developer Connector</h1>
//           <p className="lead">
//             Create a developer profile/portfolio, share posts and get help from
//             other developers
//           </p>
//           <div className="buttons">
//             <Link to="/register" className="btn btn-primary">
//               Sign Up
//             </Link>
//             <Link to="/login" className="btn btn-light">Login</Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Landing;
