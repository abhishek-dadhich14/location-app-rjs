import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import randomWords from "random-words";

import { Box, Text, Input, Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { initState } from "../redux/reducer";
import { Data } from "../types";

import { useGeolocated } from "react-geolocated";
import { ADD_LOCATION, CLEAR_ALL } from "../redux/action";
import LocationBox from "../components/LocationBox";
const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((store: initState) => store.locations);
  const [calc, setCalc] = useState<number>(0);
  const ref = useRef<number>();
  const navigate = useNavigate();
  useEffect(() => {
    getLocation();
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
      }
    }
    function showPosition(info: any) {
      console.log(info);
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${info.coords.latitude},+${info.coords.longitude}&key=e5df47201cbb480aaeac429563c440c5&language=en&pretty=1`
        )
        .then((res) => {
          console.log("data", res.data);
          axios.post(`https://httpstat.us/200`).then((res) => {
            console.log(res);
          });

          dispatch({
            type: ADD_LOCATION,
            payload: {
              longitude: info.coords.longitude,
              latitude: info.coords.latitude,
              address: res.data.results[0].formatted,
              time: res.data.timestamp.created_http,
            },
          });
        });
    }
    let id = setInterval(() => {
      console.log(ref.current);
      if (ref.current != undefined && ref.current >= 30) {
        clearInterval(id);
      }
      setCalc((prev) => prev + 1);
      getLocation();
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        }
      }
      function showPosition(info: any) {
        console.log(info);
        axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${info.coords.latitude},+${info.coords.longitude}&key=e5df47201cbb480aaeac429563c440c5&language=en&pretty=1`
          )
          .then((res) => {
            console.log("data", res.data);
            axios.post(`https://httpstat.us/200`).then((res) => {
              console.log(res);
            });

            dispatch({
              type: ADD_LOCATION,
              payload: {
                longitude: info.coords.longitude,
                latitude: info.coords.latitude,
                address: res.data.results[0].formatted,
                time: res.data.timestamp.created_http,
              },
            });
          });
      }
    }, 10000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <Box width={"40%"} margin={"auto"}>
      <Box display={"flex"} justifyContent={"space-around"}>  
      <Button
        onClick={() => {
          navigate("/map");
        }}
      >
        Go to map
      </Button>
      <Box>
        <Button
          colorScheme={"red"}
          onClick={() => {
            dispatch({ type: CLEAR_ALL, payload: "" });
          }}
        >
          <Text>Clear all</Text>
        </Button>
      </Box>
      </Box>
      <Text fontWeight={"bold"}>Current location</Text>
      {data.length > 0 && (
        <Box
          backgroundColor={"#a2d4ea"}
          padding={6}
          marginTop={3}
          borderRadius={10}
        >
          <Text>{data[data.length - 1].address}</Text>
          <Text>{data[data.length - 1].time}</Text>
        </Box>
      )}
      <Text style={{ fontWeight: "bold", color: "black", padding: 10 }}>
        Previous locations
      </Text>
      <Box>
        {data.map((el, i) => {
          return (
            <Box key={i}>
              <LocationBox el={el} index={i} />
            </Box>
          );
        })}
      </Box>

      <Box></Box>
    </Box>
  );
};
export default Home;
