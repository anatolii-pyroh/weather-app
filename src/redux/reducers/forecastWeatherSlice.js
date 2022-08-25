import { createSlice } from "@reduxjs/toolkit";

export const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
  initialState: {
    info: "",
  },
  reducers: {
    addForecastWeather(state, action) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

export const { addForecastWeather } = forecastWeatherSlice.actions;

export default forecastWeatherSlice.reducer;
