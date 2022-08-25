import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.currentWeather.info);
  console.log(currentWeather);

  const dayNumber = new Date().getDay();
  let today;
  if (dayNumber === 1) today = "Monday";
  if (dayNumber === 2) today = "Saturday";
  if (dayNumber === 3) today = "Wednesday";
  if (dayNumber === 4) today = "Thursday";
  if (dayNumber === 5) today = "Friday";
  if (dayNumber === 6) today = "Saturday";
  if (dayNumber === 7) today = "Sunday";
  return (
    <Box
      sx={{
        backgroundColor: "#ccc",
        display: "flex",
        flexDirection: "column",
        padding: "0 1rem",
        borderRadius: "20px",
        mt: 5,
      }}
    >
        
      <h3 style={{alignSelf: "center"}}>
        {today}, {new Date().toLocaleDateString()}
      </h3>

    </Box>
  );
};

export default CurrentWeather;
