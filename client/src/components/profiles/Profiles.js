import React, { Fragment, useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../reausable/Loading";
import ProfileItem from "./ProfileItem";
import Navbar from "../layout/Navbar";
import { useTransition, a } from "react-spring";
import useMeasure from "use-measure";
import { getProfiles } from "../../actions/profile";
import "./Profiles.scss";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [columns, setColumns] = useState(3);

  //  Measure the width of the container element
  const nodeRef = useRef();
  const { width } = useMeasure(nodeRef);

  const manageColumns = () => {
    if (width > 1300) {
      setColumns(4);
    } else if (width > 1000) {
      setColumns(3);
    } else if (width > 600) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  };

    useEffect(() => {
      window.addEventListener("resize", manageColumns());
      return () => window.removeEventListener("resize", manageColumns());
    });

  useEffect(() => {
    manageColumns();
  }, [width]);

  //  Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = profiles.map((child, i) => {
      let height = 420;

      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const xy = [
        (width / columns) * column,
        (heights[column] += height) - height,
      ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
      return { ...child, xy, width: width / columns, height: height };
    });
    return [heights, gridItems];
  }, [3, profiles, width, profiles]);
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, (item) => item._id, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    // trail: 25,
  });

  return (
    <Fragment>
      <Navbar stage="2" />
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

            {/* {profiles.length > 0 ? ( */}
            {/* // profiles.map((profile) => (
                //   <ProfileItem key={profile._id} profile={profile} />
                // )) */}

            <div
              className="list posts__grid"
              style={{ height: Math.max(...heights) }}>
              {transitions.map(({ item, props: { xy, ...rest }, key }) => (
                <a.div
                  key={key}
                  className="profile"
                  style={{
                    transform: xy.interpolate(
                      (x, y) => `translate3d(${x}px,${y}px,0)`
                    ),
                    ...rest,
                  }}>
                  <ProfileItem key={item._id} profile={item} />
                </a.div>
              ))}
            </div>
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
