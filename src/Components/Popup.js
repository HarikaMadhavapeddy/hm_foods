import React, { useEffect, useState } from "react";
import "../Pages/Manage.css";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { database, storage } from "../Firebase/Firebase";
import { get, ref } from "firebase/database";

export default function Popup({
  heading = "Add New Item",
  data = {},
  close,
  AddOrSave,
  AddNewCategory = () => {},
}) {
  const [newCategory, setNewCategory] = useState(false);
  const [editData, setEditData] = useState(data);
  const [imageFile, setImageFile] = useState(null);
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [slidermenu, setSliderMenu] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [popupLoader,setPopupLoader]=useState(false );
  useEffect(() => {
    const dataRef = ref(database, "slider");
    get(dataRef)
      .then((response) => {
        if (response.exists()) {
          setSliderMenu(Object.values(response.val()));
        }
      })
      .catch();
  }, []);
  function handleImageUpload(e) {
    setImageFile(e.target.files[0]);

    setImagePreview(URL.createObjectURL(e.target.files[0]));
    console.log(
      "uploaded image",
      e.target.files[0],
      URL.createObjectURL(e.target.files[0])
    );
  }
  function handleAddItem() {
    const storageRef = ref(storage, `${imageFile.name}`);
    const upload = uploadBytesResumable(storageRef, imageFile);
    upload.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        console.log("line 42");
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  }
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "hm_foods");

    const dataResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dyotg25sp/image/upload",
      {
        method: "post",
        body: formData,
      }
    );

    return dataResponse.json();
  };
  async function handleAddFoodItem() {
    if (!imageFile) {
      alert("Please add image file");
      return;
    }
    if (
      !editData.name ||
      !editData.description ||
      !editData.price ||
      !editData.category
    ) {
      alert("Please enter all the required details");
      return;
    }
    setPopupLoader(true);
    const uploadImageCloudinary = await uploadImage(imageFile);
    console.log(uploadImageCloudinary.url);
    
    if (newCategory && !categoryImageFile) {
      alert("please upload new category image");
      return;
    }

    AddOrSave({ ...editData, image: uploadImageCloudinary.url });
    if (newCategory) {
      const uploadCategoryImageCloudinary = await uploadImage(
        categoryImageFile
      );

      AddNewCategory({
        menu_name: editData.category,
        menu_image: uploadCategoryImageCloudinary.url,
      });
      //write code to upload image and push new category to slider database
    }
    setPopupLoader(false);
  }
  async function handleEditFoodItem(){
    if (
      !editData.name ||
      !editData.description ||
      !editData.price ||
      !editData.category
    ) {
      alert("Please enter all the required details");
      return;
    }
    if (imageFile) {
      const uploadEditedImageCloudinary = await uploadImage(imageFile);
      AddOrSave({...editData,image:uploadEditedImageCloudinary.url});
    }else {AddOrSave(editData)}
      

  }

  return (
    <div className="manage_modal">
      {popupLoader&& <div className="manage_modal_loading">...In Process</div>}
      <div className="manage_modal_container">
        <h3>{heading}</h3>
        <input
          id="manage_modal_container_name"
          type="text"
          placeholder="Item name"
          value={editData?.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          required
        />
        <textarea
          name="Description"
          rows="4"
          cols="50"
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          value={editData?.description}
          placeholder="Item Description"
          defaultValue=""
          required
        />
        <label htmlFor="file">
          {heading === "Edit Item" ? "Edit Image" : "Upload Image"}
        </label>
        {imagePreview ? (
          <img src={imagePreview} style={{ width: "100px" }} />
        ) : (
          <>
            {editData.image && (
              <img src={editData.image} style={{ width: "100px" }} />
            )}
          </>
        )}
        <input
          id="file"
          type="file"
          onChange={(e) => handleImageUpload(e)}
          required
        />
        <div>
          <input
            type="number"
            placeholder="Price"
            value={editData?.price}
            onChange={(e) =>
              setEditData({ ...editData, price: e.target.value })
            }
            required
          />
          <select
            value={editData.category}
            id="manage_modal_container_dropdown"
            name="Category"
            onChange={(e) => {
              if (e.target.value === "Add_category_value") {
                setNewCategory(true);
              } else {
                setNewCategory(false);
                setEditData({ ...editData, category: e.target.value });
              }
            }}
          >
            {heading !== "Edit Item" && (
              <option value="">Select Category</option>
            )}
            {slidermenu &&
              slidermenu.map((item) => (
                <option value={item.menu_name}>{item.menu_name}</option>
              ))}
            {heading !== "Edit Item" && (
              <option value="Add_category_value">Add New Category</option>
            )}
          </select>
          {newCategory && (
            <>
              <input
                type="text"
                placeholder="Enter new category"
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />

              <input
                id="category_image"
                type="file"
                onChange={(e) => setCategoryImageFile(e.target.files[0])}
              />
            </>
          )}
        </div>
        {heading === "Add New Item" ? (
          <button onClick={handleAddFoodItem}>Add</button>
        ) : (
          <button onClick={handleEditFoodItem}>Save</button>
        )}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}
