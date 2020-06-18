import React from 'react';
import Image from "./components/uploadImages/uploadImages";
import RecordAudio from "./components/recordAudio/recordAudio";
import Button from '@material-ui/core/Button';

function General() {
  return (
    <div className="App">
      <Image></Image>
      <RecordAudio></RecordAudio>
      <Button variant="contained" href="/video" type="button" style={{marginTop: "5%"}}>Video</Button>
      
    </div>
  );
}

export default General;
