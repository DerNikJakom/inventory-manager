import React, { useState } from "react";
import SignIn from "./SignIn";
import Home from "./Home";
import "../styles/App.css";

function App() {
  const [isRegistered, setRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false); // ! Status
  const [currentUserID, setCurrentUserID] = useState(0);

  const addUser = (user) => {
    setUser((prevValue) => {
      return [...prevValue, user];
    });
  };

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
          register={setRegistered}
          addUser={addUser}
          userID={setCurrentUserID}
        />
      </>
    );
  }
}

export default App;
