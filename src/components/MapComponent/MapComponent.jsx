import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 10.762622,
  lng: 106.660172, // Vị trí tùy chỉnh
};

function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDHMC_5bTowrjXmuu0kLAMB4d0hNsm0Xm8">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapComponent);
