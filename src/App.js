import React from 'react';
import './App.css';
import Image from "./components/uploadImages/uploadImages";
import RecordAudio from "./components/recordAudio/recordAudio";

function App() {
  return (
    <div className="App">
      <Image></Image>
      <RecordAudio></RecordAudio>
    </div>
  );
}

export default App;
