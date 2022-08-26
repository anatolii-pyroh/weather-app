import "./App.css";
import { useState, useEffect, Fragment } from "react";
import {
  Container,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { getApi } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentWeather } from "./redux/reducers/currentWeatherSlice";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

function App() {
  const [alignment, setAlignment] = useState("daily");
  const weather = useSelector((state) => state.currentWeather.info);
  const dispatch = useDispatch();

  // switch selected button content
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // receiving data from input (geoDB cities API) and send it to getApi function,
  // also giving our state from redux a new value(current city info)
  const handleOnSearchChange = async (cityData) => {
    const response = await getApi(cityData.value);
    console.log(response);
    dispatch(addCurrentWeather(response.current));
  };

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <Container maxWidth='lg'>
      <div className='App'>
        <CitiesAutoComplete onSearchChange={handleOnSearchChange} />
        {weather && (
          <Fragment>
            {/* daily,forecast,saved cities buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <ToggleButtonGroup
                color='primary'
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label='Platform'
              >
                <ToggleButton value='daily'>Daily</ToggleButton>
                <ToggleButton value='forecast'>Forecast</ToggleButton>
                <ToggleButton value='saved cities'>Saved cities</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {alignment === "daily" && <CurrentWeather />}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
