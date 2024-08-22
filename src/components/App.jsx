import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "./SignIn";
// import Home from "./Home";
import "../styles/App.css";
import Homepage from "../pages/Homepage";
import NoPage from "../pages/NoPage";
import Layout from "../pages/Layout";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  // const [isRegistered, setRegistered] = useState(false);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const [currentUserID, setCurrentUserID] = useState(0);
  // function logOut() {
  //   setLoggedIn(false);
  // }
  // if (isLoggedIn) {
  //   return (
  //     <>
  //       <Home logOut={logOut} userID={currentUserID} />
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <SignIn
  //         login={setLoggedIn}
  //         isRegistered={isRegistered}
  //         setRegistered={setRegistered}
  //         setUserID={setCurrentUserID}
  //       />
  //     </>
  //   );
  // }
}
