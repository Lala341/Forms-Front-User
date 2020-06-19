import React from 'react';
import './App.css';
import Image from "./components/uploadImages/uploadImages";
import RecordAudio from "./components/recordAudio/recordAudio";
import {Singleton} from './components/webrtc_connection/singleton';
import VideoExample from './components/recordVideo/video';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import General from './General';

function App() {
  console.log('Hello World!');
  
  const rtc = Singleton.getInstance();
  rtc.makeCall().then((connected) => {
    console.log("socket: " + connected);
  });

  
  return (
    <div className="App">
      
<Router>
  <Switch>
      <Route exact path="/">
        <General />
        </Route>
        <Route  exact path="/video">
          <VideoExample />
        </Route>
        </Switch>
</Router>
      
    </div>
  );
}

export default App;
