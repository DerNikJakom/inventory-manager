import React, { useState } from "react";
import SignIn from "./SignIn";
import Home from "./Home";
import "../styles/App.css";

export default function App() {
  const [isRegistered, setRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);

  function logOut() {
    setLoggedIn(false);
    setCurrentUserID(null);
  }

  return (
    <>
      {isLoggedIn ? (
        <Home logOut={logOut} userID={currentUserID} />
      ) : (
        <SignIn
          login={setLoggedIn}
          isRegistered={isRegistered}
          setRegistered={setRegistered}
          setUserID={setCurrentUserID}
        />
      )}
    </>
  );
}
