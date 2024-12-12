import React from "react";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  DecreaseItemQuantity,
  IncreaseItemQuantity,
} from "../Redux/CartSlice";

export default function Card({ cart, item }) {
  const isItemAvaliableInCart = cart.find(
    (cartitem) => cartitem._id === item._id
  );
  //console.log(isItemAvaliableInCart);
  const Dispatch = useDispatch();
  console.log('In Card.js');

  return (
    <div className="card_container">
      <div className="card_container_individual">
        <div className="card_container_individual_relative">
          <img src={item.image} />
          <div className="card_container_individual_absolute">
            {isItemAvaliableInCart === undefined ? (
              <div>
                <button id="positive_initial" onClick={() => Dispatch(AddToCart(item))}>+</button>
              </div>
            ) : (
              <div>
                <button id="negative" onClick={() => Dispatch(DecreaseItemQuantity(item))}>
                  -
                </button>
                <span className="card_container_individual_absolute_quantity">{isItemAvaliableInCart.quantity}</span>
                <button id="positive" onClick={() => Dispatch(IncreaseItemQuantity(item))}>
                  +
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="card_container_individual_details">
            <div className="card_container_individual_details_section1">
            <h3>{item.name}</h3>
            <p className="card_container_price">${item.price}</p>
            </div>
          
          <p className="card_container_description">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
