import React from 'react';
import './App.css';
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
