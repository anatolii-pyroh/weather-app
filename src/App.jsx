import "./App.css";
import { useState, useEffect, Fragment } from "react";
import { Container } from "@mui/material";
import { getApi } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentWeather } from "./redux/reducers/currentWeatherSlice";
import { addForecastWeather } from "./redux/reducers/forecastWeatherSlice";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import ForecastWeatherList from "./components/ForecastWeather/ForecastWeatherList";
import ToggleSectionButton from "./components/ToggleButton/ToggleSectionButton";
function App() {
  const weather = useSelector((state) => state.currentWeather.info);
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState("daily");

  // switch selected button content
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // receiving data from input (geoDB cities API) and send it to getApi function,
  // also giving our state from redux a new value(current city info)
  const handleOnSearchChange = async (cityData) => {
    const request = await getApi(cityData.value);
    const response = request;
    console.log(response);
    dispatch(addCurrentWeather(response.current));
    dispatch(addForecastWeather(response.forecast));
  };

  useEffect(() => {
    // console.log(weather);
  }, [weather]);

  // send request while page first time load
  useEffect(() => {
    if (weather) {
      const cityName = `${weather?.name}, ${weather?.sys.country}`;
      const getWeatherInfo = async () => {
        const request = await getApi(cityName);
        const response = request;
        console.log(response);
        dispatch(addCurrentWeather(response.current));
        dispatch(addForecastWeather(response.forecast));
      };
      getWeatherInfo();
    }
  }, []);

  return (
    <Container maxWidth='lg'>
      <div className='App'>
        <CitiesAutoComplete onSearchChange={handleOnSearchChange} />
        {weather && (
          <Fragment>
            <ToggleSectionButton
              alignment={alignment}
              handleChangeAlignment={handleChange}
            />
            {/* daily,forecast,saved cities buttons */}
            {alignment === "daily" && <CurrentWeather weather={weather} currentDay={true} forecast={false}/>}
            {alignment === "forecast" && <ForecastWeatherList />}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
