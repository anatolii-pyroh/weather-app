import { List, Box, ListItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

const ForecastWeatherList = () => {
  const forecastWeather = useSelector((state) => state.forecastWeather.info);
  // console.log(forecastWeather);
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "35rem",
        mt: "1rem",
        borderRadius: "20px",
        padding: "0.5rem",
      }}
    >
      <List>
        {/* filter by every 8 element(24 hours from previous element) */}
        {/* plus element 39(last day of forecast) */}
        {forecastWeather.list
          .filter(
            (item, index) => index !== 0 && (index === 39 || index % 8 === 0)
          )
          .map((item) => (
            <li key={item.dt}>
              <CurrentWeather
                weather={item}
                currentDay={false}
                forecast={forecastWeather}
              />
            </li>
          ))}
      </List>
    </Box>
  );
};

export default ForecastWeatherList;
