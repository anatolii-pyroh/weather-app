import axios from "axios";

// geo DB api options
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_GEO_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
// receiving citioes option list by sending request to geoDB API
export const loadOptions = async (inputValue) => {
  return await fetch(
    `${
      import.meta.env.VITE_GEO_API_URL
    }/cities?minPopulation=200000&namePrefix=${inputValue}`,
    geoApiOptions
  )
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city?.name}, ${city?.countryCode}`,
            label: `${city?.name}, ${city?.country}`,
          };
        }),
      };
    })
    .catch((err) => console.error(err));
};

// openweathermap API
export const getApi = async (cityInfo) => {
  // get city longitude and latitude
  const request = await axios.get(
    `${
      import.meta.env.VITE_WEATHER_API_DAILY_URL
    }?q=${cityInfo}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
  );
  const response = request.data;
  const latitude = response.coord.lat;
  const longitude = response.coord.lon;
  // get city weather forecast info for 5 days
  const request_ = await axios.get(
    `${
      import.meta.env.VITE_WEATHER_API_FORECAST_URL
    }?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
  const response_ = request_.data;
  const finalObj = {
    current: response,
    forecast: response_,
  };

  return finalObj;
};
