import React from "react";

const ForecastWeatherItem = ({ item, index }) => {
  return (
    <div>
      {index + 1}. {item.dt_txt}
    </div>
  );
};

export default ForecastWeatherItem;
