import React from "react";
import Skeleton from "@mui/material/Skeleton";

function Loader() {
  return (
    <Skeleton
      animation="wave"
      sx={{ height: 500, width: "100%" }}
      variant="rectangular"
    />
  );
}
export default Loader;
