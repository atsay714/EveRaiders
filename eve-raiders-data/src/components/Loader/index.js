import React from "react";
import RingLoader from "react-spinners/RingLoader";

const Loader = ({ size = 20 }) => (
  <RingLoader
    size={size}
    color={getComputedStyle(document.documentElement).getPropertyValue(
      "--color-text-white"
    )}
  />
);

export default Loader;
