import React, { useState } from "react";
import Map, { Popup, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Mapbox = ({ longitude, latitude, tenViTri, tinhThanh, image }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  const handleClick = (event) => {
    const { lngLat } = event;

    const locationInfo = {
      name: tenViTri,
      province: tinhThanh,
      image: image,
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    };

    if (
      popupInfo &&
      popupInfo.longitude === lngLat.lng &&
      popupInfo.latitude === lngLat.lat
    ) {
      setPopupInfo(null);
      setPopupInfo(locationInfo);
    }
  };

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiZ2FpbG5ndXllbiIsImEiOiJjbTFxaW54dngwMGhnMmpwcTk2ZWNuZjZ4In0.HPELIvfx_t6_c7mLzgfbBA"
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onClick={handleClick}
    >
      <Marker
        longitude={longitude}
        latitude={latitude}
        color="red"
        onClick={handleClick}
      />
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={true}
          closeButton={false}
        >
          <div className="mapImg">
            <h2 className="font-semibold text-sm mb-2">
              {popupInfo.name} - {popupInfo.province}
            </h2>
            <img src={popupInfo.image} alt="" />
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default Mapbox;
