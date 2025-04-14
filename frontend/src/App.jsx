import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing.jsx";
import Authentication from "./pages/Authentication.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import VideoMeet from "./pages/VideoMeet.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";


function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/auth" element={<Authentication />}/>
          <Route path="/history" element={<History />}/>
          <Route path="/:url" element={<VideoMeet />}/>
        </Routes>
        </AuthProvider>
     
    </>
  );
}

export default App;
