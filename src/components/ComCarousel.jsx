import React from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import DataCarousel from "../data/DataCarousel";

function ComCarousel() {
  return (
    <Carousel
      autoPlay={false}
      indicatorIconButtonProps={{
        style: {
          padding: "0.6rem", // 1
        },
      }}
      navButtonsAlwaysVisible
      animation="fade"
      duration={1200}
    >
      {DataCarousel.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}
export default ComCarousel;
function Item({ item: { image, description } }) {
  return (
    <Paper
      role="img"
      aria-label={description}
      title={description}
      sx={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: 500,
      }}
      elevation={7}
    />
  );
}
Item.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
