import "./App.css";
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
import SavedCities from "./components/SavedCities/SavedCities";
import { updateData } from "./utils/UpdateData";

function App() {
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

  // update while page first time load
  useEffect(() => {
    if (weather) {
      updateWeatherInfo();
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
            {alignment === "daily" && (
              <CurrentWeather
                weather={weather}
                currentDay={true}
                forecast={false}
                saved={false}
              />
            )}
            {alignment === "5 days forecast" && <ForecastWeatherList />}
            {alignment === "saved cities" && <SavedCities />}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
