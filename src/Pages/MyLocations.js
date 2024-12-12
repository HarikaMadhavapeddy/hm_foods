import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { hm_foods_location1 } from "../assests/Constants";
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MyLocations() {
  return (
    <div>
        
      <MapContainer style={{width:'80vw',height:'80vh'}} center={[32.842112, -96.994563]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={hm_foods_location1}>
          <Popup>
            Hm Foods, Irving
          </Popup>
        </Marker>
        <Marker position={[32.739815, -97.104915]}>
          <Popup>
            Hm Foods, Arlington
          </Popup>
        </Marker>
        <Marker position={[32.964538, -96.64608]}>
          <Popup>
            Hm Foods, Richardson
          </Popup>
        </Marker>
        <Marker position={[33.160413, -96.814069]}>
          <Popup>
            Hm Foods, Frisco
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}
