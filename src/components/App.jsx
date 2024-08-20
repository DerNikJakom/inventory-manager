import React, { useState } from "react";
import SignIn from "./SignIn";
import Home from "./Home";
import "../styles/App.css";

function App() {
  const [isRegistered, setRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false); // ! Status richtig setzen, evtl auslagern
  const [currentUserID, setCurrentUserID] = useState(0);

  function logOut() {
    setLoggedIn(false);
  }

  if (isLoggedIn) {
    return (
      <>
        <Home logOut={logOut} userID={currentUserID} />
      </>
    );
  } else {
    return (
      <>
        <SignIn
          login={setLoggedIn}
          isRegistered={isRegistered}
          setRegistered={setRegistered}
          userID={setCurrentUserID}
        />
      </>
    );
  }
}

export default App;
