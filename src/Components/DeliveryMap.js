import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { hm_foods_location1, hm_foods_location2 } from "../assests/Constants";
import burgerIcon from "../assests/logo.png";
import pizzaIcon from "../assests/pizaa.png";
import { SetBounds } from "./SetBounce";

const RestaurantIcon = L.icon({
  iconUrl: pizzaIcon,
  iconSize: [32, 32], // Default size
  iconAnchor: [16, 32], // Anchor point
});
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function DeliveryMap() {
  console.log(window.userCordinates);
  return (
    <div>
      <MapContainer
        style={{ width: "80vw", height: "80vh" }}
        center={hm_foods_location2}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={RestaurantIcon} position={hm_foods_location2}>
          <Popup>Hm Foods, Irving</Popup>
        </Marker>
        {window?.userCordinates && (
          <Marker position={window.userCordinates}>
            <Popup>User Location</Popup>
          </Marker>
        )}
        <>
          {hm_foods_location2 && window?.userCordinates && (
            <>
              <Polyline
                positions={[window.userCordinates, hm_foods_location2]}
                color="blue"
                weight={2}
                dashArray="2,8"
              />
              <SetBounds
                userPosition={window.userCordinates}
                restaurantPosition={hm_foods_location2}
              />
            </>
          )}
        </>
      </MapContainer>
    </div>
  );
}
