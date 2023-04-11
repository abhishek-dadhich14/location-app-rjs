import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { initState } from "../redux/reducer";
import { Box } from "@chakra-ui/react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 17.3637632,
  lng: 78.4269312,
};
const Map = () => {
  const locations = useSelector((store: initState) => store.locations);
  console.log(locations, "lc");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBQmvJLW8Em2ZyrzYqW4bXRSsW1J5siTkI",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <Box width={"30%"} margin={"auto"} marginTop={100}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: +locations[0].latitude, lng: +locations[0].longitude }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
          {/* <Marker position={center} />
        <Marker position={{...center,lat:17.36376554}} /> */}
          {locations.map((el, i) => {
            console.log("here", el);
            return (
              <Marker
                key={i}
                position={{ lat: +el.latitude, lng: +el.longitude }}
              />
            );
          })}
        </>
      </GoogleMap>
    </Box>
  ) : (
    <></>
  );
};

export default Map;
