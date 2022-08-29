import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentWeather,
  deleteCity,
} from "../../redux/reducers/currentWeatherSlice";
import { getApi } from "../../api";
import { addForecastWeather } from "../../redux/reducers/forecastWeatherSlice";

const SavedCitiesList = ({ setAlignment }) => {
  const savedCities = useSelector((state) => state.currentWeather.savedCities);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    left: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAlignment("daily");
    setState({ ...state, [anchor]: open });
  };

  const showCityInfo = async (cityInfo) => {
    setAlignment("daily");
    const response = await getApi(cityInfo);
    dispatch(addCurrentWeather(response.current));
    dispatch(addForecastWeather(response.forecast));
  };
  return (
    <div>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Box sx={{ width: 250 }} role='presentation'>
          <List sx={{ overflowY: "auto" }}>
            {savedCities.map((city) => (
              <ListItem key={city.dt} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteForeverIcon
                      onClick={() => dispatch(deleteCity(city))}
                    />
                  </ListItemIcon>
                  <ListItemText
                    onClick={() =>
                      showCityInfo(`${city.name}, ${city.sys.country}`)
                    }
                    onKeyDown={toggleDrawer("left", false)}
                    primary={`${city.name}, ${city.sys.country}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default SavedCitiesList;
