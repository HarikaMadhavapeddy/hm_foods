import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import {
  ClearCart,
  DecreaseItemQuantity,
  IncreaseItemQuantity,
} from "../Redux/CartSlice";
import { ref, set } from "firebase/database";
import { auth, database } from "../Firebase/Firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function Cart() {
  const { items, userLocation } = useSelector((state) => state.cart);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const TotalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  function handleOrders() {
    if (!auth?.currentUser?.uid) {
      Navigate("/login");
    } else {
      const Order = {
        items: items,
        orderDate: new Date().toISOString(),
        TotalPrice,
        address: userLocation,
        orderId: uuidv4(),
      };
      sessionStorage.setItem(Order.orderId, JSON.stringify(Order));
      handlePayment(Order.items,Order.orderId);
    }
  }
  async function handlePayment(items,orderId) {
    console.log(items);
    const stripePromise = await loadStripe(
      "pk_test_51QT3ejL1tCSuZkMjHN8GhER1wm6iifuNAnrDwGwEE8YMDsyelBENRI21TmNaaIFJlmaT9FvIQG7rQdDYJB8EWnb800giIxq6xV"
    );
    axios
      .post("https://hm-foods-backend.vercel.app/create-payment-session", {
        orderItems: items,
        orderId
      })
      .then((response) => {
        console.log(response);
        if (response?.data?.id) {
          console.log(response.data.id);
          stripePromise.redirectToCheckout({ sessionId: response.data.id });
        }
      })
      .catch();
  }
  return (
    <div className="cart_container">
      <div className="cart_container_left">
        {items.map((item) => (
          <div className="cart_container_left_single">
            <div>
              <img src={item.image} />
            </div>
            <span className="cart_container_left_single_name">{item.name}</span>
            <div>
              <button
                id="negative"
                onClick={() => Dispatch(DecreaseItemQuantity(item))}
              >
                -
              </button>
              <span className="cart_container_left_single_quantity">
                {item.quantity}
              </span>
              <button
                id="positive"
                onClick={() => Dispatch(IncreaseItemQuantity(item))}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart_container_right">
        {items.map((item) => (
          <div className="cart_container_right_item">
            {item.name} : ${item.price} * {item.quantity}
          </div>
        ))}
        <span className="cart_container_right_totalPrice">
          Total Price : ${TotalPrice}
        </span>
        <button className="cart_container_right_button" onClick={handleOrders}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
