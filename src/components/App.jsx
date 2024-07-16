import React, { useState } from "react";
import SignIn from "./SignIn";
import Home from "./Home";
import "../styles/App.css";

function App() {
  const [isRegistered, setRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [users, setUser] = useState([]);

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
        <Home logOut={logOut} />
      </>
    );
  } else {
    return (
      <>
        <SignIn
          login={setLoggedIn}
          register={setRegistered}
          users={users}
          addUser={addUser}
        />
      </>
    );
  }
}

export default App;
