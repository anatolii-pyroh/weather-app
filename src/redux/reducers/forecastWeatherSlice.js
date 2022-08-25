import { createSlice } from "@reduxjs/toolkit";

export const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
  initialState: {
    info: ""
  },
  reducers: {
    addForecastWeatherInfo(state, action) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

export const { addForecastWeatherInfo } = forecastWeatherSlice.actions;

export default forecastWeatherSlice.reducer;
