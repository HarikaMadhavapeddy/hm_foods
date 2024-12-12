import { useEffect } from "react";
import {
    useMap,
} from "react-leaflet";

export const SetBounds = ({ userPosition, restaurantPosition }) => {
    const map = useMap();
  
    useEffect(() => {
      if (userPosition && restaurantPosition) {
        const bounds = [userPosition, restaurantPosition];
        map.fitBounds(bounds); 
      }
    }, [userPosition, restaurantPosition, map]);
  
    return null;
  };