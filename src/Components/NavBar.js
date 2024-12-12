import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { BsCart2 } from "react-icons/bs";
import axios from "axios";
import logo from "../assests/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";

export default function NavBar({location}) {
 
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const CartQuantity = cart.reduce(
    (totalQuantity, item) => item.quantity + totalQuantity,
    0
  );
  console.log("harika", CartQuantity, auth.currentUser);
  
  function handleLogin() {
    Navigate("/login");
  }
  function handleLogout() {
    signOut(auth)
      .then((response) => {
        console.log("user signedout");
        Navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <div className="NavBar_Container">
      <div className="NavBar_Container_left" onClick={()=>Navigate("/")}>
        <img src={logo} />
      </div>
      {/*<div className="NavBar_Container_search">
        <input type="text" placeholder="Search" />
      </div>*/}
      <div className="NavBar_Container_right">
        <div>
          {location
            ? `Delivering to ${location.city},${location.state}`
            : "loading"}
        </div>
        <div className="NavBar_Container_right_location" onClick={()=>Navigate('/location')}>Locations</div>
        <div>
            {auth.currentUser? `Hello ${auth.currentUser.displayName}`: 'Hello Guest'}
            
        </div>
        <div className="NavBar_Container_right_order" onClick={()=>Navigate('/orders')}>orders</div>
        <div className="NavBar_Container_right_cart" onClick={() => Navigate("/cart")}>
          <BsCart2 className="NavBar_Container_right_cart_image"/>
          <div className="NavBar_Container_right_cart_value">{CartQuantity > 0 ? CartQuantity : "0"}</div>
          
        </div>
        {
          auth&& auth?.currentUser?.email==='hm_admin@gmail.com' &&<div className="NavBar_Container_right_manage" onClick={()=>Navigate('/manage')}>Manage</div>
        }
        
        <div className="NavBar_Container_right_button">
          {auth?.currentUser?.uid ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>
      </div>
    </div>
  );
}
