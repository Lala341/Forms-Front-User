import React from 'react';
import './App.css';
import Image from "./components/uploadImages/uploadImages";
import RecordAudio from "./components/recordAudio/recordAudio";
import {Singleton} from './components/webrtc_connection/singleton';

function App() {
  console.log('Hello World!');
  
  const rtc = Singleton.getInstance();
  rtc.makeCall().then((connected) => {
    console.log("socket: " + connected);
  });

  
  return (
    <div className="App">
      <Image></Image>
      <RecordAudio></RecordAudio>
    </div>
  );
}

export default App;
