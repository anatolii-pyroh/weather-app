import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addForecastWeather } from "../../redux/reducers/forecastWeatherSlice";
import ForecastWeatherItem from "./ForecastWeatherItem";

const ForecastWeatherList = () => {
  const forecastWeather = useSelector((state) => state.forecastWeather.info);
  console.log(forecastWeather);
  return (
    <ul>
      {forecastWeather.city.name}, {forecastWeather.city.country}
      {forecastWeather.list
        .filter((item, index) => index === 0 || index % 8 === 0)
        .map((item, index) => (
          <li key={item.dt}>
            <ForecastWeatherItem item={item} index={index} />
          </li>
        ))}
    </ul>
  );
};

export default ForecastWeatherList;
