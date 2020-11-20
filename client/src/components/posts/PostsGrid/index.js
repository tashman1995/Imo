
import React, { useState, useEffect, useMemo } from "react";
import { useTransition, a } from "react-spring";
import shuffle from "lodash/shuffle";
import useMeasure from "./useMeasure";

import data from "./data";
import "./styles.scss";

const PostsGrid = ({posts, columns}) => {
  
  // Hook1: Tie media queries to the number of columns
  // const columns = useMedia(
  //   ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
  //   [5, 4, 3],
  //   2
  // );
  // Hook2: Measure the width of the container element
  const [bind, { width }] = useMeasure();
  // Hook3: Hold items
  const [items, set] = useState(posts);

  useEffect(() => {
    set(posts)
  },[posts])
  console.log(items);
  // Hook4: shuffle data every 2 seconds
  // useEffect(() => void setInterval(() => set(shuffle), 2000), []);
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      let height;
      if(child.height === 1350) {
        height = (width / columns) * 1.22;
      } else {
        height = (width/columns) * 0.713;
      }
      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const xy = [
        (width / columns) * column,
        (heights[column] += height ) - (height) ,
      ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
      return { ...child, xy, width: width / columns, height: height };
    });
    return [heights, gridItems];
  }, [columns, items, width]);
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, (item) => item._id, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });
  // Render the grid
  return (
    <div {...bind} className="list posts__grid" style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <a.div
          key={key}
          style={{
            transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
            ...rest,
          }}>
            <div>
             
              <img className="image" src={item.image[0]} alt=""/>
            </div>
          {/* <div style={{ backgroundImage: item.css }} /> */}
        </a.div>
      ))}
    </div>
  );
}

export default PostsGrid;
