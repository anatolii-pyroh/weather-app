import React, { Fragment, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveCity } from "../../redux/reducers/currentWeatherSlice";
import classes from "./CurrentWeather.module.css";
import CloudIcon from "@mui/icons-material/Cloud";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AirIcon from '@mui/icons-material/Air';

const CurrentWeather = () => {
  const currentWeather = useSelector((state) => state.currentWeather.info);
  const dispatch = useDispatch();
  const weatherDescription = currentWeather.weather[0].description;
  const time = new Date(currentWeather.dt * 1000).toLocaleTimeString("it-IT");
  const date = new Date(currentWeather.dt * 1000).toLocaleDateString("en-GB");
  const sunrise = new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString("it-IT");
  const sunset = new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString("it-IT");
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
    // whole currentweather block
    <Box className={classes["current-weather"]}>
      <Box className={classes["current-weather-card"]}>
        {/* city name, save button and date */}
        <Box className={classes.title}>
          <h3>
            {currentWeather?.name}, {currentWeather?.sys?.country}
          </h3>
          <span>
            {weekDay}, {date}
          </span>
        </Box>
        {/* weather icon and description */}
        <Box className={classes["current-weather-icon"]}>
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
            alt='openweathermap weather icon'
            width={180}
            height={180}
          />
          <h1>{currentWeather.main.temp.toFixed(1)}C°</h1>
        </Box>
      </Box>

      <Box className={classes["current-weather-description"]}>
        {/* left side of description */}
        <Box>
          <Box className={classes["desctiption-icon-with-text"]} sx={{ mt: 0 }}>
            <CloudIcon sx={{ mr: 1 }} />
            <span>Weather condition: {weatherDescription}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <CompressIcon sx={{ mr: 1 }} />
            <span>Pressure(sea level): {currentWeather.main.pressure} hPa</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <WbSunnyIcon sx={{ mr: 1 }} />
            <span>Sunrise: {sunrise}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <MyLocationIcon sx={{ mr: 1 }} />
            <span>Wind direction: {currentWeather.wind.deg}°</span>
          </Box>
        </Box>

        {/* right side of description */}
        <Box>
          <Box className={classes["desctiption-icon-with-text"]} sx={{ mt: 0 }}>
            <CloudIcon sx={{ mr: 1 }} />
            <span>Cloudiness: {currentWeather.clouds.all}%</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <VisibilityIcon sx={{ mr: 1 }} />
            <span>
              Visibility: {(currentWeather.visibility / 100).toFixed()}%
            </span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <WbTwilightIcon sx={{ mr: 1 }} />
            <span>Sunset: {sunset}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <AirIcon sx={{ mr: 1 }} />
            <span>Wind speed: {currentWeather.wind.speed} m/s</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentWeather;
