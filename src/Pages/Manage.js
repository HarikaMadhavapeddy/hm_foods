import { get, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";
import "./Manage.css";
import Popup from "../Components/Popup";

export default function Manage() {
  const [firebaseData, setFirebaseData] = useState(null);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    const Ref = ref(database, "food_items");
    get(Ref)
      .then((response) => {
        if (response.exists()) {
          //setFirebaseData(response.val());
          console.log(Object.entries(response.val()));
          const newArray = Object.entries(response.val()).map(
            ([key, value]) => ({ ...value, key })
          );
          console.log(newArray);
          setFirebaseData(newArray);
        }
      })
      .catch();
  }, []);
  function handleDeleteFromFirebase(key) {
    const Ref = ref(database, `food_items/${key}`);
    remove(Ref)
      .then((response) => {
        setFirebaseData((prev) => prev.filter((item) => item.key !== key));
      })
      .catch();
  }
  function handleEditfromFirebase(key) {
    setModal(true);
    const toEdit = firebaseData.find((item) => item.key === key);
    console.log("is key present", toEdit);
    setEditData(toEdit);
  }
  function handleAddToFirebase(data) {
   
    const Ref = ref(database, "food_items");
    const NewData = { ...data, _id: Date.now() };

    push(Ref, NewData)
      .then((response) => {
        setFirebaseData([{ ...NewData, key: response.key }, ...firebaseData]);
      })
      .catch().finally(()=> handleOnClose());
  }
  function handleEditToFirebase(data) {
    const FoodRef = ref(database, `food_items/${data.key}`);
    set(FoodRef, data)
      .then((response) => {
        console.log(response);
        alert("updated successfully");
        setFirebaseData(prev=>prev.map(item=>item.key===data.key? data:item));
      })
      .catch()
      .finally(() => {
        handleOnClose();
      });
  }
  function handleOnClose() {
    setModal(false);
    setEditData(null);
  }
  function handleAddCategoryToFirebase(data) {
    const Ref = ref(database, "slider");
    push(Ref, data)
      .then((response) => {})
      .catch();
  }
  return (
    <div className="manage">
      {modal && (
        <>
          {editData ? (
            <Popup
              close={handleOnClose}
              AddOrSave={handleEditToFirebase}
              data={editData}
              heading="Edit Item"
            />
          ) : (
            <Popup
              AddOrSave={handleAddToFirebase}
              close={handleOnClose}
              AddNewCategory={handleAddCategoryToFirebase}
            />
          )}
        </>
      )}
      <div>
        <button onClick={() => setModal(true)}>Add New Item</button>
      </div>

      <div className="manage_container">
        {firebaseData &&
          firebaseData.map((item) => (
            <div className="manage_container_single">
              <img src={item.image} />
              <p>{item.name}</p>
              <button onClick={() => handleEditfromFirebase(item.key)}>
                Edit
              </button>
              <button onClick={() => handleDeleteFromFirebase(item.key)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
