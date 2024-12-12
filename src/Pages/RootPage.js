import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";
import "./RootPage.css";
import { useDispatch } from "react-redux";
import { UpdateLocation } from "../Redux/CartSlice";

export default function RootPage() {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [location, setLocation] = useState(null);
  const Dispatch=useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        const { latitude, longitude } = position.coords;
        window.userCordinates=[latitude,longitude];
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          .then((response) => {
            console.log(response.data);
            setLocation({
              city: response.data.address.city,
              state: response.data.address.state,
            });
            Dispatch(UpdateLocation(response.data.address));
            setPermissionDenied(false);
          })
          .catch((error) => console.log(error.message));
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setPermissionDenied(true);
        }
      }
    );
  }, []);
  return (
    <div>
      {permissionDenied && (
        <div className="overlay_container">
          <div className="overlay_container_popup">Please enable geo location to proceed with.</div>
        </div>
      )}
      <NavBar location={location} />
      <Outlet />
    </div>
  );
}
