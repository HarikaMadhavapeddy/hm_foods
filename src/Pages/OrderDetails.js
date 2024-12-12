import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, database } from "../Firebase/Firebase";
import './OrderDetails.css';

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const params = useParams();
  //var Date=order?.orderDate && new Date(order.orderDate);
  console.log(new Date(order?.orderDate));
  function ShortFormatDate(value){
    return value.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
    }
  useEffect(() => {
    const Ref = ref(database, `orders/${auth.currentUser?.uid}/${params.orderid}`);
    get(Ref)
      .then((response) => {
        if (response.exists()) {
          setOrder(response.val());
          console.log(response.val());
        }
      })
      .catch();
  }, []);
  return (
    <div className="orderDetails_container">
      {order? (
        <div className="orderDetails_container_details">
              <h3>Order Id : {order.orderId}</h3>
              <p>Order Date: {ShortFormatDate(new Date(order.orderDate))}</p>
              {order.items.map((item) => (
                <div className="orderDetails_container_details_items">
                  <img src={item.image} />
                  <span>{item.name}</span>
                  <span>quantity : {item.quantity}</span>
                  <span>Price : ${item.price}</span>
                </div>
              ))}
              <p>Total Price : ${order.TotalPrice}</p>
              <p>Address: {order.address.road}, {order.address.city}</p>
              
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
