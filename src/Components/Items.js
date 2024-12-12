import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";
import "./Items.css";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function Items({ category }) {
  const [menuData, setMenuData] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  useEffect(() => {
    const dataRef = ref(database, "food_items");
    get(dataRef)
      .then((response) => {
        if (response.exists()) {
          if(Array.isArray(response.val())){
            setMenuData(response.val());
          }else{
            setMenuData(Object.values(response.val()));
          }
          
          console.log(Object.values(response.val()));
        }
      })
      .catch();
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "left", paddingLeft: "50px" }}>
        Top dishes near you
      </h1>
      <div className="Menu_conatiner">
        {/*console.log(menuData,menuData.length,category)*/}
        {menuData &&
          menuData.length > 0 &&
          menuData.map((item) => (
            <>
              {(category === item.category ||
                category === "all" )&& <Card cart={cartItems} item={item} />}
            </>
          ))}
      </div>
    </>
  );
}
