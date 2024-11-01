"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const PromotionalVideo = () => {
  return (
    <CldVideoPlayer
      width="640"
      height="360"
      src="repair-sg-video"
      autoplay
      loop
      playsinline
      muted
    />
  );
};

export default PromotionalVideo;
