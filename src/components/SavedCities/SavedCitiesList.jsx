import { Box, List } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { updateData } from "../../utils/UpdateData";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import SavedCitiesItem from "./SavedCitiesItem";

const SavedCities = () => {
  const cities = useSelector((state) => state.currentWeather.savedCities);

  console.log(cities);
  return (
    <Fragment>
      {cities.length > 0 && (
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
              <SavedCitiesItem key={item.id} item={item}/>
            ))}
          </List>
        </Box>
      )}
    </Fragment>
  );
};

export default SavedCities;
