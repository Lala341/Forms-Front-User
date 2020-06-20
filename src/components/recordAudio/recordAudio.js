import { ReactMic } from 'react-mic';
import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import ReactAudioPlayer from 'react-audio-player';


export default function RecordAudio() {
  const [record, setRecord] = useState(false);
  const [player, setPlayer] = useState(false);
  const [linkRecord, setLinkRecord] = useState("");

  const startRecording = () => {
    setRecord( true );
  }
 
  const stopRecording = () => {
    setRecord(false );
  }
  const onData = (recordedBlob) =>  {
    console.log('chunk of real-time data is: ', recordedBlob);
    
  }
 
  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setPlayer(true);
    setLinkRecord(recordedBlob.blobURL);
  }
 
 
  
    return (
      <div style={{textAlign: "center"}}>
          <div className="row" style={{width: "400px"}}>
              <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#3000F6"
          backgroundColor="#ffffff"
           />
          </div>
          <div className="row">
          <Button variant="contained" onClick={startRecording} type="button">Start</Button>
        <Button variant="contained" onClick={stopRecording} type="button">Stop</Button>
          </div>
          {player&&<div className="row" style={{paddingTop: "5%"}}>
          <ReactAudioPlayer
  src={linkRecord}
  autoPlay
  controls
/>
          </div>}
          
        

        
      </div>
    );
  
}