import React, { Fragment } from "react";
import GridImage from "../GridImage/GridImage";

import { animated } from "react-spring";

import "./ImageSlider.scss";

const ImageSlider = ({ imageGridAnim }) => {
  return (
    <Fragment>
      <div className="image-slider">
        <div className="image-slider__container">
          {imageGridAnim.map((obj) => (
            <animated.div
              className="image-slider__image-container"
              style={obj.props}
            >
              <GridImage url={obj.item.url} key={obj.key} />
            </animated.div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ImageSlider;

// useEffect(() => {
//   fetchImages();
// }, []);

// const fetchImages = async () => {
//   await unsplash
//     .get("/photos/random", {
//       params: {
//         count: 8,
//         client_id: "2LQ6nJARFf4wGO6z2XhBLdv4oQQaudmEZn6lYU4TMHE",
//       },
//     })
//     .then((res) => {
//       res.data.forEach((image, index) => {
//         image.key = index;
//       });
//       setImages([...images, ...res.data]);
//     });
// };

// return (
//   <Fragment>
//     <div className="image-slider">
//       {/* <InfiniteScroll
//         dataLength={images.length}
//         next={fetchImages}
//         hasMore={true}
//         loader={<Loading />}
//       > */}
//       <div className="image-slider__container">
//         {imageGridAnim.map((obj) => (
//           <animated.div className="image-slider__image-container" style={obj.props}>
//             <GridImage url={obj.item.url} key={obj.key} />
//           </animated.div>
//         ))}
//         {/* {images.map((image) => (

//               <GridImage fadeIn={fadeIn}  url={image.urls.small} key={image.key} />

//           ))} */}
//       </div>
//       {/* </InfiniteScroll> */}
//     </div>
//   </Fragment>
// );
