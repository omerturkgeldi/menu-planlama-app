import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


function App() {

  var isLoggedIn = true

  return (

    <Router>


      {!isLoggedIn ?

        <LoginPage />
        : <div className="App">
          <Sidebar />
          <div id="bodyId">
            <Layout />
          </div>
        </div>
      }



    </Router>

  );
}

export default App;
