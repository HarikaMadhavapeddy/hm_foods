import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    pwd: "",
  });
  const Navigate = useNavigate();
  function handleLogin() {
    signInWithEmailAndPassword(auth, user.email, user.pwd)
      .then((response) => {
        console.log("user login success", response);
        Navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div>
      <input
        type="email"
        value={user.email}
        placeholder="enter your email address"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        value={user.pwd}
        placeholder="enter your password"
        onChange={(e) => setUser({ ...user, pwd: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
