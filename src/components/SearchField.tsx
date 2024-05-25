import {
  GeoSearchControl,
  MapBoxProvider,
  OpenStreetMapProvider,
  EsriProvider,
} from "leaflet-geosearch";
import { useEffect, useState } from "react";
import { AttributionControl, useMap } from "react-leaflet";
import L from "leaflet";
// import { useState } from 'react';
// import { useContext } from 'react';
// import EventContext from '../context/EventContext';
// import { useEventContext } from '../context/EventContext';
import { useEvent } from "../hooks/useEvent";

const SearchField = ({ provider }) => {
  const { setLocation, setMark } = useEvent();
  const prov = provider;
  const map = useMap();
  // const routeControl = RoutingControl();

  // const [dot, setDot] = useState({});

  function searchEventHandler(result) {
    // console.log(result.location);
    const { location } = result;
    setLocation(location);
    setMark((data) => ({
      ...data,
      destPoint: { lng: location.x, lat: location.y },
    }));
  }

  const onLocationFound = (e) => {
    // const { lat, lng } = e.latlng;
    setMark((data) => ({
      ...data,
      srcPoint: e.latlng,
    }));
  };

  // useEffect(() => {
  //   console.log(dot);
  // }, [])

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: prov,
      showMarker: true,
      showPopup: false,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      popupFormat: ({ query, result }) => result.label,
      resultFormat: ({ result }) => result.label,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: false,
      searchLabel: "Enter address",
      keepResult: false,
      updateMap: true,
      attributionControl: false,
    });
    map.locate({ setView: false });

    map.addControl(searchControl);
    map.on("geosearch/showlocation", searchEventHandler);

    // get time of route control
    // routeControl.on("routesfound", (event) => {
    //   var routes = event.routes;
    //   var summary = routes[0].summary;
    //   console.log(
    //     "Total distance is " +
    //       summary.totalDistance / 1000 +
    //       " km and total time is " +
    //       Math.round((summary.totalTime % 3600) / 60) +
    //       " minutes"
    //   );
    // });

    map.on("locationfound", onLocationFound);
    map.on("locationerror", (e) => {
      console.log("user denied to give location access: " + e);
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", searchEventHandler);
      map.off("locationfound", onLocationFound);
    };
  }, [map, prov]);

  return null;
};

export default SearchField;
