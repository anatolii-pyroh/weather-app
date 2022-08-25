import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(
    (state) => state.currentWeather.info
  );
  console.log(currentWeather);

  const dayNumber = new Date().getDay();
  let today;

  return (
    <Box
      sx={{
        backgroundColor: "#ccc",
        display: "flex",
        padding: "0 1rem",
        borderRadius: "20px",
        mt: 5,
      }}
    >
      <h3>{today}</h3>
    </Box>
  );
};

export default CurrentWeather;
