import { Box, List } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
const SavedCities = () => {
  const cities = useSelector((state) => state.currentWeather.savedCities);
  console.log(cities);
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
        {cities.map((item) => (
          <li>
            <CurrentWeather
              key={item.id}
              weather={item}
              currentDay={true}
              forecast={false}
              saved={true}
            />
          </li>
        ))}
      </List>
    </Box>
  );
};

export default SavedCities;
