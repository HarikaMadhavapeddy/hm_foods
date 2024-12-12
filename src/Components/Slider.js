import React, { useEffect, useState } from "react";
import image from "../assests/pizza_new.png";
import "./Slider.css";
import { get, ref } from "firebase/database";
import { database } from "../Firebase/Firebase";

export default function Slider({setActiveCategory, activeCategory}) {
  //const [activeCategory, setActiveCategory] = useState();
  const [slider, setSlider] = useState(null);
  const [loader, setLoader] = useState(false);
  const dummyArray = new Array(8).fill(null);
  const data = [
    { name: "Biryani", img: image },
    { name: "cake", img: image },
    { name: "italian", img: image },
    { name: "Drinks", img: image },
    { name: "Appetizers", img: image },
    { name: "Bread", img: image },
    { name: "Main-course", img: image },
  ];
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      const dataRef = ref(database, "slider");
      get(dataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setSlider(Object.values(snapshot.val()));
          }
        })
        .catch(() => {})
        .finally(() => setLoader(false));
    }, 1000);
  }, []);
  function handleClick() {}
  return (
    <div className="slider_container">
      {loader ? (
        <>
          {dummyArray.map((item) => (
            <div className="slider_container_items">
                <div className="Loader"></div>
            </div>
          ))}
        </>
      ) : (
        <>
          {slider &&
            slider.length > 0 &&
            slider.map((item) => (
              <div
                className="slider_container_items"
                onClick={() => setActiveCategory(item.menu_name)}
              >
                <img
                  className={activeCategory === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                />
                <p>{item.menu_name}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
