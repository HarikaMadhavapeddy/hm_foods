import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, database } from "../Firebase/Firebase";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const Navigate = useNavigate();
  const {user}=useSelector(state=>state.auth);
  useEffect(() => {
    if (!user?.uid) {
      //Navigate("/login");
      //return;
    }
    console.log(user);
    const Ref = ref(database, `orders/${user?.uid}`);
    get(Ref)
      .then((response) => {
        if (response.exists()) {
          setOrders(Object.values(response.val()));
          console.log(Object.values(response.val()));
        }
      })
      .catch();
  }, []);
  return (
    <div className="orders_container">
      {orders && orders.length>0 ? <> {orders?.map((order) => (
          <div className="orders_container_single">
            <h5>Order Id : {order.orderId}</h5>
            <div className="orders_container_single_items">
              {order?.items?.map((item, index) => (
                <>
                  {index < 3 && (
                    <div className="orders_container_single_items_order">
                      <img src={item.image} />
                      <p>{item.name}</p>
                    </div>
                  )}
                </>
              ))}
              <div
                className="orders_container_single_items_summary"
                onClick={() => Navigate(`/orders/${order.orderId}`)}
              >
                View order summary
              </div>
            </div>
            <div className="orders_container_single_button_container">
              <button
                className="orders_container_single_button"
                onClick={() => Navigate("/reorder", { state: { order } })}
              >
                ReOrder
              </button>
            </div>
          </div>
        ))}</>: <>...No orders to display</>}
    </div>
  );
}
