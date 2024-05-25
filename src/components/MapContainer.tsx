import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
// import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import "./leaflet.css";
// import LeafletControlGeocoder from "./leaflet-control";

import SearchField from "./SearchField";

import UseRouteControl from "../hooks/useRouteControl";
import { useEvent } from "../hooks/useEvent";

const LeafletMap = () => {
  // get data

  useEffect(() => {
    // const element = document.querySelector(".geosearch.leaflet-bar.leaflet-control.leaflet-control-geosearch.leaflet-geosearch-button");
    const element = document.querySelector(".leaflet-top.leaflet-left")
    if (element) {
      element.classList.add("flexing", "leaflet-right");
    }
  }, []);
  //
  const prov = new OpenStreetMapProvider();
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={3}
      style={{ height: "900px", width: "1000px" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={[21.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <SearchField
        provider={prov}
        // showMarker={true}
        // showPopup={false}
        // popupFormat={({ query, result }) => result.label}
        // maxMarkers={3}
        // retainZoomLevel={false}
        // animateZoom={true}
        // autoClose={false}
        // searchLabel={"Enter address, please"}
        // keepResult={true}
      />
      <UseRouteControl />
    </MapContainer>
  );
};

export default LeafletMap;
