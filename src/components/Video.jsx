import ReactPlayer from "react-player";

function VideoComp() {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url="../Video/menuVideo.mp4"
        controls={true}
      />
    </div>
  );
}

export default VideoComp;
