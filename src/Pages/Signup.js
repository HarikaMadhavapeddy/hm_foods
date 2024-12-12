import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import './Signup.css';

export default function Signup() {
  const [userInput, setUserInput] = useState({
    name:"",
    email: "",
    pwd: "",
    cpwd: "",
  });
  const Navigate = useNavigate();
  function handleSignup() {
    createUserWithEmailAndPassword(auth, userInput.email, userInput.pwd)
      .then((response) => {
        console.log("signup successful");
        return updateProfile(response.user, {displayName: userInput.name});
      }).then((response)=>{
        console.log('update successful');
        Navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <div className="signup_container">
      <div className="signup_container_box">
        <h2>Signup</h2>
      <input
        value={userInput.name}
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
      />  
      <input
        value={userInput.email}
        type="text"
        placeholder="Enter your email address"
        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
      />
      <input
        value={userInput.pwd}
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setUserInput({ ...userInput, pwd: e.target.value })}
      />
      <input
        value={userInput.cpwd}
        type="password"
        placeholder="Please confirm your password"
        onChange={(e) => setUserInput({ ...userInput, cpwd: e.target.value })}
      />
      <div className="signup_container_box_bottom">
      <button id="signup_container_box_bottom_signup" onClick={handleSignup}>Signup</button>
      <button id='signup_container_box_bottom_login' onClick={()=>Navigate('/login')}>Login</button>
      </div>
      
      </div>
      
    </div>
  );
}
