import React, { Fragment, useState, useEffect } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveCity } from "../../redux/reducers/currentWeatherSlice";
import classes from "./CurrentWeather.module.css";
import CloudIcon from "@mui/icons-material/Cloud";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AirIcon from "@mui/icons-material/Air";
import moment from "moment-timezone";

// currentDay and forecast props to check if item selected for daily or forecast view
// saved prop to check if item viewed in saved tab to hide "Save city" button
const CurrentWeather = ({ weather, currentDay, forecast, saved }) => {
  const dispatch = useDispatch();
  const weatherDescription = weather.weather[0].description;
  const savedCities = useSelector((state) => state.currentWeather.savedCities);
  // states for alert message for success or fail save city
  const [alertState, setAlertState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alertState;
  const [isSuccess, setIsSuccess] = useState(true);
  // successfull alert show and hide
  const handleClick = (newAlertState) => {
    setAlertState({ open: true, ...newAlertState });
  };
  const handleClose = () => {
    setAlertState({ ...alertState, open: false });
  };
  // function to save city or decline if already saved
  const save = () => {
    const check = savedCities.findIndex((item) => item.id === weather.id);
    if (check !== -1) {
      setIsSuccess(false);
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    } else {
      setIsSuccess(true);
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
      dispatch(saveCity(weather));
    }
  };
  // const time = new Date(weather.dt * 1000).toLocaleTimeString("it-IT");
  const date = new Date(weather.dt * 1000).toLocaleDateString("en-GB");
  const dayNumber = new Date(weather.dt * 1000).getDay();
  let weekDay = "Sunday";
  if (dayNumber === 1) weekDay = "Monday";
  if (dayNumber === 2) weekDay = "Tuesday";
  if (dayNumber === 3) weekDay = "Wednesday";
  if (dayNumber === 4) weekDay = "Thursday";
  if (dayNumber === 5) weekDay = "Friday";
  if (dayNumber === 6) weekDay = "Saturday";

  let sunrise;
  let sunset;
  if (forecast) {
    sunrise = moment
      .utc(forecast?.city?.sunrise, "X")
      .add(forecast?.city?.timezone, "seconds")
      .format("HH:mm");
    sunset = moment
      .utc(forecast?.city?.sunset, "X")
      .add(forecast?.city?.timezone, "seconds")
      .format("HH:mm");
  } else {
    sunrise = moment
      .utc(weather?.sys?.sunrise, "X")
      .add(weather?.timezone, "seconds")
      .format("HH:mm");
    sunset = moment
      .utc(weather?.sys?.sunset, "X")
      .add(weather?.timezone, "seconds")
      .format("HH:mm");
  }

  return (
    // whole currentweather block
    <Box className={classes["current-weather"]}>
      <Box className={classes["current-weather-card"]}>
        {/* city name, save button and date */}
        <Box className={classes["current-weather-card-title"]}>
          <h3>
            {currentDay && (
              <>
                {weather?.name}, {weather?.sys?.country}
              </>
            )}
          </h3>
          <span>
            {weekDay}, {date}
          </span>
        </Box>
        {/* weather icon and description */}
        <Box className={classes["current-weather-card-icon"]}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt='openweathermap weather icon'
              width={180}
              height={180}
            />
            <h1>{weather.main.temp.toFixed(1)}C°</h1>
          </Box>
          {currentDay && (
            <Fragment>
              {!saved && (
                <Button variant='contained' fullWidth onClick={save}>
                  Save city
                </Button>
              )}
            </Fragment>
          )}
        </Box>
      </Box>

      <Box className={classes["current-weather-description"]}>
        {/* left side of description */}
        <Box>
          <Box className={classes["desctiption-icon-with-text"]} sx={{ mt: 0 }}>
            <CloudIcon sx={{ mr: 1 }} />
            <span>Weather: {weatherDescription}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <CompressIcon sx={{ mr: 1 }} />
            <span>Pressure(sea level): {weather.main.pressure} hPa</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <WbSunnyIcon sx={{ mr: 1 }} />
            <span>Sunrise: {sunrise}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <MyLocationIcon sx={{ mr: 1 }} />
            <span>Wind direction: {weather.wind.deg}°</span>
          </Box>
        </Box>

        {/* right side of description */}
        <Box>
          <Box className={classes["desctiption-icon-with-text"]} sx={{ mt: 0 }}>
            <CloudIcon sx={{ mr: 1 }} />
            <span>Cloudiness: {weather.clouds.all}%</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <VisibilityIcon sx={{ mr: 1 }} />
            <span>Visibility: {(weather.visibility / 100).toFixed()}%</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <WbTwilightIcon sx={{ mr: 1 }} />
            <span>Sunset: {sunset}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <AirIcon sx={{ mr: 1 }} />
            <span>Wind speed: {weather.wind.speed} m/s</span>
          </Box>
        </Box>
      </Box>
      {currentDay && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={isSuccess ? "City saved" : "You already saved this city"}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={3000}
          ContentProps={{
            sx: {
              fontSize: "1rem",
              background: isSuccess ? "rgb(46,125,50)" : "rgb(211,47,47)",
              display: "block",
              textAlign: "center",
            },
          }}
        />
      )}
    </Box>
  );
};

export default CurrentWeather;
