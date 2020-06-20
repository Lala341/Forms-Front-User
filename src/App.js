import React from 'react';
import './App.css';
import {Singleton} from './components/webrtc_connection/singleton';
import VideoExample from './components/recordVideo/video';
import 'react-notifications-component/dist/theme.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import General from './General';
import ReactNotification from 'react-notifications-component';

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
        <General rtc={rtc}/>
        </Route>
        <Route  exact path="/video">
          <VideoExample rtc={rtc} />
        </Route>
        </Switch>
</Router>
<ReactNotification />

    </div>
  );
}

export default App;
