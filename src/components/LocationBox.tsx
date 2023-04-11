import React from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { REMOVE_LOCATION } from "../redux/action";
import { Data } from "../types";
type Props = {
  el: Data;
  index: number;
};
const LocationBox = ({ el, index }: Props) => {
  const dispatch = useDispatch();
  return (
    <Box display={"flex"} justifyContent={"space-between"} backgroundColor={"#a2d4ea"} padding={6} marginTop={3} borderRadius={10}>
      <Box>
        <Text style={{ marginBottom: 10 }}>{el.address}</Text>
        <Text>{el.time}</Text>
      </Box>
      <Box>
        <Button
        colorScheme={"teal"}
          onClick={() => {
            console.log(index);

            dispatch({ type: REMOVE_LOCATION, payload: index });
          }}
        >
          <Text>Remove</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default LocationBox;
