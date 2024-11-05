import React, { useState, useRef, useEffect } from "react";
import Map, { Popup, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Mapbox = ({ longitude, latitude, tenViTri, tinhThanh, image }) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef(null);

  const handleMarkerClick = () => {
    const locationInfo = {
      name: tenViTri,
      province: tinhThanh,
      image: image,
      longitude: longitude,
      latitude: latitude,
    };

    setTimeout(() => {
      setPopupInfo(locationInfo);
    }, 300);

    setPopupInfo(null);
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.scrollZoom.disable();

      mapRef.current.on("click", () => {
        mapRef.current.scrollZoom.enable();
      });

      mapRef.current.on("mouseout", () => {
        mapRef.current.scrollZoom.disable();
      });

      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 10,
        essential: true,
      });
    }
  }, [longitude, latitude]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken="pk.eyJ1IjoiZ2FpbG5ndXllbiIsImEiOiJjbTFxaW54dngwMGhnMmpwcTk2ZWNuZjZ4In0.HPELIvfx_t6_c7mLzgfbBA"
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker
        longitude={longitude}
        latitude={latitude}
        color="red"
        onClick={handleMarkerClick}
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
