import "./App.css";
import { useEffect, Fragment } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { getApi } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentWeather,
  saveCity,
} from "./redux/reducers/currentWeatherSlice";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

function App() {
  const weather = useSelector((state) => state.currentWeather.info);
  const dispatch = useDispatch();
  // receiving data from input (geoDB cities API) and send it to getApi function,
  // also giving our state from redux a new value(city info)
  const handleOnSearchChange = async (cityData) => {
    const response = await getApi(cityData.value);
    console.log(response);
    dispatch(addCurrentWeather(response));
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <h2>
                  {weather?.current?.name} , {weather?.current?.sys?.country}
                </h2>
                <Button
                  variant='contained'
                  onClick={() => dispatch(saveCity(weather))}
                >
                  Save city
                </Button>
              </Box>
            </Box>
            <CurrentWeather />
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
