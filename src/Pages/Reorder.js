import { ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, database } from "../Firebase/Firebase";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

export default function Reorder() {
  const [ExistingOrder, setExistingOrder] = useState(null);
  const { userLocation } = useSelector((state) => state.cart);
  const Navigate=useNavigate();
  const Location = useLocation();
  useEffect(() => {
    setExistingOrder(Location.state.order);
    console.log(Location.state.order);
  }, []);
  function handleOrders() {
    if (!auth?.currentUser?.uid) {
      Navigate("/login");
    }else{
        const Order = {
            items: ExistingOrder.items,
            orderDate: new Date().toISOString(),
            TotalPrice:ExistingOrder.TotalPrice,
            address: userLocation,
            orderId: uuidv4(),
          };
      
          const Ref = ref(
            database,
            `orders/${auth.currentUser.uid}/${Order.orderId}`
          );
          set(Ref, Order)
            .then((response) => {
              console.log("order created successfully");
              sessionStorage.setItem(Order.orderId,JSON.stringify(Order));
              Navigate(`/OrderSummary/${Order.orderId}`);

            })
            .catch();
    }
    
  }
  return (
    <div>
      {ExistingOrder && (
        <>
          <p>Reference Order Id : {ExistingOrder.orderId}</p>
          {ExistingOrder.items.map((item) => (
            <>
              <img src={item.image} />
              <p>{item.name}</p>
            </>
          ))}
          <p>Total price : ${ExistingOrder.TotalPrice}</p>
          <button onClick={handleOrders}>Procced to payment</button>
        </>
      )}
    </div>
  );
}
