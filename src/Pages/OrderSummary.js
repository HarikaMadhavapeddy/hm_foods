import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderSummary.css";
import DeliveryMap from "../Components/DeliveryMap";
import { get, ref } from "firebase/database";
import { auth, database } from "../Firebase/Firebase";

export default function OrderSummary() {
  const [disableButton, setDisableButton] = useState(false);
  const [timeLeft, setTimeleft] = useState(60);
  const [order,setOrder]=useState(null);
  const params = useParams();
  useEffect(()=>{
    if(auth.currentUser){
      const Ref=ref(database,`orders/${auth.currentUser.uid}/${params.orderId}`);
      get(Ref).then((response)=>{
        if(response.exists()){
          console.log(response.val());
          setOrder(response.val());
        }
      }).catch();
    }
   
  },[auth.currentUser]);
  const Navigate = useNavigate();
  //console.log(order);
  function GetPacificTime(utcstr) {
    const UTCDate = new Date(utcstr);
    console.log(utcstr, UTCDate);
    const pacificTime = UTCDate.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
    });
    console.log(pacificTime);
    return new Date(pacificTime);
  }
  useEffect(() => {
    if(order){
      const OrderTime = new Date(order.orderDate).getTime();
      const CurrentTime = new Date().getTime();
      //console.log(OrderTime.getTime());
      const RemainingTime = Math.max(
        60 - Math.floor((CurrentTime - OrderTime) / 1000),
        0
      );
      console.log(RemainingTime);
      if (RemainingTime === 0) {
        setDisableButton(true);
        return;
      }
      const timer = setInterval(() => {
        setTimeleft((prev) => {
          if(prev<=1){
              clearInterval(timer);
              setDisableButton(true);
              return 0;
          }
          return prev-1;
        });
      }, 1000);
  
      return ()=>clearInterval(timer);
    }
    
  }, [order]);
  return (
    <div className="OrderSummary_container">
      {order && <>
        <div><DeliveryMap /></div>
      {!disableButton && <div>Time Left to cancel the order:{timeLeft}</div>}
      
      <button  disabled={disableButton}>Cancel Order</button>
      <div className="OrderSummary_container_second">
        <h5>Order Id : {order.orderId}</h5>
        {order.items.map((item) => (
          <div className="OrderSummary_container_second_item">
            <img src={item.image} />
            <span className="OrderSummary_container_second_item_name">{item.name}</span>
          </div>
        ))}
        <p> Total Price : ${order.TotalPrice}</p>
        {/*<p>Address : {Object.entries(order.address).map(([label,value])=>(<p>{label}:{value}</p>))}</p>*/}
        <p>
          Address: {order.address.road}, {order.address.city}
        </p>
        <button className="OrderSummary_container_second_button" onClick={() => Navigate("/orders")}>View all orders</button>
        
      </div>
      </>}
      
    </div>
  );
}
