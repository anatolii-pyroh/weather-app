import "./App.css";
import { useEffect } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import { getApi } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentWeatherInfo } from "./redux/reducers/currentWeatherSlice";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

function App() {
  const weather = useSelector((state) => state.currentWeather.info);
  const dispatch = useDispatch();
  // receiving data from input (geoDB cities API) and send it to getApi function,
  // also giving our state from redux a new value(city info)
  const handleOnSearchChange = async (cityData) => {
    const response = await getApi(cityData.value);
    console.log(response)
    dispatch(addCurrentWeatherInfo(response));
  };

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <Container maxWidth='lg'>
      <div className='App'>
        <CitiesAutoComplete onSearchChange={handleOnSearchChange} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {weather && (
            <h2>
              {weather?.current?.name}, {weather?.current?.sys?.country}
            </h2>
          )}
        </Box>
        <CurrentWeather />
      </div>
    </Container>
  );
}

export default App;
