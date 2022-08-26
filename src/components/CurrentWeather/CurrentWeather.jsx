import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveCity } from "../../redux/reducers/currentWeatherSlice";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.currentWeather.info);
  console.log(currentWeather);

  const time = new Date(currentWeather.dt * 1000).toLocaleTimeString("it-IT");
  const date = new Date(currentWeather.dt * 1000).toLocaleDateString("en-GB");
  const dayNumber = new Date().getDay();
  let weekDay;
  if (dayNumber === 1) weekDay = "Monday";
  if (dayNumber === 2) weekDay = "Saturday";
  if (dayNumber === 3) weekDay = "Wednesday";
  if (dayNumber === 4) weekDay = "Thursday";
  if (dayNumber === 5) weekDay = "Friday";
  if (dayNumber === 6) weekDay = "Saturday";
  if (dayNumber === 7) weekDay = "Sunday";
  return (
    <Box
      sx={{
        backgroundColor: "#ccc",
        display: "flex",
        flexDirection: "column",
        padding: "0 1rem",
        borderRadius: "20px",
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h4>
            {currentWeather?.name}, {currentWeather?.sys?.country}
          </h4>
          <Button
            variant='outlined'
            size='small'
            sx={{ ml: 2 }}
            onClick={() => dispatch(saveCity(weather))}
          >
            Save city
          </Button>
        </Box>
        <h4 style={{ alignSelf: "start" }}>
          {weekDay}, {date}, {time}
        </h4>
      </Box>
    </Box>
  );
};

export default CurrentWeather;
