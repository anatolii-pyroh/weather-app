import { createSlice } from "@reduxjs/toolkit";

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: {
    savedCities: [],
    info: "",
  },
  reducers: {
    addCurrentWeather(state, action) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
    saveCity(state, action) {
      console.log(action.payload)
      // state.savedCities.unshift(JSON.parse(JSON.stringify(action.payload)));
    },
  },
});

export const { addCurrentWeather, saveCity } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
