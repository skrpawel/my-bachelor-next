import React from "react";
const Video = () => {
  return (
    <video autoPlay loop muted className="z-[-1]">
      <source src="//running.mp4" type="video/mp4" />
    </video>
  );
};

export default Video;
