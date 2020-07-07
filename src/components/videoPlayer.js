import React from "react";
import Video from "../videos/video.mp4";

function VideoPlayer() {
  return (
    <div className="App">
        <video controls loop src={Video} type="video/mp4" width={600} />
    </div>
  );
}

export default VideoPlayer; 