import { ref } from "firebase/storage";
import React, { useEffect } from "react";
import { storage } from "../Firebase/Firebase";
import './Dashboard.css';

export default function Dashboard() {
  const dashboard1 =
    "https://firebasestorage.googleapis.com/v0/b/hm-foods.appspot.com/o/dashboard1.png?alt=media&token=6a3e57ee-d50e-4929-8421-9d7a0a31cca7";
  const dashboard2 =
    "https://firebasestorage.googleapis.com/v0/b/hm-foods.appspot.com/o/dashboard2.png?alt=media&token=b33ca980-352f-41d6-af2a-74673247ff5a";
  const dashboard3 =
    "https://firebasestorage.googleapis.com/v0/b/hm-foods.appspot.com/o/dashboard3.png?alt=media&token=c75c30b3-2f88-4e1e-b197-858996055379";

  return (
    <div className="dashboard_container">
        <div className="dashboard_container_image">
        <img src={dashboard3} />
        </div>
        <div className="dashboard_container_text">
            <p>Order your favourite<br/> food here</p>
            <span>Experience the convenience of food delivery at your finger tips with our app. Order now and enjoy<br/> delicious meals delivered straight to your door.</span>
        </div>
        <div className="dashboard_container_title">
        <h1>Explore our menu</h1>
        <div className="dashboard_container_title_text">Experience the convenience of food delivery at your finger tips with our app. Order now and enjoy<br/> delicious meals delivered straight to your door.</div>
        </div>
      
    </div>
  );
}
