import "./App.css";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Container } from "@mui/material";
import { getApi } from "./api/index";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentWeather } from "./redux/reducers/currentWeatherSlice";
import { addForecastWeather } from "./redux/reducers/forecastWeatherSlice";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import ForecastWeatherList from "./components/ForecastWeather/ForecastWeatherList";
import ToggleSectionButton from "./components/ToggleButton/ToggleSectionButton";
import SavedCitiesList from "./components/SavedCities/SavedCitiesList";
import { updateData } from "./utils/UpdateData";

function App() {
  const [nativeCity, setNativeCity] = useState();
  const weather = useSelector((state) => state.currentWeather.info);
  const [alignment, setAlignment] = useState("daily");
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
    dispatch(addForecastWeather(response.forecast));
  };

  const updateWeatherInfo = async () => {
    const response = await updateData(weather);
    dispatch(addCurrentWeather(response.current));
    dispatch(addForecastWeather(response.forecast));
  };

  // functions to get current location
  const success = async ({ coords }) => {
    const { latitude, longitude } = coords;
    const response = await axios.get(
      `${
        import.meta.env.VITE_WEATHER_API_DAILY_URL
      }?lat=${latitude}&lon=${longitude}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    setNativeCity(response.data);
  };

  const error = ({ message }) => {
    console.log(message);
  };

  const getNativeCity = async () => {
    const response = await updateData(nativeCity);
    console.log(response);
    dispatch(addCurrentWeather(response.current));
    dispatch(addForecastWeather(response.forecast));
  };

  // get user current city weather cast
  useEffect(() => {
    if (nativeCity) {
      getNativeCity();
    }
  }, [nativeCity]);

  // update while page first time load
  useEffect(() => {
    if (weather) {
      updateWeatherInfo();
    }
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
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
            {alignment === "daily" && (
              <CurrentWeather
                weather={weather}
                currentDay={true}
                forecast={false}
                saved={false}
              />
            )}
            {alignment === "5 days forecast" && <ForecastWeatherList />}
            {alignment === "saved cities" && (
              <SavedCitiesList setAlignment={setAlignment} />
            )}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
