import React from 'react';
import VideoRecorder from 'react-video-recorder';
import DisconnectedView from 'react-video-recorder';

export default function VideoExample(){
    return (
  <VideoRecorder style={{height: "700px!important", width: "100%"}}
    onRecordingComplete={(videoBlob) => {
      // Do something with the video...
      console.log('videoBlob', videoBlob)
    }} 
    renderDisconnectedView={
        () => <DisconnectedView width= "100%" height= "100%" style={{height: "700px!important", width: "100%"}}/>
    }
    
  />);
}