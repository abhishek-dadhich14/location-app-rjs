import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
};

export default MainRoute;
