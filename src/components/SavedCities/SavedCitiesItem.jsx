import { Box } from "@mui/material";
import React, { useState } from "react";
import { updateData } from "../../utils/UpdateData";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import classes from "./SavedCitiesItem.module.css";

const SavedCitiesItem = ({ item }) => {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState(item);

  const updateAndShow = async () => {
    const newData = await updateData(item);
    setWeather(newData.current);
    setShow((show) => !show);
  };
  return (
    <li>
      <Box className={classes["saved-item"]} onClick={updateAndShow}>
        {weather.name}, {weather.sys.country}
      </Box>
      {show && (
        <CurrentWeather
          weather={weather}
          currentDay={true}
          forecast={false}
          saved={true}
        />
      )}
    </li>
  );
};

export default SavedCitiesItem;
