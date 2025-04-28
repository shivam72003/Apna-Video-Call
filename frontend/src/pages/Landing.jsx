import React from "react";
import { href, Link, useNavigate } from "react-router-dom";


function Landing() {
  const router = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navheader">
          <h2>Apna Video Call</h2>
        </div>
        <div className="navlist">
          <p onClick={()=>{
            router("/nejfbiebfueo")
          }}>Join As Guest</p>
          <p onClick={()=>{
            router("/auth")
          }}  >Register</p>
          <div onClick={()=>{
            router("/auth")
          }} role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingmainContent">
        <div className="part1">
          <h1>
            <span style={{ color: "rgb(255, 166, 0)" }}>Connect</span> With Your
            Loved One
          </h1>

          <p>Cover A Distance With Apna Video Call</p>
          <div role="button">
           <Link to={"/home"}>Get Started</Link>
          </div>
        </div>
        <div className="part2">
          <img src="https://apnajob.in/wp-content/uploads/2021/11/tab1.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
