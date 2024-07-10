import React, { useState } from "react";
import SignIn from "./SignIn";
import "../styles/App.css";

function App() {
  const [isRegistered, setRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
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
        <h1>Intern</h1>
        <button onClick={logOut}>Log out</button>
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
